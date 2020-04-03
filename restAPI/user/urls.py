from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from user import views
from django.conf import settings
from django.conf.urls.static import static
from . import views


#router = DefaultRouter()
#router.register('myclient',ClientViewSet)




urlpatterns = [
    path('myclient', views.Client_list), 
    path('document', views.DocUploadView.as_view()),
    path("introducingbroker",views.IntroducingBrokerView.as_view()),
   # retrieves profile details of the currently logged in user    ,name="profile"
    path('',views.userProfileDetailView.as_view()),
    #path('myclient/<int:referral_code>', views.ClientView.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)
if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# urlpatterns = [
#     path('user/', views.UserList.as_view()), #http://127.0.0.1:8000/user/?email=qqq@qqq.com
#     path('user/detail/', views.UserDetail.as_view()),
# ]
# #
# urlpatterns = format_suffix_patterns(urlpatterns)
# urlpatterns = [
#     # URLs that do not require a session or valid token
#     path("password/reset/", PasswordResetView.as_view(), name="rest_password_reset"),
#     path("password/reset/confirm/", PasswordResetConfirmView.as_view(), name="rest_password_reset_confirm"),
#     path("login/", LoginView.as_view(), name="rest_login"),
#     # URLs that require a user to be logged in with a valid session / token.
#     path("logout/", LogoutView.as_view(), name="rest_logout"),
#     path("details/", UserDetailsView.as_view(), name="rest_user_details"),
#     path("password/change/", PasswordChangeView.as_view(), name="rest_password_change"),
# ]