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
from user.views import UserActivationView
#from user import views

#router = DefaultRouter()
#router.register(r'user', views.UserList)
#router.register(r'userdetail', views.UserDetail)





urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include("user.urls")),
    # path('rest-auth/', include('rest_auth.urls')),
    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('fxaccount/', include('fxaccount.urls')),
    # path('accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),

	#path to djoser end points
    path('auth/', include('djoser.urls.base')),
    path('auth/', include('djoser.urls.authtoken')),
    #http://127.0.0.1:8000/auth/users/
    #http://127.0.0.1:8000/auth/token/login/
    path('authjwt/', include('djoser.urls.jwt')),
	#path('auth/users/activation/<str:uid>/<str:token>/', UserActivationView.as_view()),
	#path to our account's app endpoints
    #path("api/user/",include("user.urls"))
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    #path("user/registration/", include("user.registration.urls")),
    #path('/auth/users/activate/(?P<uid>[\w-]+)/(?P<token>[\w-]+)/$', UserActivationView.as_view()),

]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
#urlpatterns += router.urls