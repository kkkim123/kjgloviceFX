from .models import FxAccount,DepositTransaction,WithdrawTransaction
from .serializers import FxAccountSerializer,DepositSerializer,WithdrawSerializer
from rest_framework import generics

class FxAccountViews(generics.ListAPIView):
    queryset = FxAccount.objects.all()
    serializer_class = FxAccountSerializer

class DepositViews(generics.CreateAPIView):
    queryset = WithdrawTransaction.objects.all()
    serializer_class = DepositSerializer


class WithdrawViews(generics.CreateAPIView):
    queryset = WithdrawTransaction.objects.all()
    serializer_class = WithdrawSerializer