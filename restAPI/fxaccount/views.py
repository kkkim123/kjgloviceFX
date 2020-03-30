from .models import FxAccount,DepositTransaction,WithdrawTransaction
from .serializers import FxAccountSerializer,DepositSerializer,WithdrawSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOnly
from django.db import connections
from django.http import HttpResponse,HttpResponseRedirect
class FxAccountViews(generics.ListAPIView):
    queryset = FxAccount.objects.all()
    serializer_class = FxAccountSerializer
    permission_classes=[IsOwnerOnly,IsAuthenticated]
class DepositViews(generics.CreateAPIView):
    queryset = WithdrawTransaction.objects.all()
    serializer_class = DepositSerializer
    permission_classes=[IsOwnerOnly,IsAuthenticated]

class WithdrawViews(generics.CreateAPIView):
    queryset = WithdrawTransaction.objects.all()
    serializer_class = WithdrawSerializer
    permission_classes=[IsOwnerOnly,IsAuthenticated]


    def post(self,request):
        """
        Reset database to a blank state by removing all the tables and recreating them.
        """
        with connections['backOffice'].cursor() as cursor:
            cursor.execute("select * from MT4_TRADES where LOGIN = '10000003'")
            results = list(cursor.fetchall())
            print(results)
            # Can't use query parameters here as they'll add single quotes which are not
            # supported by postgres
            #for table in tables:
            #   cursor.execute('drop table "' + table + '" cascade')
        return HttpResponse(results)