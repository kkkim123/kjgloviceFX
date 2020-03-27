import os
import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

#박찬영 추가
ROOT_DIR = os.path.dirname(BASE_DIR)

SECRET_KEY = '2)em3z^i^s$m!%dz#adud@!5+cfv-nfr3_i20v^n!tlxh9z&lv'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1", "18.139.160.178", "ec2-18-139-160-178.ap-southeast-1.compute.amazonaws.com"]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
INSTALLED_APPS += [
	#third party package for user registration and authentication endpoints 	
    'djoser',
	'django.contrib.sites',
     #rest API implementation library for django
    'rest_framework',
    "rest_framework.authtoken",
	'rest_framework_swagger',
	#JWT authentication backend library
    'rest_framework_simplejwt',
    'user.apps.UserConfig',
    #'account.apps.AccountConfig',
    'allauth',
    'allauth.account',
    'frontend.apps.FrontendConfig',
]
MIDDLEWARE = [
    #'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

ROOT_URLCONF = 'restAPI.urls'
# CORS_ORIGIN_ALLOW_ALL = False
# CORS_ORIGIN_WHITELIST = [
# "http://127.0.0.1:8000"
# ]
# CORS_ALLOW_METHODS = (
# 'DELETE',
# 'GET',
# 'OPTIONS',
# 'PATCH',
# 'POST',
# 'PUT',
# )
# CORS_ALLOW_HEADERS = (
# 'accept',
# 'accept-encoding',
# 'authorization',
# 'access-control-request-method',
# 'access-control-request-headers',
# 'content-type',
# 'dnt',
# 'origin',
# 'user-agent',
# 'x-csrftoken',
# 'x-requested-with',
# )
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'restAPI.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    # }
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'kjgloviceweb',
        'USER': 'kj',
        'PASSWORD': 'admin1234',
        #HOST': 'localhost',
        'HOST': '167.99.76.48',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': 'SET sql_mode="STRICT_TRANS_TABLES"'
        }
    }

}

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'

#박찬영 추가
STATIC_DIR = os.path.join(BASE_DIR,'static/frontend/')
#FRONTEND_DIR = ROOT_DIR.path('frontend')
STATICFILES_DIRS = [
    STATIC_DIR,
]
STATIC_ROOT = os.path.join(ROOT_DIR, 'restAPI/frontend', '.static_root')



#LOGIN_URL = '/login/'
AUTH_USER_MODEL = 'user.FxUser'
# # REST_SESSION_LOGIN = True
# ACCOUNT_USER_MODEL_USERNAME_FIELD = None
# ACCOUNT_EMAIL_REQUIRED = True
# ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
# ACCOUNT_AUTHENTICATION_METHOD = 'email'
# ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
# ACCOUNT_CONFIRM_EMAIL_ON_GET = True
# ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = '/?verification=1'
# ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = '/?verification=1'

SITE_ID = 1
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# SITE_ID = 1
# ACCOUNT_AUTHENTICATION_METHOD = 'email'
# ACCOUNT_EMAIL_REQUIRED = True   
# ACCOUNT_USERNAME_REQUIRED = False

# REST_USE_JWT = True
# ACCOUNT_EMAIL_REQUIRED = False
# ACCOUNT_EMAIL_VERIFICATION = None
# ACCOUNT_LOGOUT_ON_GET = True
DJOSER = {
    "SEND_ACTIVATION_EMAIL": False,
    "PASSWORD_RESET_CONFIRM_URL": "#/password/reset/confirm/{uid}/{token}",
    "USERNAME_RESET_CONFIRM_URL": "#/username/reset/confirm/{uid}/{token}",
    "ACTIVATION_URL": "#/activate/{uid}/{token}",
}

JWT_AUTH = {'JWT_AUTH_HEADER_PREFIX': 'Token',}

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ),
}

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
]

EMAIL_HOST = 'smtp.gmail.com'
# 메일을 호스트하는 서버
EMAIL_PORT = '587'
# gmail과의 통신하는 포트
EMAIL_HOST_USER = 'sungchang@fbpasia.com'
# 발신할 이메일
EMAIL_HOST_PASSWORD = 'joy1378!'
# 발신할 메일의 비밀번호
EMAIL_USE_TLS = True
# TLS 보안 방법
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
# 사이트와 관련한 자동응답을 받을 이메일 주소,'webmaster@localhost'

MEDIA_URL =  '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
# #JWT_AUTH 설정을 위해 settings.py 맨 위해 import datetime을 추가하자!!
# JWT_AUTH = {
# # If the secret is wrong, it will raise a jwt.DecodeError telling you as such. You can still get at the payload by setting the JWT_VERIFY to False.
# 'JWT_VERIFY': True,
# # You can turn off expiration time verification by setting JWT_VERIFY_EXPIRATION to False.
# # If set to False, JWTs will last forever meaning a leaked token could be used by an attacker indefinitely.
# 'JWT_VERIFY_EXPIRATION': True,
# # This is an instance of Python's datetime.timedelta. This will be added to datetime.utcnow() to set the expiration time.
# # Default is datetime.timedelta(seconds=300)(5 minutes).
# 'JWT_EXPIRATION_DELTA': datetime.timedelta(hours=1),
# 'JWT_ALLOW_REFRESH': True,
# 'JWT_AUTH_HEADER_PREFIX': 'JWT',

#     # 'JWT_SECRET_KEY': SECRET_KEY,
#     # 'JWT_ALGORITHM': 'HS256',
#     # 'JWT_ALLOW_REFRESH': True,
#     # 'JWT_EXPIRATION_DELTA': datetime.timedelta(days=7),
#     # 'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=28),
# }
# REST_USE_JWT = True


# SWAGGER_SETTINGS = {
#     'LOGIN_URL': 'login',
#     'LOGOUT_URL': 'logout',
# }
