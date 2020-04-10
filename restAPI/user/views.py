from .models import FxUser, FxUserDocument,IntroducingBroker
from .serializers import UserSerializer, DocumentSerializer,IntroducingBrokerSerializer , ClientSerializer
from .permissions import IsOwnerOnly,IsFKOwnerOnly

from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import get_list_or_404, get_object_or_404
import requests
import json
#조회 수정 
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset=FxUser.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsOwnerOnly,IsAuthenticated]

UserProfile = UserProfileViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update'
})



class IntroducingBrokerViewSet(viewsets.ModelViewSet):
    queryset=IntroducingBroker.objects.all()
    serializer_class=IntroducingBrokerSerializer
    permission_classes=[IsFKOwnerOnly,IsAuthenticated]
    lookup_field = 'fxuser'

    def create(self, request):
        permission_classes=[IsFKOwnerOnly,IsAuthenticated]
        serializer = self.get_serializer(data=request.data )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

IntroducingBroker = IntroducingBrokerViewSet.as_view({
    'post' : 'create',
})
AlterIntroducingBroker = IntroducingBrokerViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update'
})
#작업 IB 해지 신청은 오프라인으로  

#리스트 조회
class ClientViewSet(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    queryset = FxUser.objects.all()
    serializer_class = ClientSerializer
    lookup_field = 'referral_code'

    def list(self, request, *args, **kwargs):
        clients = get_list_or_404(self.queryset, referral_code=kwargs['referral_code'])
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
    'delete' : 'destroy',
})
