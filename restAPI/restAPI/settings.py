import os
import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = '2)em3z^i^s$m!%dz#adud@!5+cfv-nfr3_i20v^n!tlxh9z&lv'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
INSTALLED_APPS += [
    'corsheaders',
    'django.contrib.sites',

    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_swagger',

    # 'allauth',
    # 'allauth.account',

    # 'rest_auth',
    # 'rest_auth.registration',

    'django_countries',
    #'snippets',
    'user.apps.UserConfig',
    #'api',
    #'djoser',


]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

ROOT_URLCONF = 'restAPI.urls'
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = [
"http://127.0.0.1:8000"
]
CORS_ALLOW_METHODS = (
'DELETE',
'GET',
'OPTIONS',
'PATCH',
'POST',
'PUT',
)
CORS_ALLOW_HEADERS = (
'accept',
'accept-encoding',
'authorization',
'access-control-request-method',
'access-control-request-headers',
'content-type',
'dnt',
'origin',
'user-agent',
'x-csrftoken',
'x-requested-with',
)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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
        'HOST': 'localhost',
        'PORT': '',
        'OPTIONS': {
            'init_command': 'SET sql_mode="STRICT_TRANS_TABLES"'
        }
    }

}


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

AUTH_USER_MODEL = 'user.User'
# REST_SESSION_LOGIN = True



# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# SITE_ID = 1
# ACCOUNT_AUTHENTICATION_METHOD = 'email'
# ACCOUNT_EMAIL_REQUIRED = True   
# ACCOUNT_USERNAME_REQUIRED = False

# REST_USE_JWT = True
# ACCOUNT_EMAIL_REQUIRED = False
# ACCOUNT_EMAIL_VERIFICATION = None
# ACCOUNT_LOGOUT_ON_GET = True


REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    )
}
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