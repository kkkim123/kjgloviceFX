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
python manage.py migrate~~

#### 5. 서버 실행 (로컬환경)
```python manage.py runserver```

***
### React

#### restAPI/frontend 에서 front단 작업 진행
```npm install```

#### 작업 후 빌드
```npm run build```

##### 웹팩으로 빌드: frontend/static/frontend/main.js
##### 외부 script 사용시: frontend/templates/frontend/index.html

***
### AWS 환경

##### 참고포스팅
###### https://nachwon.github.io/django-deploy-1-aws/
###### https://velog.io/@loakick/2019-11-19-0011-%EC%9E%91%EC%84%B1%EB%90%A8-2ck34lupye

#### React Build 와 Django 작업 완료 후 서버 터미널에서 

##### 서버 실행 (터미널)
```ssh -i (pem파일 경로) ubuntu@ec2-18-139-160-178.ap-southeast-1.compute.amazonaws.com```

##### 가상환경 실행
```pyenv shell (로컬에서 작업할때와 동일한 가상환경 명)```

##### pip 패키지 설치
```pip install -r requirements.txt```

##### collectstatic (manage.py가 존재하는 디렉토리에서)
```python manage.py collectstatic```

##### 서버 재부팅
```sudo systemctl daemon-reload```
```sudo systemctl restart nginx uwsgi```
