from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from fxaccount import views

urlpatterns = [
    #GET
    path('', views.FxAccountViews.as_view()),
    path('transfer', views.FxAccountTransactionViews.as_view()),
    path('deposit', views.DepositViews.as_view()),
    path('withdraw', views.WithdrawViews.as_view()),
    path('tradinghistory/<int:user>', views.TradingHistoryViews.as_view()),
    #path('clientlist/<int:user>', views.ClientAccountListViews.as_view()),
    path('clientaccountlist/<int:user>', views.ClientAccountListViews.as_view()),
    path('commissionhistory/<int:user>', views.CommissionHistoryViews.as_view()),
    path('withdraw', views.WithdrawViews.as_view()),
]
#<int:pk>
urlpatterns = format_suffix_patterns(urlpatterns)