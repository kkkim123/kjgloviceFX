from .models import FxAccount,DepositTransaction,WithdrawTransaction,FxAccountTransaction
#,DailyTradingHistory
from .models import ACCOUNT_TYPES,ACCOUNT_BASE_CURRENCY_CHOICE,TRADING_PLATFORM_CHOICE,LEVERAGE_CHOICES,DEPOSIT_CRYPTO_CHOICE,WITHDRAW_CRYPTO_CHOICE
from user.models import IntroducingBroker
from .serializers import FxAccountSerializer,DepositSerializer,WithdrawSerializer,WithdrawSerializer,FxAccountTransactionSerializer
#,DailyTradingSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOnly,IsFKOwnerOnly
from django.db import connections
from django.http import HttpResponse,HttpResponseRedirect,JsonResponse
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder

from rest_framework.response import Response
from rest_framework import status, viewsets
from django.shortcuts import get_list_or_404, get_object_or_404
import json
from django.views import View
from django.db.models import Sum

import pandas as pd

class ChoicesView(View):
    def get(self, request):
        dummy_data = {
            'account_type' : json.dumps([x[1] for x in ACCOUNT_TYPES]),
            'base_currency' : json.dumps([x[1] for x in ACCOUNT_BASE_CURRENCY_CHOICE]),
            'trading_platform' : json.dumps([x[1] for x in TRADING_PLATFORM_CHOICE]),

            'leverage' : json.dumps([x[1] for x in LEVERAGE_CHOICES]),
            'deposit_crypto_method' : json.dumps([x[1] for x in DEPOSIT_CRYPTO_CHOICE] ),
            'withdraw_crypto_method' : json.dumps([x[1] for x in WITHDRAW_CRYPTO_CHOICE] ),
        }
        return JsonResponse(dummy_data)

class DailyTradingViewSet(viewsets.ModelViewSet):
    permission_classes=[IsFKOwnerOnly,IsAuthenticated]

    def list(self, request, *args, **kwargs):
        permission_classes=[IsFKOwnerOnly,IsAuthenticated]
        with connections['backOffice'].cursor() as cursor:
            cursor.execute("select CLOSE_TIME as date, PROFIT as profit"
            + " from MT4_TRADES where LOGIN = '" + str(kwargs['mt4_account']) + "';")

            df = pd.DataFrame(cursor.fetchall())
            df.columns=[col[0] for col in cursor.description] 
            df = df.set_index(['date'])
            df.index = pd.to_datetime(df.index, unit='s')

        daily_df = df.resample('D').sum()
        daily_df.index = daily_df.index.strftime('%Y-%m-%d')
        daily_df['cumsum'] = daily_df.profit.cumsum()
        result  = daily_df.to_json(orient="table")
        parsed = json.loads(result)
        json_val = json.dumps(parsed,sort_keys=True,indent=1,cls=DjangoJSONEncoder)
        return HttpResponse(json_val)

DailyTradingView = DailyTradingViewSet.as_view({
    'get': 'list',
})




#신규 요청, 요청내역 조회 , 취소
class FxAccountViewSet(viewsets.ModelViewSet):
    permission_classes=[IsFKOwnerOnly,IsAuthenticated]
    queryset = FxAccount.objects.all()
    serializer_class = FxAccountSerializer
    lookup_field = 'user'
    # def retrieve(self, request, user):
    #     queryset = FxAccount.objects.filter(user=user)
    #     serializer_class  = FxAccountSerializer(queryset, many=True)
    #     return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        history = get_list_or_404(self.queryset, user=kwargs['user'])
        serializer = FxAccountSerializer(history, many=True)
        return Response(serializer.data)

    def destroy(self, request, user, pk):   
        permission_classes=[IsOwnerOnly,IsAuthenticated]
        instance = FxAccount.objects.get(user=user,pk = pk)
        if (instance.status != 'A') :
            instance.delete()
            #serializer_class = FxAccountSerializer(instance)
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_304_NOT_MODIFIED)

FxAccountView = FxAccountViewSet.as_view({
    'post' : 'create',
    'get': 'list',
})
AlterFxAccount = FxAccountViewSet.as_view({
    #'put': 'update',
    #'patch': 'partial_update',
    'delete' : 'destroy',
})
    # def get_queryset(self):
    #     return FxAccount.objects.get(id=self.request.user
#Person.filter(name='신사임당').exclude('male')
#신규 요청, 요청내역 조회 , 취소

class FxAccountTransferViewSet(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]  
    queryset = FxAccountTransaction.objects.all()
    serializer_class = FxAccountTransactionSerializer
    lookup_field = 'user'

    def list(self, request, *args, **kwargs):
        permission_classes=[IsOwnerOnly,IsAuthenticated]
        deposit = get_list_or_404(self.queryset, user=kwargs['user'])
        page = self.paginate_queryset(deposit)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(deposit, many=True)
        return Response(serializer.data)

    def destroy(self, request, user, pk):   
        permission_classes=[IsOwnerOnly,IsAuthenticated]
        instance = FxAccountTransaction.objects.get(user=user,pk = pk)
        if (instance.status == 'P') :
            instance.delete()
            serializer = FxAccountTransactionSerializer(instance)
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_304_NOT_MODIFIED)

Transfer = FxAccountTransferViewSet.as_view({
    'post' : 'create',
    'get': 'list',
})
AlterTransfer = FxAccountTransferViewSet.as_view({
    #'put': 'update',
    #'patch': 'partial_update',
    'delete' : 'destroy',
})
# class TradingHistoryViewSet(viewsets.ModelViewSet):
#     #permission_classes=[IsFKOwnerOnly,IsAuthenticated]
#     def get(self,request,*args, **kwargs):
#         #permission_classes=[IsFKOwnerOnly,IsAuthenticated]
#         from_date = request.data['from_date']
#         to_date = request.data['to_date']

#         queryset = FxAccount.objects.filter(fxuser = kwargs['user'])
#         #serializer_class = FxAccountSerializerkwargs['user']
#         #accRows = queryset
#         #print(queryset[0].mt4_account)
#         historyRows = []
#         for acc in queryset : 
#             with connections['backOffice'].cursor() as cursor:
#                 cursor.execute("set @CumSum := 0;")
#                 cursor.execute("select LOGIN as mt4_account, SYMBOL, CMD, VOLUME, OPEN_TIME, OPEN_PRICE, SL, TP, CLOSE_TIME, CLOSE_PRICE, PROFIT,"
#                 + "(@CumSum := @CumSum + PROFIT) as TOT_PROFIT from MT4_TRADES where LOGIN = " + acc.mt4_account 
#                 +" AND OPEN_TIME >=" + from_date  
#                 +" AND OPEN_TIME <=" + to_date  
#                 +" AND CMD < 5 order by OPEN_TIME;")
#                 #print(cursor.description)
#                 columns = [col[0] for col in cursor.description]
#                 historyRows += [list(zip(columns, row)) for row in cursor.fetchall()]
#                 #historyRows.update(historyRows2)  SUM ('PROFIT') OVER (ORDER BY 'TICKET' ASC) as TOT_PROFIT
#         json_val = json.dumps(historyRows,sort_keys=True,indent=1,cls=DjangoJSONEncoder)

#         return HttpResponse(json_val)

# TradingHistory = TradingHistoryViewSet.as_view({
#     'post' : 'create',
#     'get': 'list',
# })

#조회
class TradingHistoryViews(generics.ListAPIView):
    permission_classes=[IsFKOwnerOnly,IsAuthenticated]
    def get(self,request,*args, **kwargs):
        permission_classes=[IsFKOwnerOnly,IsAuthenticated]
        from_date = request.GET['from_date']
        to_date = request.GET['to_date']
        page = int(request.GET['page'])
        acc = request.GET['acc']
        symbol = request.GET['symbol']
        cmd = request.GET['type']

        searchQuery = "";

        if page:
            page = (page - 1) * 10
        else:
            page = 10

        if symbol != "":
            searchQuery += "AND SYMBOL = '" + request.GET['symbol'] + " '"

        if cmd != "":
            searchQuery += "AND CMD = '" + request.GET['type'] + " '"

        queryset = FxAccount.objects.filter(user = kwargs['user'],mt4_account = acc)
        #serializer_class = FxAccountSerializerkwargs['user']
        #accRows = queryset
        #print(queryset[0].mt4_account)
        historyRows = []
        historyRows2 = 0

        for acc in queryset : 
            with connections['backOffice'].cursor() as cursor:
                cursor.execute("set @CumSum := 0;")
                cursor.execute("select LOGIN as mt4_account, SYMBOL, CMD, VOLUME, OPEN_TIME, OPEN_PRICE, SL, TP, CLOSE_TIME, CLOSE_PRICE, PROFIT"
                +" from MT4_TRADES where LOGIN = " + acc.mt4_account 
                +" AND OPEN_TIME >= '" + from_date + " 0:0:0' "
                +" AND OPEN_TIME <= '" + to_date  + " 23:59:59' "
                + searchQuery
                +" AND CMD < 5 order by OPEN_TIME LIMIT " + str(page) + ",10;")
        
                #print(cursor.description)(@CumSum := @CumSum + PROFIT) as TOT_PROFIT
                columns = [col[0] for col in cursor.description]
                historyRows += [list(zip(columns, row)) for row in cursor.fetchall()]
                #historyRows.update(historyRows2)  SUM ('PROFIT') OVER (ORDER BY 'TICKET' ASC) as TOT_PROFIT
        

        for acc in queryset : 
            with connections['backOffice'].cursor() as cursor:
                cursor.execute("select COUNT(*)"
                + "from MT4_TRADES where LOGIN = " + acc.mt4_account 
                +" AND OPEN_TIME >= '" + from_date + " 0:0:0' "
                +" AND OPEN_TIME <= '" + to_date  + " 23:59:59' "
                + searchQuery
                +" AND CMD < 5 order by OPEN_TIME;")      
                #print(cursor.description)
                columns = [col[0] for col in cursor.description]
                # print(cursor.fetchall())
                for q in cursor.fetchall():
                    historyRows2 += q[0]
                #historyRows.update(historyRows2)  SUM ('PROFIT') OVER (ORDER BY 'TICKET' ASC) as TOT_PROFIT
        
        historyRows += [historyRows2]
        json_val = json.dumps(historyRows,sort_keys=True,indent=1,cls=DjangoJSONEncoder)
        return HttpResponse(json_val)
#조회
class ClientAccountListViews(generics.ListAPIView):
    permission_classes=[IsAuthenticated]
    def get(self,request,user):
        queryset = IntroducingBroker.objects.filter(fxuser = user)
        rows = []
        for acc in queryset : 
            print(acc.ib_code)
            with connections['backOffice'].cursor() as cursor:
                cursor.execute("select * from IB_COMMISSION_STRUTURE where IB_LOGIN = '" + str(acc.ib_code) +"' ;")
                #cursor.execute("select MT4_LOGIN from IB_COMMISSION_STRUTURE where IB_LOGIN = '" + str(acc.ib_code) +"' ;")
                #AND IB_SEQ = 1
                print(cursor.description)
                columns = [col[0] for col in cursor.description]
                rows += [list(zip(columns, row)) for row in cursor.fetchall()]

        json_val = json.dumps(rows,sort_keys=True,indent=1,cls=DjangoJSONEncoder)
        return HttpResponse(json_val)
#조회
class CommissionHistoryViews(generics.ListAPIView):   
    permission_classes=[IsAuthenticated]
    def get(self,request,*args, **kwargs ):
        permission_classes=[IsAuthenticated]
        # from_date = request.data['from_date']
        # to_date = request.data['to_date']
        from_date = request.GET['from_date']
        to_date = request.GET['to_date']
        queryset = IntroducingBroker.objects.filter(fxuser = kwargs['user'])
        rows = []
        for ib in queryset : 
            print(ib.ib_code)
            with connections['backOffice'].cursor() as cursor:
                cursor.callproc("SP_IB_COMMISSION_HISTORY_LIST", (ib.company_idx,ib.id,'Y',from_date,to_date,0,'','','',))
                # cursor.callproc("SP_IB_COMMISSION_HISTORY_LIST", (ib.company_idx,283,'Y',from_date,to_date,0,'','','',))
                columns = [col[0] for col in cursor.description]
                rows += [list(zip(columns, row)) for row in cursor.fetchall()]

        json_val = json.dumps(rows,sort_keys=True,indent=1,cls=DjangoJSONEncoder)
        return HttpResponse(json_val)

class CommissionHistoryViewsDetail(generics.ListAPIView):
    permission_classes=[IsAuthenticated]
    def get(self,request,*args, **kwargs ):
        from_date = request.GET['from_date']
        to_date = request.GET['to_date']
        # from_date = request.data['from_date']
        # to_date = request.data['to_date']
        print(from_date)
        print(to_date)

        print(kwargs)
        queryset = IntroducingBroker.objects.filter(fxuser = kwargs['user'])
        rows = []
        #from_date = referral_code=kwargs['referral_code']
        for ib in queryset : 
            print(ib.ib_code)
            with connections['backOffice'].cursor() as cursor:
                cursor.callproc("SP_IB_COMMISSION_HISTORY_LIST", (ib.company_idx,ib.id,'Y',from_date,to_date,kwargs['mt4_login'],'','','',))
                # cursor.callproc("SP_IB_COMMISSION_HISTORY_LIST", (ib.company_idx,283,'Y',from_date,to_date,kwargs['mt4_login'],'','','',))
                columns = [col[0] for col in cursor.description]
                rows += [list(zip(columns, row)) for row in cursor.fetchall()]

        json_val = json.dumps(rows,sort_keys=True,indent=1,cls=DjangoJSONEncoder)
        return HttpResponse(json_val)


# class CommissionHistoryViewset(viewsets.ModelViewSet):
#     permission_classes=[IsAuthenticated]
#     def get(self,request,user):
#         queryset = IntroducingBroker.objects.filter(fxuser = user)
#         rows = []
#         for ib in queryset : 
#             print(ib.ib_code)
#             with connections['backOffice'].cursor() as cursor:
#                 cursor.callproc("SP_IB_COMMISSION_HISTORY_LIST", (ib.company_idx,ib.back_index,'Y','','',0,'','','',))
#                 columns = [col[0] for col in cursor.description]
#                 rows += [list(zip(columns, row)) for row in cursor.fetchall()]

#         json_val = json.dumps(rows,sort_keys=True,indent=1,cls=DjangoJSONEncoder)
#         return HttpResponse(json_val)
# CommissionHistory = FxAccountViewSet.as_view({
#     'post' : 'create',
#     'get': 'list',
# })
# DetailCommissionHistory = FxAccountViewSet.as_view({
#     #'put': 'update',
#     #'patch': 'partial_update',
#     'get' : 'destroy',
# })

#신규 요청, 요청내역 조회 , 취소
class DepositViewSet(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]  
    queryset = DepositTransaction.objects.all()
    serializer_class = DepositSerializer
    lookup_field = 'user'

    def list(self, request, *args, **kwargs):
        permission_classes=[IsOwnerOnly,IsAuthenticated]
        deposit = get_list_or_404(self.queryset, user=kwargs['user'])
        page = self.paginate_queryset(deposit)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(deposit, many=True)
        return Response(serializer.data)

    def destroy(self, request, user, pk):   
        permission_classes=[IsOwnerOnly,IsAuthenticated]
        instance = DepositTransaction.objects.get(user=user,pk = pk)
        if (instance.status == 'P') :
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
    permission_classes=[IsFKOwnerOnly,IsAuthenticated]  
    queryset = WithdrawTransaction.objects.all()
    serializer_class = WithdrawSerializer
    lookup_field = 'user'

    def list(self, request, *args, **kwargs):
        withdraw = get_list_or_404(self.queryset, user=kwargs['user'])
        page = self.paginate_queryset(withdraw)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(withdraw, many=True)
        return Response(serializer.data)

    def destroy(self, request, user, pk):  
        permission_classes=[IsOwnerOnly,IsAuthenticated] 
        instance = WithdrawTransaction.objects.get(user=user,pk = pk)
        if (instance.status == 'P') :
            instance.delete()
            serializer = WithdrawSerializer(instance)
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_304_NOT_MODIFIED)

Withdraw = WithdrawViewSet.as_view({
    'post' : 'create',
    'get': 'list',
})
AlterWithdraw = WithdrawViewSet.as_view({
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

