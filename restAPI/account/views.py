from .models import Account
from .serializers import AccountSerializer
from rest_framework import generics

class AccountViews(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
