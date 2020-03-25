# kjgloviceFX (React + Django)

#### 참고 포스팅
###### https://www.valentinog.com/blog/drf/#Django_REST_with_React_Django_and_React_together
###### https://medium.com/technest/implement-user-auth-in-a-django-react-app-with-knox-fc56cdc9211c
***
### 1. python, nodejs, yarn 공식홈페이지 설치
#### python : https://nodejs.org/ko/download/
#### nodejs : https://nodejs.org/ko/download/
#### yarn : https://yarnpkg.com/en/docs/install#windows-stable
#### mac 환경에서 python,pip 명령어 관련 url : https://velog.io/@doondoony/pipenv-101

## 최상위 디렉토리에서 진행, mac에서는 python3, pip3 -> 3.X.X 버전으로 진행

### 2. pip 버전 업데이트(react의 npm과 같은 패키지 관리자)
```python -m pip install --upgrade pip```

#### 2_1. React 단에서 사용된 패키지 업데이트(시간 다소 소요)
```npm install```
	

### 3. 가상환경 설치

***

### 3_1. pipenv

##### 설치
```pip install pipenv```

##### 패키지 종속성 관리(pipfile 생성)
##### 생성 : ```pipenv lock```
##### 패키지 설치 : ```pipenv install``` (requirements.txt가 있을경우 자동으로 Pipfile로 변환시켜 실행됨)

##### 가상환경 실행
```pipenv shell```

***

### 3_2. virtualenv

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
##### 가상환경 실행 후, unzip한 폴더에서 python setup.py install

***

### 4. 마이그레이션 적용
```python manage.py makemigrations```
```python manage.py migrate```

### 5. 서버 실행
```python manage.py runserver```