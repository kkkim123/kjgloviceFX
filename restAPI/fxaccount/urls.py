from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from fxaccount import views

urlpatterns = [
    path('<int:pk>', views.FxAccountViews.as_view()), 
    path('deposit', views.DepositViews.as_view()),
    path('withdraw', views.WithdrawViews.as_view()),
]
#
urlpatterns = format_suffix_patterns(urlpatterns)