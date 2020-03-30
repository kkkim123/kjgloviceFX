# kjgloviceFX (React + Django)

#### 참고 포스팅
###### https://www.valentinog.com/blog/drf/#Django_REST_with_React_Django_and_React_together
###### https://medium.com/technest/implement-user-auth-in-a-django-react-app-with-knox-fc56cdc9211c
***
### Django
***

### 1. python, nodejs, yarn 공식홈페이지 설치
#### python : https://nodejs.org/ko/download/
#### nodejs : https://nodejs.org/ko/download/
#### yarn : https://yarnpkg.com/en/docs/install#windows-stable
#### mac 환경에서 python,pip 명령어 관련 url : https://velog.io/@doondoony/pipenv-101

## 최상위 디렉토리에서 진행, mac에서는 python3, pip3 -> 3.X.X 버전으로 진행

### 2. pip 버전 업데이트(react의 npm과 같은 패키지 관리자)
```python -m pip install --upgrade pip```
	
### 3. 가상환경 설치

***

### 3_1. virtualenv

##### 설치
```pip install virtualenv```

##### 패키지 종속성 관리(requirements.txt 생성)
##### 생성 : ```pip freeze > requirements.txt```
##### 패키지 설치 : ```pip install -r requirements.txt``` (Pipfile은 별도 설치 불가한 것 같음)
##### 가상환경 생성 : ```virtualenv 가상환경이름```
##### 가상환경 실행
###### mac
```source 가상환경폴더/bin/activate```
###### windows 
```가상환경폴더\Scripts>activate```

### 3_3. mysqlclient 관련

##### mac에서 pip install mysqlclient 실행 시 오류 해결 방법
##### 호환성 문제로 인해 오류가 발생하여, 수동설치로 해결
##### mysqlclient : https://github.com/PyMySQL/mysqlclient-python/archive/master.zip
##### 가상환경 실행 후, mysqlclient 폴더로 이동 후 python setup.py install

***


~4. 마이그레이션 적용~~
~python manage.py makemigrations~~
~python manage.py migrate~~

### 5. 서버 실행 (로컬환경)
```python manage.py runserver```

***
### React

#### restAPI/frontend 에서 front단 작업 진행하면 됩니다.
```npm install```

#### 적용하기 위해서 작업 후
```npm run build```

#### 웹팩으로 빌드 하여 frontend/static/frontend/main.js로 저장
#### frontend/templates/frontend/index.html에서 외부 script 적용

***
# AWS

#### 참고포스팅
###### https://nachwon.github.io/django-deploy-1-aws/
###### https://velog.io/@loakick/2019-11-19-0011-%EC%9E%91%EC%84%B1%EB%90%A8-2ck34lupye

# 서버 실행 (터미널)
```ssh -i (pem파일 경로) ubuntu@ec2-18-139-160-178.ap-southeast-1.compute.amazonaws.com```

# 가상환경 실행
```pyenv shell (로컬에서 작업할때와 동일한 가상환경 명)```

# React Build 와 Django 작업 완료 후 서버 내에서
## collectstatic
```python manage.py collectstatic```
## 정적인 파일들을 모아줍니다. 

```sudo systemctl daemon-reload```
```sudo systemctl restart nginx uwsgi```

### 서버 재부팅
