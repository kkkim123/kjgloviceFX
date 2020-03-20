from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from account import views

urlpatterns = [
    path('account/', views.AccountViews.as_view()), #http://127.0.0.1:8000/account/?email=qqq@qqq.com
    #path('user/detail/', views.UserDetail.as_view()),
]
#
urlpatterns = format_suffix_patterns(urlpatterns)