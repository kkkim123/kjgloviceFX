from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index),
    path('login', views.index),
    re_path('register/', views.index),
    path('rest', views.index),
    path('resetConfirm', views.index),
    path('trading', views.index),
]