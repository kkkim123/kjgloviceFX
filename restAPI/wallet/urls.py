from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from wallet import views

urlpatterns = [
    path('<int:pk>', views.WalletView),
]

urlpatterns = format_suffix_patterns(urlpatterns)