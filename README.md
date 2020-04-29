# kjgloviceFX (React + Django)

##### 참고 포스팅
###### https://www.valentinog.com/blog/drf/#Django_REST_with_React_Django_and_React_together
###### https://medium.com/technest/implement-user-auth-in-a-django-react-app-with-knox-fc56cdc9211c
***

### Django

#### 1. python, nodejs, yarn 공식홈페이지 설치

##### python : https://nodejs.org/ko/download/
##### nodejs : https://nodejs.org/ko/download/
##### yarn : https://yarnpkg.com/en/docs/install#windows-stable
##### mac 환경에서 python,pip 명령어 관련 url : https://velog.io/@doondoony/pipenv-101

##### 최상위 디렉토리에서 진행, mac에서는 python3, pip3 -> 3.X.X 버전으로 진행

#### 2. pip 버전 업데이트(react의 npm과 같은 패키지 관리자)
```python -m pip install --upgrade pip```
	
#### 3. 가상환경 설치 (virtualenv)

##### 설치
```pip install virtualenv```

##### 패키지 종속성 관리
##### 가상환경 생성 : ```virtualenv 가상환경이름```
##### 패키지 관리 파일 생성 : ```pip freeze > requirements.txt```
##### 패키지 설치 : ```pip install -r requirements.txt``` (requirements.txt 생성)

##### 가상환경 실행

###### mac
```source 가상환경폴더/bin/activate```
###### windows 
```가상환경폴더\Scripts\activate```

#### 3_1. mysqlclient 관련

##### mac에서 pip install mysqlclient 시 오류 해결
##### mysqlclient : https://github.com/PyMySQL/mysqlclient-python/archive/master.zip
##### 가상환경 실행 후, 다운로드 후 압축해제 혹은 업로드 된 mysqlclient 폴더로 이동 후 python setup.py install

~~4. 마이그레이션 적용
python manage.py makemigrations
python manage.py 

#### 4. CollectStatic
```python manage.py collectstatic```

#### 5. 서버 실행 (로컬환경)
```python manage.py runserver```

***
### React

#### restAPI/frontend 에서 front단 작업 진행
```npm install```

#### 작업 후 빌드 (개발용)
```npm run dev```

##### 웹팩으로 빌드: frontend/static/frontend/main.js
##### 외부 script 사용시: frontend/templates/frontend/index.html
##### App.js에 컴포넌트를 url로 연결할때: frontend/urls.py 에 추가

***
### 로컬
#### frontend/webpack.config.js
```
  output: {
    publicPath: "/static/frontend/"
    // publicPath: "publicPath: "https://glovicefx.s3.ap-southeast-1.amazonaws.com/static/frontend/"
  },
```
```npm run dev //Watch로 실시간 빌드```
#### restAPI/settings.py
```
//로컬 사용
##########
# Local #
##########
.
.
.
//아마존 부분 주석
##########
# AWS S3 #
##########
```
```
python manage.py collectstaic   // 빌드된 main.js 파일 로컬의 .static_root로 collectiong
python manage.py runserver
```
***
### 서버
#### frontend/webpack.config.js
```
  output: {
    // publicPath: "/static/frontend/"
    publicPath: "publicPath: "https://glovicefx.s3.ap-southeast-1.amazonaws.com/static/frontend/"
  },
```
```npm run build```
#### restAPI/settings.py
```
//로컬 부분 주석
##########
# Local #
##########
.
.
.
//아마존 부분 사용
##########
# AWS S3 #
##########
```
```
python manage.py collectstaic   // 빌드된 main.js 파일 아마존의 S3로 collectiong, 터미널로 서버에 접속해서 해도 상관 없음
```
***
### AWS 환경

##### 참고포스팅
###### https://nachwon.github.io/django-deploy-1-aws/
###### https://velog.io/@loakick/2019-11-19-0011-%EC%9E%91%EC%84%B1%EB%90%A8-2ck34lupye

#### React Build 와 Django 작업 완료 후 서버 터미널에서 

##### 서버 실행 (터미널)
```ssh -i (pem파일 경로) ubuntu@glovicefx.com```

##### 가상환경 실행
```pyenv shell (로컬에서 작업할때와 동일한 가상환경 명)```

##### pip 패키지 설치
```pip install -r requirements.txt```

##### collectstatic (manage.py가 존재하는 디렉토리에서)
```python manage.py collectstatic```

##### 서버 재부팅
```sudo systemctl daemon-reload```
```sudo systemctl restart nginx uwsgi```


### Celery + RabbitMQ

#### rabbitmq Setting
```sudo rabbitmq-plugins enable rabbitmq_management ``` (rabbitmq plugin 활성화)
```sudo service rabbitmq-server restart ``` (rabbitmq server 재시작)

```sudo rabbitmqctl add_user [ID] [PASSWORD] ``` (계정추가)
```sudo rabbitmqctl set_user_tags [ID] administrator ``` (관리자 권한 설정)

```sudo rabbitmqctl set_permissions -p / [ID] ".*" ".*" ".*" ```
(celery에서 rabbitmq로 connection 요청 시 connection error가 날 경우 설정 필요))


#### Django Setting

##### 1. settings.py
~~~python
# Rabbitmq related settings 
CELERY_BROKER_URL = 'amqp://{}:{}@localhost:5672//'.format(config_secret['rabbitmq']['id'], config_secret['rabbitmq']['pwd'])
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE='UTC'

# beat schedule setting
CELERY_BEAT_SCHEDULE = {
    'get_transaction_list': {
        'task': 'wallet.tasks.get_transaction_list',
        'schedule': crontab(minute=10) # execute every 10 minutes
    }
}
~~~

##### 2. __init__.py (root project 내에서 ex: restAPI)
~~~python
from __future__ import absolute_import
from .celery import app as restAPI
~~~

##### 3. celery.py 생성 (root project 폴더 내)
~~~python
from __future__ import absolute_import
from django.conf import settings

import os
from celery import Celery
from celery import shared_task


# settings environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restAPI.settings')

app = Celery('restAPI')
app.config_from_object('django.conf:settings', namespace='CELERY')

# load task module from all apps in project
app.autodiscover_tasks()
~~~

##### 4. 원하는 app 내에 tasks.py 생성 후 task 생성
~~~python
@shared_task
# 함수 이름과 settings의 CELERY_BEAT_SCHEDULE 에 등록된 이름이 같아야 함
def get_transaction_list():
   pass ...
~~~

##### 5. celery 구동(test 시)
```celery -A restAPI beat ``` (celery beat 실행)
```celery -A restAPI worker ``` (celery worker 실행)

##### 6. 서버 배포
###### 참고자료
http://docs.celeryproject.org/en/latest/userguide/daemonizing.html#usage-systemd (systemd 방식)

http://jangwon.io/django/study/2018/10/05/(Django)-Celery%EB%A1%9C-Django-%EC%8A%A4%EC%BC%80%EC%A4%84%EB%9F%AC-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%EB%B0%B0%ED%8F%AC/ (celery + rabbitmq 설치 포함)

https://devlog.jwgo.kr/2019/07/05/celery-daemonization/ (한글내용)

https://jinmay.github.io/2019/11/11/django/django-celery-conf-systemd/ (가상환경에서의 celery 배포)

###### 작성필요 파일 (작성내용은 참고자료에서 확인)
``` /etc/conf.d/celery  ``` (celery 변수지정 파일)
```/etc/systemd/system/celerybeat.service  ``` (celery beat service 구동 파일)
```/etc/systemd/system/celery.service  ``` (celery service 구동 파일)
```/etc/tmpfiles.d/celery.conf  ``` (service 파일들 상의 pid 파일과 log파일 권한 설정)

###### celery 구동
```sudo systemctl daemon-reload```
```sudo systemctl restart celerybeat.service``` (celery beat 구동)
```sudo systemctl restart celery.service``` (celery 구동)

##### 7. flower
celery 관리 package

```pip install flower```

###### flower 구동(daemon)
```sudo systemctl daemon-reload```
```sudo systemctl start flower```