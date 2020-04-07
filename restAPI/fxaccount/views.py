from .models import FxAccount,DepositTransaction,WithdrawTransaction,FxAccountTransaction
from user.models import IntroducingBroker
from .serializers import FxAccountSerializer,DepositSerializer,WithdrawSerializer,WithdrawSerializer,FxAccountTransactionSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOnly
from django.db import connections
from django.http import HttpResponse,HttpResponseRedirect,JsonResponse
from django.core import serializers
from rest_framework.generics import (CreateAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView,DestroyAPIView,)
from django.core.serializers.json import DjangoJSONEncoder
import json
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.shortcuts import get_object_or_404
#신규 요청, 요청내역 조회 , 취소
class FxAccountViewSet(viewsets.ModelViewSet):
    permission_classes=[IsOwnerOnly,IsAuthenticated]
    queryset = FxAccount.objects.all()
    serializer_class = FxAccountSerializer
    lookup_field = 'user'

    def destroy(self, request, user,pk=None):
        instance = FxAccount.objects.get(user=user)
        if (instance.status != 'A') : 
            instance.delete()
            serializer = FxAccountSerializer(instance)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_304_NOT_MODIFIED)

FxAccount = FxAccountViewSet.as_view({
    'post' : 'create',
    'get': 'list',
    'put': 'update',
    'patch': 'partial_update',
    'delete' : 'destroy'
})

    # def get_queryset(self):
    #     return FxAccount.objects.get(id=self.request.user

#신규 요청, 요청내역 조회 , 취소
class FxAccountTransactionViews(ListCreateAPIView,DestroyAPIView):
    permission_classes=[IsAuthenticated]
    queryset = FxAccountTransaction.objects.all()
    serializer_class = FxAccountTransactionSerializer


#조회
class TradingHistoryViews(generics.ListAPIView):
    permission_classes=[IsOwnerOnly,IsAuthenticated]
    def get(self,request,user):
        queryset = FxAccount.objects.filter(user = user)
        #serializer_class = FxAccountSerializer
        #accRows = queryset
        #print(queryset[0].mt4_account)
        historyRows = []
        for acc in queryset : 
            with connections['backOffice'].cursor() as cursor:
                cursor.execute("set @CumSum := 0;")
                cursor.execute("select LOGIN as mt4_account, SYMBOL, CMD, VOLUME, OPEN_TIME, OPEN_PRICE, SL, TP, CLOSE_TIME, CLOSE_PRICE, PROFIT,"
                + "(@CumSum := @CumSum + PROFIT) as TOT_PROFIT from MT4_TRADES where LOGIN = " + acc.mt4_account +" AND CMD < 5 order by OPEN_TIME;")
                #print(cursor.description)
                columns = [col[0] for col in cursor.description]
                historyRows += [list(zip(columns, row)) for row in cursor.fetchall()]
                #historyRows.update(historyRows2)  SUM ('PROFIT') OVER (ORDER BY 'TICKET' ASC) as TOT_PROFIT
        json_val = json.dumps(historyRows,sort_keys=True,indent=1,cls=DjangoJSONEncoder)
        #json_val = json.dumps(historyRows)
        
        return HttpResponse(json_val)

#조회
class ClientAccountListViews(generics.ListAPIView):
    permission_classes=[IsOwnerOnly,IsAuthenticated]
    def get(self,request,user):
        queryset = IntroducingBroker.objects.filter(fxuser = user)
        rows = []
        for acc in queryset : 
            print(acc.ib_code)
            with connections['backOffice'].cursor() as cursor:
                cursor.execute("select MT4_LOGIN from IB_COMMISSION_STRUTURE where IB_LOGIN = '" + str(acc.ib_code) +"' AND IB_SEQ = 1;")
                print(cursor.description)
                columns = [col[0] for col in cursor.description]
                rows += [list(zip(columns, row)) for row in cursor.fetchall()]

        json_val = json.dumps(rows,sort_keys=True,indent=1,cls=DjangoJSONEncoder)
        return HttpResponse(json_val)
#조회
class CommissionHistoryViews(generics.ListAPIView):
    permission_classes=[IsOwnerOnly,IsAuthenticated]
    def get(self,request,user):
        queryset = IntroducingBroker.objects.filter(fxuser = user)
        rows = []
        for ib in queryset : 
            print(ib.ib_code)
            with connections['backOffice'].cursor() as cursor:
                cursor.callproc("SP_IB_COMMISSION_HISTORY_LIST", (ib.company_idx,ib.back_index,'Y','','',0,'','','',))
                columns = [col[0] for col in cursor.description]
                rows += [list(zip(columns, row)) for row in cursor.fetchall()]

        json_val = json.dumps(rows,sort_keys=True,indent=1,cls=DjangoJSONEncoder)
        return HttpResponse(json_val)

#신규 요청, 요청내역 조회 , 취소
class DepositViewSet(viewsets.ModelViewSet):
    permission_classes=[IsOwnerOnly,IsAuthenticated]  
    queryset = DepositTransaction.objects.all()
    serializer_class = DepositSerializer
    lookup_field = 'user'
    
    def destroy(self, request, user, pk):   
        instance = DepositTransaction.objects.get(user=user,pk = pk)
        if (instance.status != 'A') :
            instance.delete()
            serializer = DepositSerializer(instance)
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_304_NOT_MODIFIED)

Deposit = DepositViewSet.as_view({
    'post' : 'create',
    'get': 'list',
})
AlterDeposit = DepositViewSet.as_view({
    #'put': 'update',
    #'patch': 'partial_update',
    'delete' : 'destroy',
})

#신규 요청, 요청내역 조회 , 취소
class WithdrawViewSet(viewsets.ModelViewSet):
    permission_classes=[IsOwnerOnly,IsAuthenticated]  
    queryset = WithdrawTransaction.objects.all()
    serializer_class = WithdrawSerializer
    lookup_field = 'user'

    def destroy(self, request, user):
        instance = WithdrawTransaction.objects.get(user=user)
        if (instance.status != 'A') : 
            instance.delete()
            serializer = WithdrawSerializer(instance)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_304_NOT_MODIFIED)

Withdraw = WithdrawViewSet.as_view({
    'post' : 'create',
    'get': 'list',
})
AlterWithdraw = WithdrawViewSet.as_view({
   # 'put': 'update',
   # 'patch': 'partial_update',
    'delete' : 'destroy'
})










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
