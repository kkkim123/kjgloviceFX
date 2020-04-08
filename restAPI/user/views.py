from .models import FxUser, FxUserDocument,IntroducingBroker
from .serializers import UserSerializer, DocumentSerializer,IntroducingBrokerSerializer , ClientSerializer
#from rest_framework_jwt.settings import api_settings
#from rest_framework import status, generics
from .permissions import IsOwnerProfileOrReadOnly,IsOwnerOnly,IsFKOwnerOnly
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import (CreateAPIView,ListCreateAPIView,ListAPIView,RetrieveUpdateDestroyAPIView,)
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets
import requests
from django.core.serializers.json import DjangoJSONEncoder
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
    #print('create')
    def create(self, request):
        permission_classes=[IsFKOwnerOnly,IsAuthenticated]
        print(request.data['fxuser'])
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
#작업 IB 해지 신청 및 신청 취소 

class ClientViewSet(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    def retrieve(self, request, pk=None):
        queryset = FxUser.objects.filter(referral_code = request.GET.get('referral_code'))
        serializer = ClientSerializer(queryset, many=True)
        return Response(serializer.data)

Client_list = ClientViewSet.as_view({
'get': 'retrieve',
})

class DocUploadView(APIView):
    parser_class = (FileUploadParser,)
    permission_classes=[IsAuthenticated]
    def post(self, request, *args, **kwargs):

      file_serializer = DocumentSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# class DocUploadViewSet(viewsets.ModelViewSet):
#     serializer_class = DocumentSerializer
#     parser_classes = (MultiPartParser, FormParser,)
#     queryset=FxUserDocument.objects.all()  
# class UploadDocumentCreate(CreateView):
#     queryset=FxUserDocument.objects.all()
#     serializer_class=DocumentSerializer

#     #@method_decorator(verified_email_required)
#     def dispatch(self, *args, **kwargs):
#         return super(UploadDocumentCreate, self).dispatch(*args, **kwargs)

#     def get_context_data(self, **kwargs):
#         ctx = super(UploadDocumentCreate, self).get_context_data(**kwargs)

#         # document 상황을 가져오기
#         doc_model_qs = FxUserDocument.objects.filter(fxuser=self.request.user)
#         if len(doc_model_qs) >= 1:
#             doc_model = doc_model_qs[0]
#             ctx['doc_photo_id'] = {'file': doc_model.doc_photo_id,
#                                    'status': doc_model.doc_photo_id_status,
#                                    'updated_at': doc_model.doc_photo_id_updated_at}
#             ctx['doc_POA'] = {'file': doc_model.doc_proof_of_residence,
#                               'status': doc_model.doc_proof_of_residence_status,
#                               'updated_at': doc_model.doc_proof_of_residence_updated_at}

#             ctx['doc_photo_id_2'] = {'file': doc_model.doc_photo_id_2,
#                                    'status': doc_model.doc_photo_id_2_status,
#                                    'updated_at': doc_model.doc_photo_id_2_updated_at}
#             ctx['doc_POA_2'] = {'file': doc_model.doc_proof_of_residence_2,
#                               'status': doc_model.doc_proof_of_residence_2_status,
#                               'updated_at': doc_model.doc_proof_of_residence_2_updated_at}


#         return ctx

#     def get_form_kwargs(self, **kwargs):
#         kwargs = super(UploadDocumentCreate, self).get_form_kwargs(**kwargs)

#         if 'data' in kwargs:
#             doc_model_qs = FxUserDocument.objects.filter(fxuser=self.request.user)
#             if len(doc_model_qs) >= 1:
#                 instance = doc_model_qs[0]
#                 kwargs.update({'instance': instance})

#         return kwargs

#     def form_valid(self, form):

#         doc_model = form.save(commit=False)
#         doc_model.fxuser = self.request.user

#         # 1. Handle file upload information (있으면 수정할 수 있도록 instance 을 넘긴다)
#         existing_model = None
#         doc_model_qs = FxUserDocument.objects.filter(fxuser=self.request.user)
#         if len(doc_model_qs) >= 1:
#             existing_model = doc_model_qs[0]

#         # 1. 각종 파일 처리하기
#         if 'doc_photo_id' in self.request.FILES:
#             # if request.FILES['doc_photo_id']:
#             form.doc_photo_id = self.request.FILES['doc_photo_id']
#             form.doc_photo_id_status = 'P'
#         elif existing_model is not None:
#             form.doc_photo_id = existing_model.doc_photo_id
#             form.doc_photo_id_status = existing_model.doc_photo_id_status

#         if 'doc_photo_id_2' in self.request.FILES:
#             # if request.FILES['doc_photo_id']:
#             form.doc_photo_id_2 = self.request.FILES['doc_photo_id_2']
#             form.doc_photo_id_2_status = 'P'
#         elif existing_model is not None:
#             form.doc_photo_id_2 = existing_model.doc_photo_id_2
#             form.doc_photo_id_2_status = existing_model.doc_photo_id_2_status

#         if 'doc_proof_of_residence' in self.request.FILES:
#             # if request.FILES['doc_proof_of_residence']:
#             form.doc_proof_of_residence = self.request.FILES['doc_proof_of_residence']
#             form.doc_proof_of_residence_status = 'P'
#         elif existing_model is not None:
#             form.doc_proof_of_residence = existing_model.doc_proof_of_residence
#             form.doc_proof_of_residence_status = existing_model.doc_proof_of_residence_status

#         if 'doc_proof_of_residence_2' in self.request.FILES:
#             # if request.FILES['doc_proof_of_residence']:
#             form.doc_proof_of_residence_2 = self.request.FILES['doc_proof_of_residence_2']
#             form.doc_proof_of_residence_2_status = 'P'
#         elif existing_model is not None:
#             form.doc_proof_of_residence_2 = existing_model.doc_proof_of_residence_2
#             form.doc_proof_of_residence_2_status = existing_model.doc_proof_of_residence_2_status

#         doc_model.save()

#         # # 2. 관리자에게 메일을 보냄
#         # user_name = get_user_name(user=self.request.user, blank_name="anonymous user")
#         # send_email_to_admin(
#         #     template_name='admin_new_document_request',
#         #     ctx={'user_name': user_name}
#         # )

#         return super(UploadDocumentCreate, self).form_valid(form)
