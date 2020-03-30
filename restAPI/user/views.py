from .models import FxUser, FxUserDocument
from .serializers import UserSerializer, DocumentSerializer
#from rest_framework_jwt.settings import api_settings
#from rest_framework import status, generics
from .permissions import IsOwnerProfileOrReadOnly
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import (ListCreateAPIView,RetrieveUpdateDestroyAPIView,)
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

import requests
# @receiver(email_confirmed)
# def change_user_status(sender, **kwargs):
#     user_email_address = kwargs.pop('email_address')
#     qs = FxUser.objects.filter(email=user_email_address.email)
#     if qs.count() > 0:
#         user = qs[0]
#         user.user_status = '2'      # CONFIRMED_EMAIL_ADDRESS
#         user.save()
# def ActivateUserAccount(request, uidb64=None,token=None):
#  #print(force_text(urlsafe_base64_decode(uidb64)))
#     #print(token)
#     try:
#         uid = force_text(urlsafe_base64_decode(uidb64))
#         #print(type(uid),uid)
#         user = FxUser.objects.get(pk=uid)
#         print(user)
#     except User.DoesNotExist:
#         user = None
#     if user and default_token_generator.check_token(user,token):
#         user.is_email_verified = True
#         user.is_active = True
#         user.save()
#         login(request,user)
#         print("Activaton done")
#     else:
#         print("Activation failed")
# class UserActivationView(APIView):
#     try:
#         #uid = force_text(urlsafe_base64_decode(uidb64))
#         #print(type(uid),uid)
#         user = FxUser.objects.get(pk=uid)
#         print(user)
#     except FxUser.DoesNotExist:
#         user = None
#     if user and default_token_generator.check_token(user,token):
#         #user.is_email_verified = True
#         user.is_active = True
#         user.save()
#         #login(request,user)
#         print("Activaton done")
#     else:
#         print("Activation failed")


class UserActivationView(APIView):





    def get (self, request, uid, token):
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/auth/users/activate/"
        post_data = {'uid': uid, 'token': token}
        result = requests.post(post_url, data = post_data)
        content = result.text()
        return Response(content)
    # def get (self, request, uid, token):
    #     protocol = 'https://' if request.is_secure() else 'http://'
    #     web_url = protocol + request.get_host()
    #     post_url = web_url + "/auth/users/activate/"
    #     post_data = {'uid': uid, 'token': token}
    #     result = requests.post(post_url, data = post_data)
    #     content = result.text()
    #     return Response(content)

class UserProfileListCreateView(ListCreateAPIView):
    queryset=FxUser.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        user=self.request.user
        serializer.save(user=user)

#IsOwnerProfileOrReadOnly,
class userProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset=FxUser.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]

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
