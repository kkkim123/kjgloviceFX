from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from user import views
from .views import UserProfileViewSet
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('<int:pk>',views.UserProfile),
    path('document/new', views.DocUpload),
    path('document/<int:fxuser>', views.AlterDocUpload),

    path('introducingbroker/new',views.NewIntroducingBroker),
    path('introducingbroker/<int:fxuser>',views.AlterIntroducingBroker),
    path('myclient/<int:referral_code>', views.Client_list),

    path('choices', views.ChoicesView.as_view()),
    path('footer/quote', views.QueryFooterQuotesView.as_view()),
    path('mt4/quote', views.QueryQuotesView.as_view()),
    path('mypage/overview/<int:account>', views.QueryOverViewData.as_view()),

    path('idcheck', views.id_overlap_check),
    path('help/callback', views.RequestCallBackView.as_view())
]
urlpatterns = format_suffix_patterns(urlpatterns)
if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
