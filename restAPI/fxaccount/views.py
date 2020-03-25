from .models import FxAccount
from .serializers import FxAccountSerializer
from rest_framework import generics

class FxAccountViews(generics.ListAPIView):
    queryset = FxAccount.objects.all()
    serializer_class = FxAccountSerializer
