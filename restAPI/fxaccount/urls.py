from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from fxaccount import views

urlpatterns = [
    #GET dfgdfgdfdfgddfg
    path('<int:user>', views.FxAccount),
    path('<int:user>/<int:pk>', views.AlterFxAccount),

    path('transfer', views.FxAccountTransactionViews.as_view()),

    path('deposit/<int:user>', views.Deposit),
    path('deposit/<int:user>/<int:pk>', views.AlterDeposit),

    path('withdraw/<int:user>', views.Withdraw),
    path('withdraw/<int:user>/<int:pk>', views.AlterWithdraw),

    path('tradinghistory/<int:user>', views.TradingHistoryViews.as_view()),

    path('clientaccountlist/<int:user>', views.ClientAccountListViews.as_view()),
    path('commissionhistory/<int:user>', views.CommissionHistoryViews.as_view()),
    path('commissionhistory/<int:user>/<int:mt4_login>', views.CommissionHistoryViewsDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)