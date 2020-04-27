from .models import FxUser, FxUserDocument, IntroducingBroker,ApplyIntroducingBroker
from .models import EMPLOYMENT_STATUS_CHOICES, EMPLOYMENT_POSITION_CHOICES
from .models import EDUCATION_LEVEL_CHOICES, EST_ANNUAL_INCOME, INCOME_OF_SOURCE, TRADING_EXPERIENCE, TRADING_PERIOD

from .serializers import UserSerializer, DocumentSerializer, IntroducingBrokerSerializer, ClientSerializer, ApplyIntroducingBrokerSerializer
from .permissions import IsOwnerOnly, IsFKOwnerOnly

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.views import View
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import get_list_or_404, get_object_or_404
import requests
import json
import socket
from django.http import HttpResponse, JsonResponse


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


class QueryQuotesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        result_data = []

        try:
            # main server 연결
            sock.connect(('192.109.15.27', 443))
            # quotes string 선언
            quotes_str = 'EURUSD,GBPUSD,USDJPY,AUDUSD'
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
                        tmp['key'] = quote
                        # 기존에 뒤에값이 3자리로 들어오는 만큼 앞의값과 치환해서 자리수 맞춰 출력
                        quotes_value = split_data[1].split('/')
                        tmp['value'] = '{}/{}'.format(
                            quotes_value[0], quotes_value[0][0:-len(quotes_value[1])] + quotes_value[1])
                        result_data.append(tmp)

            return Response(status=status.HTTP_200_OK, data=result_data)

        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=None)
