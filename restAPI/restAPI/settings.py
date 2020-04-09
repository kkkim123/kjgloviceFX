import os
import datetime
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT_DIR = os.path.dirname(BASE_DIR)

SECRET_KEY = '2)em3z^i^s$m!%dz#adud@!5+cfv-nfr3_i20v^n!tlxh9z&lv'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*.glovice.com, *.compute.amazonaws.com']
CSRF_COOKIE_SECURE = True
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
INSTALLED_APPS += [	
	'django.contrib.sites',
    'rest_framework',
    "rest_framework.authtoken",
	'rest_framework_swagger',
    'rest_framework_simplejwt',
    'djoser',
    'allauth',
    'allauth.account',
    'user.apps.UserConfig',
    'fxaccount.apps.FxaccountConfig',
    #'django_countries', 
    #'simple_email_confirmation',
    #'treebeard',
    'debug_toolbar',
    'frontend.apps.FrontendConfig',
    'storages',
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
    'debug_toolbar.middleware.DebugToolbarMiddleware',
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
        'DIRS': [os.path.join(BASE_DIR, 'templates')], 
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
    },
    'backOffice': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'fbp_live',
        'USER': 'fbplive',
        'PASSWORD': 'j&serw$75',
        #HOST': 'localhost',
        'HOST': '222.122.34.248',
        'PORT': '33306',
        'OPTIONS': {
            'init_command': 'SET sql_mode="STRICT_TRANS_TABLES"'
        }
    }
}


    # 'backOffice': {
    #     'ENGINE': 'django.db.backends.mysql',
    #     'OPTIONS': {
    #         'read_default_file': "path/to/backoffice.cnf",
    #         'init_command': 'SET sql_mode="STRICT_TRANS_TABLES"',
    #     },
    # }



# DATABASE_ROUTERS = [
#     'fxaccount.routers.AuthRouter',  
# ]
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


PROTOCOL = "https"
DOMAIN = "glovicefx.com"
SITE_NAME = "kjgloiveFX.com"
DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': 'auth/users/password/reset/confirm/{uid}/{token}',
    #"USERNAME_RESET_CONFIRM_URL": "#/username/reset/confirm/{uid}/{token}",
    #'ACTIVATION_URL': 'auth/user/activation?uid={uid}&token={token}',
    'ACTIVATION_URL': 'auth/users/activation/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SEND_CONFRIMATION_EMAIL':True,
    'SERIALIZERS': {
        "activation": "djoser.serializers.ActivationSerializer",
    },
    'EMAIL':{
        'activation': 'djoser.email.ActivationEmail',
    },
    'PERMISSIONS':{
        'activation': ['rest_framework.permissions.AllowAny'],
        'password_reset': ['rest_framework.permissions.AllowAny'],
        'password_reset_confirm': ['rest_framework.permissions.AllowAny'],
        'set_password': ['djoser.permissions.CurrentUserOrAdmin'],
        'username_reset': ['rest_framework.permissions.AllowAny'],
        'username_reset_confirm': ['rest_framework.permissions.AllowAny'],
        'set_username': ['djoser.permissions.CurrentUserOrAdmin'],
        'user_create': ['rest_framework.permissions.AllowAny'],
        'user_delete': ['djoser.permissions.CurrentUserOrAdmin'],
        'user': ['djoser.permissions.CurrentUserOrAdmin'],
        'user_list': ['djoser.permissions.CurrentUserOrAdmin'],
        'token_create': ['rest_framework.permissions.AllowAny'],
        'token_destroy': ['rest_framework.permissions.IsAuthenticated'],
    },


}

JWT_AUTH = {'JWT_AUTH_HEADER_PREFIX': 'Token',}

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS':'rest_framework.schemas.coreapi.AutoSchema', 
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100,
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",
                                    "fxaccount.permissions.IsOwnerOnly",
                                    "user.permissions.IsOwnerOnly",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ),
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
}

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
]
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'sungchang@fbpasia.com'
EMAIL_HOST_PASSWORD='opercent21!@#'
EMAIL_PORT = 587




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

SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'basic': {
            'type': 'basic'
        }
    },
}
INTERNAL_IPS = ["127.0.0.1"]

# Local
# STATIC_DIR = os.path.join(BASE_DIR, 'static')
# STATICFILES_DIRS = [
#     STATIC_DIR,
# ]
# STATIC_ROOT = os.path.join(ROOT_DIR, '.static_root')

# MEDIA_URL =  '/media/'
# MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# AWS S3

CONFIG_SECRET_DIR = os.path.join(ROOT_DIR, '.config_secret')
CONFIG_SETTINGS_COMMON_FILE = os.path.join(CONFIG_SECRET_DIR, 'settings_common.json')

STATIC_DIR = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [
    STATIC_DIR,
]

MEDIA_URL =  '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# S3 Storage
DEFAULT_FILE_STORAGE = 'restAPI.storages.MediaStorage'
STATICFILES_STORAGE = 'restAPI.storages.StaticStorage'
MEDIAFILES_LOCATION = 'media'
STATICFILES_LOCATION = 'static'

# AWS Access
config_secret = json.loads(open(CONFIG_SETTINGS_COMMON_FILE).read())
AWS_ACCESS_KEY_ID = config_secret['aws']['access_key_id']
AWS_SECRET_ACCESS_KEY = config_secret['aws']['secret_access_key']
AWS_STORAGE_BUCKET_NAME = config_secret['aws']['s3_bucket_name']

# DATA_UPLOAD_MAX_MEMORY_SIZE = 1024000000 # value in bytes 1GB here
# FILE_UPLOAD_MAX_MEMORY_SIZE = 1024000000