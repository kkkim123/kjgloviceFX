from .models import FxUser, FxUserDocument, IntroducingBroker,ApplyIntroducingBroker
from .models import EMPLOYMENT_STATUS_CHOICES, EMPLOYMENT_POSITION_CHOICES
from .models import EDUCATION_LEVEL_CHOICES, EST_ANNUAL_INCOME, INCOME_OF_SOURCE, TRADING_EXPERIENCE, TRADING_PERIOD

from .serializers import UserSerializer, DocumentSerializer, IntroducingBrokerSerializer, ClientSerializer, ApplyIntroducingBrokerSerializer, RequestCallSerializer
from .permissions import IsOwnerOnly, IsFKOwnerOnly

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.core.mail import send_mail
from django.views import View
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import get_list_or_404, get_object_or_404
import requests
import json
import socket
from django.http import HttpResponse, JsonResponse

indices_dict = {
    'AUS200':'Australia 200',
    'DE30':'Germany 30',
    'HK50':'Hong Kong 50',
    'ES35':'Spain 35',
    'F40':'France 40',
    'JP225':'Japan 225',
    'N25':'Netherlands 25',
    'STOXX50.c':'Euro 50',
    'SWI20.c':'Switzerland 20',
    'UK100.c':'UK 100',
    'USTEC.c':'Nasdaq 100',
    'US500.c':'S&P 500',
    'DJ30.c':'Dow Jones 30'
}

metals_dict = {
    'XAGUSD':'Silver USD',
    'XAUUSD':'Gold USD',
    'XPDUSD':'Palladium USD',
    'XPTUSD':'Platinium USD'
}

energies_dict = {
    'WTI_OIL': 'Crude Oil',
    'UKOIL.c': 'Brent Oil'
}

commodity_dict = {
    'UKOIL.f': 'Brent Oil',
    'USOIL.f': 'Crude Oil',
    'NGAS.f': 'Natural Gas',
    'DE30.f': 'Germany 30',
    'DJ30.f': 'Dow Jones 30',
    'DX.f': 'Dollar Index',
    'US500.f': 'S&P 500',
    'USTEC.f': 'Nasdaq 100',
    'CC.f': 'US Cocoa',
    'KC.f': 'US Coffee',
    'CT.f': 'US Cotton',
    'SB.f': 'US Sugar'
}


class ChoicesView(View):
    def get(self, request):
        dummy_data = {
            'employment_status': json.dumps([x[1] for x in EMPLOYMENT_STATUS_CHOICES]),
            'employment_position': json.dumps([x[1] for x in EMPLOYMENT_POSITION_CHOICES]),
            'education_level': json.dumps([x[1] for x in EDUCATION_LEVEL_CHOICES]),

            'annual_income': json.dumps([x[1] for x in EST_ANNUAL_INCOME]),
            'income_source': json.dumps([x[1] for x in INCOME_OF_SOURCE]),
            'trading_experience': json.dumps([x[1] for x in TRADING_EXPERIENCE]),
            'trading_period': json.dumps([x[1] for x in TRADING_PERIOD]),
        }
        print(dummy_data)
        return JsonResponse(dummy_data)

# 조회 수정

def id_overlap_check(request):
    email = request.GET.get('email')
    try:
        # 중복 검사 실패
        user = FxUser.objects.get(email=email)
    except:
        # 중복 검사 성공
        user = None
    if user is None:
        overlap = "This is a possible email."
    else:
        overlap = "It already exists."
    context = {'overlap': overlap}
    return JsonResponse(context) 

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = FxUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsOwnerOnly, IsAuthenticated]
    def retrieve(self, request, *args, **kwargs):
        permission_classes = [IsOwnerOnly, IsAuthenticated]
        fxuser = FxUser.objects.get(id=kwargs['pk'])
        print(fxuser.referral_website)
        if(fxuser.referral_website == None or fxuser.referral_website == ""):
            ib = IntroducingBroker.objects.get(ib_code = fxuser.referral_code)
            fxuser.referral_website  = ib.ib_website
            fxuser.save()
        queryset = FxUser.objects.all()
        user = get_object_or_404(queryset, id=kwargs['pk'])
        serializer = UserSerializer(user)
        return Response(serializer.data)

UserProfile = UserProfileViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update'
})


class ApplyIntroducingBrokerViewSet(viewsets.ModelViewSet):
    queryset = ApplyIntroducingBroker.objects.all()
    serializer_class = ApplyIntroducingBrokerSerializer
    permission_classes = [IsFKOwnerOnly, IsAuthenticated]
    lookup_field = 'fxuser'

    # def create(self, request):
    #     permission_classes = [IsFKOwnerOnly, IsAuthenticated]
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


NewIntroducingBroker = ApplyIntroducingBrokerViewSet.as_view({
    'post': 'create',
})
AlterIntroducingBroker = ApplyIntroducingBrokerViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update'
})
# 작업 IB 해지 신청은 오프라인으로

class ClientViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = FxUser.objects.all()
    serializer_class = ClientSerializer
    lookup_field = 'referral_code'

    def list(self, request, *args, **kwargs):
        clients = get_list_or_404(
            self.queryset, referral_code=kwargs['referral_code'])
        serialized = ClientSerializer(clients, many=True)
        return Response(serialized.data)


Client_list = ClientViewSet.as_view({
    'get': 'list',
})


class DocUploadViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = FxUserDocument.objects.all()
    serializer_class = DocumentSerializer
    parser_class = (FileUploadParser,)
    lookup_field = 'fxuser'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        parser_class = (FileUploadParser,)
        self.perform_create(serializer)

        fxuser = FxUser.objects.get(id=request.data['fxuser'])
        if(5 > int(fxuser.user_status)):
            fxuser.user_status = '5'
            fxuser.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def retrieve(self, request, *args, **kwargs):
        queryset = FxUserDocument.objects.all()
        doc = get_object_or_404(queryset, fxuser=kwargs['fxuser'])
        serializer = DocumentSerializer(doc)
        return Response(serializer.data)


DocUpload = DocUploadViewSet.as_view({
    'post': 'create'
})
AlterDocUpload = DocUploadViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})


class UserActivationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, uid, token):
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + '/auth/users/activation/'
        print(post_url)
        post_data = {'uid': uid, 'token': token}
        result = requests.post(post_url, data=post_data)

        if result.status_code == 204:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uid, token):
        print(uid, token)


class QueryFooterQuotesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            result_data = []

            sock.connect(('192.109.15.27', 443))
            quotes_str = 'EURUSD,GBPUSD,GOLD,USOIL,S&P500,BTCUSD'
            send_data = 'WWAPQUOTES-{}'.format(quotes_str)+'\n'
            sock.send(send_data.encode('utf-8'))

            recv = sock.recv(1024)

            quote_data = recv.decode('utf-8').replace('<br/>', '').split('\r\n')

            quotes = quotes_str.split(',')

            for quote in quotes:
                for data in quote_data:
                    tmp = {'key': None, 'value': None}
                    # 조회조건으로 조회한 socket receive 결과가 있는지 여부에 따라 최종 result_data로 저장
                    if data.startswith(quote.lower()):
                        split_data = data.split(' ')
                        tmp['key'] = quote
                        quotes_value = split_data[1].split('/')
                        tmp['value'] = quotes_value[0]
                        result_data.append(tmp)

            return Response(status=status.HTTP_200_OK, data=result_data)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=None)


class QueryQuotesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            symbol = request.GET.get('symbol', '')
            
            quotes_str = None

            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            result_data = []
            idx = 0

            # main server 연결
            sock.connect(('192.109.15.27', 443))
            # quotes string 선언
            if symbol == 'forex':
                quotes_str = 'AUDUSD,CADCHF,CADJPY,CHFJPY,EURCAD,EURCHF,EURGBP,EURJPY,EURUSD,GBPCAD,GBPCHF,GBPJPY,GBPUSD,USDCAD,USDCHF,USDJPY'
            elif symbol == 'indices':
                quotes_str = 'AUS200,DE30,HK50,ES35,F40,JP225,N25,STOXX50.c,SWI20.c,UK100.c,USTEC.c,US500.c,DJ30.c'
            elif symbol == 'metals':
                quotes_str = 'XAGUSD,XAUUSD,XPDUSD,XPTUSD'
            elif symbol == 'energies':
                quotes_str = 'WTI_OIL,UKOIL.c'
            elif symbol == 'crypto':
                quotes_str = 'BTCUSD,ETHUSD,LTCUSD,DSHUSD,XRPUSD'
            elif symbol == 'commodity':
                quotes_str = 'UKOIL.f,USOIL.f,NGAS.f,DE30.f,DJ30.f,DX.f,US500.f,USTEC.f,CC.f,KC.f,CT.f,SB.f'
            
            send_data = 'WWAPQUOTES-{}'.format(quotes_str)+'\n'
            sock.send(send_data.encode('utf-8'))

            # data receive
            recv = sock.recv(1024)
            quote_data = recv.decode(
                'utf-8').replace('<br/>', '').split('\r\n')

            # 비교를 위해 콤마(,)로 split
            quotes = quotes_str.split(',')

            for quote in quotes:
                for data in quote_data:
                    tmp = {'key': None, 'value': None}
                    # 조회조건으로 조회한 socket receive 결과가 있는지 여부에 따라 최종 result_data로 저장
                    if data.startswith(quote.lower()):
                        split_data = data.split(' ')
                        
                        if symbol == 'indices':
                            tmp['key'] = indices_dict[quote]
                        elif symbol == 'metals':
                            tmp['key'] = metals_dict[quote]
                        elif symbol == 'energies':
                            tmp['key'] = energies_dict[quote]
                        elif symbol == 'commodity':
                            tmp['key'] = commodity_dict[quote]
                        else:
                            tmp['key'] = quote

                        quotes_value = split_data[1].split('/')
                        
                        # footer 외에서 호출한 경우, 기존에 뒤에값이 3자리로 들어오는 만큼 앞의값과 치환해서 자리수 맞춰 출력
                        tmp['sell'] = quotes_value[0]
                        tmp['buy'] = quotes_value[0][0:-len(quotes_value[1])] + quotes_value[1]
                        del tmp['value']
                        # tmp['value'] = '{}/{}'.format(
                        # quotes_value[0], quotes_value[0][0:-len(quotes_value[1])] + quotes_value[1])
                        result_data.append(tmp)

            return Response(status=status.HTTP_200_OK, data=result_data)

        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=None)


class QueryOverViewData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            # req = requests.get('http://localhost:9090/?account={}'.format(kwargs['account']))
            req = requests.get('http://45.32.18.24:9292/?account={}'.format(kwargs['account']))
            
            result = None

            if req.status_code == 200:
                json_data = json.loads(req.content.decode('utf-8'))
                result = json_data

            return Response(status=status.HTTP_200_OK, data=result)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=None)


class RequestCallBackView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        from_email = request.POST.get('subject', '')
        subject = request.POST.get('subject', '')
        content = request.POST.get('content', '')
        
        serializer = RequestCallSerializer(data=request.data)
        if serializer.is_valid():
            # send_mail
            send_mail(
                subject,
                content,
                from_email,
                ['support@fbpasia.com'],
                # ['jhlee@fbpasia.com'],
                fail_silently=False,
            )

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)