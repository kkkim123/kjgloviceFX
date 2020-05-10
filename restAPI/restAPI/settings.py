from celery.schedules import crontab

import os
import datetime
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT_DIR = os.path.dirname(BASE_DIR)

SECRET_KEY = '2)em3z^i^s$m!%dz#adud@!5+cfv-nfr3_i20v^n!tlxh9z&lv'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    "localhost",
    ".ap-southeast-1.compute.amazonaws.com", 
    "glovicefx.com",
]
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
    'wallet.apps.WalletConfig',
    #'debug_toolbar',
    'frontend.apps.FrontendConfig',
    'storages',
    'django_mptt_admin',
    'django_celery_results', # django celery 결과
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
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'read_default_file': "./my.cnf",
            'init_command': 'SET sql_mode="STRICT_TRANS_TABLES"'
        }
    },

    'backOffice': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'read_default_file': "./demo_backoffice.cnf",
            'init_command': 'SET sql_mode="STRICT_TRANS_TABLES"',
        },
    },

    # 'backOffice': {
    #     'ENGINE': 'django.db.backends.mysql',
    #     'OPTIONS': {
    #         'read_default_file': "./backoffice.cnf",
    #         'init_command': 'SET sql_mode="STRICT_TRANS_TABLES"',
    #     },
    # },
}


# EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

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

PROTOCOL = "https"
DOMAIN = "glovicefx.com"
SITE_NAME = "kjgloiveFX.com"

# PROTOCOL = "http"
# DOMAIN = "localhost:8000"
# SITE_NAME = "kjgloiveFX.com"

DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': 'auth/users/password/reset/confirm/{uid}/{token}',
    #"USERNAME_RESET_CONFIRM_URL": "#/username/reset/confirm/{uid}/{token}",
    'ACTIVATION_URL': 'auth/users/activation/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    #'SEND_ACTIVATION_EMAIL': False,
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
# djang rest framework pagniation 변경
    'DEFAULT_PAGINATION_CLASS': 'common.utils.paginationUtil.CustomPagination', 
    'PAGE_SIZE': 10,
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

CONFIG_SECRET_DIR = os.path.join(ROOT_DIR, '.config_secret')
CONFIG_SETTINGS_COMMON_FILE = os.path.join(CONFIG_SECRET_DIR, 'settings_common.json')
config_secret = json.loads(open(CONFIG_SETTINGS_COMMON_FILE).read())

EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_HOST_USER = 'apikey'
EMAIL_HOST_PASSWORD = config_secret['sendgrid']['api_key_id']
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
DEFAULT_FROM_EMAIL = 'jhlee@fbpasia.com'


# DEFAULT_FROM_EMAIL = 'korea7030.jhl@gmail.com'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = 'sungchang@fbpasia.com'
# EMAIL_HOST_PASSWORD=''
# EMAIL_PORT = 587

# SWAGGER_SETTINGS = {
#     'SECURITY_DEFINITIONS': {
#         'basic': {
#             'type': 'basic'
#         }
#     },
# }

# SWAGGER_SETTINGS = {
#     'SECURITY_DEFINITIONS': {
#         'basic': {
#             'type': 'basic'
#         }
#     },
# }

# Rabbitmq related settings 
CELERY_BROKER_URL = 'amqp://{}:{}@localhost:5672//'.format(config_secret['rabbitmq']['id'], config_secret['rabbitmq']['pwd'])
# CELERY_BROKER_URL = 'amqp://{}:{}@localhost:5672//'.format('admin', 'admin')
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE='UTC'
CELERY_ENABLE_UTC=True
CELERY_RESULT_BACKEND = 'django-db'


# beat schedule setting
CELERY_BEAT_SCHEDULE = {
    'get_transaction_list': {
        'task': 'wallet.tasks.get_transaction_list',
        'schedule': crontab(minute='*/2'), # execute every 2 minutes
    }
}

#########
# Local #
#########

# STATIC_DIR = os.path.join(BASE_DIR, 'static')
# STATICFILES_DIRS = [
#     STATIC_DIR,
# ]
# STATIC_ROOT = os.path.join(ROOT_DIR, '.static_root')

# MEDIA_URL =  '/media/'
# MEDIA_ROOT = os.path.join(BASE_DIR, "media")

##########
# AWS S3 #
##########

# AWS Access
config_secret = json.loads(open(CONFIG_SETTINGS_COMMON_FILE).read())
AWS_STORAGE_BUCKET_NAME = config_secret['aws']['s3_bucket_name']
CONFIG_SECRET_DIR = os.path.join(ROOT_DIR, '.config_secret')
CONFIG_SETTINGS_COMMON_FILE = os.path.join(CONFIG_SECRET_DIR, 'settings_common.json')

AWS_ACCESS_KEY_ID = config_secret['aws']['access_key_id']
AWS_SECRET_ACCESS_KEY = config_secret['aws']['secret_access_key']
AWS_SES_REGION_NAME = 'ap-southeast-2'
AWS_SES_REGION_ENDPOINT = 'email-smtp.ap-southeast-2.amazonaws.com'

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

#################################
# BACKOFFICE ACCOUNT - ADMIN 용 #
#################################
BACKOFFICE_ID = config_secret['backoffice']['id']
BACKOFFICE_PWD = config_secret['backoffice']['pwd']
