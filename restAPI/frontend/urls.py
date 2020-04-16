from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index),
    path('login', views.index),
    path('main', views.index),
    re_path('auth/users/activation/', views.index),
    re_path('auth/users/password/reset/confirm/', views.index),
    re_path('register/', views.index),
    re_path('reset/', views.index),
    re_path('market/', views.index),
    re_path('trading/', views.index),
    re_path('company/', views.index),
    re_path('mypage/', views.index),
]