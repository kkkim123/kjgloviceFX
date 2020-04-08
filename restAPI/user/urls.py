from django.urls import include, path

from rest_framework.urlpatterns import format_suffix_patterns
from user import views
from .views import UserProfileViewSet
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('myclient', views.Client_list), 
    path('document', views.DocUploadView.as_view()),
    path('introducingbroker/new',views.IntroducingBroker),
    path('introducingbroker/<int:fxuser>',views.AlterIntroducingBroker),
    path('<int:pk>',views.UserProfile),
]
urlpatterns = format_suffix_patterns(urlpatterns)
if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
