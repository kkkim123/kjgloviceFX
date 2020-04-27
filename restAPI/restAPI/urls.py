"""restAPI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from allauth.account.views import confirm_email
from django.urls import include, path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from user import views as user_views

#router = DefaultRouter()
#router.register(r'user', views.UserList)
#router.register(r'userdetail', views.UserDetail)


from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')


urlpatterns = [
    path('admin/', admin.site.urls),

    path('user/', include("user.urls")),
    path('fxaccount/', include('fxaccount.urls')),
    path('wallet/', include('wallet.urls')),
    path('auth/', include('djoser.urls.base')),
    path('auth/', include('djoser.urls.authtoken')),
    # path('auth/users/activation/<str:uid>/<str:token>', user_views.UserActivationView.as_view()),
    # path('auth/users/password/reset/confirm/<str:uid>/<str:token>', user_views.UserResetPasswordView.as_view())

    #path('authjwt/', include('djoser.urls.jwt')),

    #path('swagger', schema_view)
]

urlpatterns += [
    path('', include('frontend.urls')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
#urlpatterns += router.urls