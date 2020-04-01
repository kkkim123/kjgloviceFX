from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from fxaccount import views

urlpatterns = [
    path('<int:user>', views.FxAccountViews.as_view()),
    path('deposit', views.DepositViews.as_view()),
    path('withdraw', views.WithdrawViews.as_view()),
    path('tradinghistory/<int:user>', views.TradingHistoryViews.as_view()),
    path('clientaccount/<int:user>', views.ClientAccountViews.as_view()),
    path('withdraw', views.WithdrawViews.as_view()),
]
#<int:pk>
urlpatterns = format_suffix_patterns(urlpatterns)