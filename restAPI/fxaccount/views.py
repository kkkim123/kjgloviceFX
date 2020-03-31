from .models import FxAccount,DepositTransaction,WithdrawTransaction
from .serializers import FxAccountSerializer,DepositSerializer,WithdrawSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOnly
from django.db import connections
from django.http import HttpResponse,HttpResponseRedirect,JsonResponse
from django.core import serializers
from rest_framework.generics import (ListCreateAPIView,RetrieveUpdateDestroyAPIView,)
from django.core.serializers.json import DjangoJSONEncoder
import json
class FxAccountViews(generics.ListCreateAPIView):
    queryset = FxAccount.objects.all()
    serializer_class = FxAccountSerializer
    permission_classes=[IsOwnerOnly,IsAuthenticated]


class TradingHistoryViews(RetrieveUpdateDestroyAPIView):
    permission_classes=[IsOwnerOnly,IsAuthenticated]
    def get(self,request,user):
        queryset = FxAccount.objects.filter(user = user)
        #serializer_class = FxAccountSerializer
        accRows = queryset
        print(queryset[1].mt4_account)
        historyRows = []
        for acc in queryset : 
            with connections['backOffice'].cursor() as cursor:
                cursor.execute("set @CumSum := 0;")
                cursor.execute("select LOGIN as mt4_account, SYMBOL, CMD, VOLUME, OPEN_TIME, OPEN_PRICE, SL, TP, CLOSE_TIME, CLOSE_PRICE, PROFIT,"
                + "(@CumSum := @CumSum + PROFIT) as TOT_PROFIT from MT4_TRADES where LOGIN = " + acc.mt4_account +" AND CMD < 5 order by OPEN_TIME;")
                print(cursor.description)
                columns = [col[0] for col in cursor.description]
                historyRows += [list(zip(columns, row)) for row in cursor.fetchall()]
                #historyRows.update(historyRows2)  SUM ('PROFIT') OVER (ORDER BY 'TICKET' ASC) as TOT_PROFIT
        json_val = json.dumps(historyRows,sort_keys=True,indent=1,cls=DjangoJSONEncoder)
        #json_val = json.dumps(historyRows)
        
        return HttpResponse(json_val)

class DepositViews(generics.CreateAPIView):
    queryset = WithdrawTransaction.objects.all()
    serializer_class = DepositSerializer
    permission_classes=[IsOwnerOnly,IsAuthenticated]

class WithdrawViews(generics.CreateAPIView):
    queryset = WithdrawTransaction.objects.all()
    serializer_class = WithdrawSerializer
    permission_classes=[IsOwnerOnly,IsAuthenticated]
    
    # def post(self,request):
    #     with connections['backOffice'].cursor() as cursor:
    #         cursor.execute("select LOGIN, SYMBOL, CMD, VOLUME, OPEN_TIME, OPEN_PRICE, SL, TP,CLOSE_TIME,CLOSE_PRICE,PROFIT from MT4_TRADES where LOGIN = '10000003' AND CMD < 5")
    #         columns = [col[0] for col in cursor.description]
    #         rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
    #         #rint(columns)
    #         #print(rows)
    #         # Can't use query parameters here as they'll add single quotes which are not
    #         # supported by postgres
    #         #for table in tables:
    #         #   cursor.execute('drop table "' + table + '" cascade')
    #         #post_list = serializers.serialize('json', posts)
#     #         return HttpResponse(rows)
# #HttpResponse(post_list, content_type="text/json-comment-filtered")
# class TradingHistoryViews(generics.ListAPIView):
#     queryset = TradingHistory.objects.all()
#     serializer_class = TradingHistorySerializer
    #permission_classes=[IsOwnerOnly,IsAuthenticated]

    # def post(self,request):

    #     #print(queryset)
    #     with connections['backOffice'].cursor() as cursor:
    #         cursor.execute("select LOGIN, SYMBOL, CMD, VOLUME, OPEN_TIME, OPEN_PRICE, SL, TP,CLOSE_TIME,CLOSE_PRICE,PROFIT from MT4_TRADES where LOGIN = '10000003' AND CMD < 5")
    #         columns = [col[0] for col in cursor.description]
    #         rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
    #         return HttpResponse(rows)
