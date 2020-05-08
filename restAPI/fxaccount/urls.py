from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from fxaccount import views

urlpatterns = [
    path('<int:user>', views.FxAccountView),
    path('<int:user>/<int:pk>', views.AlterFxAccount),

    path('transfer/<int:user>', views.Transfer),
    path('transfer/<int:user>/<int:pk>', views.AlterTransfer),

    path('deposit/<int:user>', views.Deposit),
    path('deposit/<int:user>/<int:pk>', views.AlterDeposit),

    path('withdraw/<int:user>', views.Withdraw),
    path('withdraw/<int:user>/<int:pk>', views.AlterWithdraw),

    path('tradinghistory/<int:user>', views.TradingHistoryViews.as_view()),
    path('dailytrading/<int:user>/<int:mt4_account>', views.DailyTradingView),
    
    path('clientaccountlist/<int:user>', views.ClientAccountListViews.as_view()),

    path('commissionsummary/<int:user>', views.CommissionSummaryViews.as_view()),
    path('commissionmonthlysummary/<int:user>', views.CommissionMonthlyViews.as_view()),
    path('clientscommissionhistory/<int:user>', views.ClientsCommissionHistoryViews.as_view()),


    path('commissionhistory/<int:user>', views.CommissionHistoryViews.as_view()),
    path('commissionhistory/<int:user>/<int:mt4_login>', views.CommissionHistoryViewsDetail.as_view()),
    path('choices', views.ChoicesView.as_view()), 
    
]

urlpatterns = format_suffix_patterns(urlpatterns)