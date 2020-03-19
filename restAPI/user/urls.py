from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from user import views

urlpatterns = [
    path('user/', views.UserList.as_view()), #http://127.0.0.1:8000/user/?email=qqq@qqq.com
    path('user/detail/', views.UserDetail.as_view()),
]
#
urlpatterns = format_suffix_patterns(urlpatterns)
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