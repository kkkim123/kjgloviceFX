from rest_framework import serializers
from .models import User, USER_TYPES


class UserSerializer(serializers.Serializer):

    resident_country = serializers.CharField(max_length=240)
    email = serializers.EmailField()
    first_name  = serializers.CharField(max_length=240)
    last_name  = serializers.CharField(max_length=240)
    password = serializers.CharField(max_length=240)

    #residential address
    address = serializers.CharField(max_length=128)
    postal_code = serializers.CharField(max_length=36)
    city = serializers.CharField(max_length=36)

    #personal detail
    resident_country = serializers.CharField(max_length=128)
    birthday = serializers.DateTimeField()
    mobile = serializers.CharField(max_length=24)

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        #instance.user_type = validated_data.get('user_type', instance.user_type)
        instance.save()
        return instance







# class LoginSerializer(serializers.Serializer):
#     email = serializers.EmailField(required=False, allow_blank=True)
#     password = serializers.CharField(style={'input_type': 'password'})

#     def authenticate(self, **kwargs):
#         return authenticate(self.context['request'], **kwargs)

#     def _validate_email(self, email, password):
#         user = None

#         if email and password:
#             user = self.authenticate(email=email, password=password)
#         else:
#             msg = _('Must include "email" and "password".')
#             raise exceptions.ValidationError(msg)

#         return user

#     def validate(self, attrs):
#         email = attrs.get('email')
#         password = attrs.get('password')

#         user = None

#         if 'allauth' in settings.INSTALLED_APPS:
#             from allauth.account import app_settings

#             # Authentication through email
#             if app_settings.AUTHENTICATION_METHOD == app_settings.AuthenticationMethod.EMAIL:
#                 user = self._validate_email(email, password)

#         else:
#             # Authentication without using allauth
#             if email:
#                 try:
#                     username = UserModel.objects.get(email__iexact=email).get_username()
#                 except UserModel.DoesNotExist:
#                     pass

#         # # Did we get back an active user?
#         # if user:
#         #     if not user.is_active:
#         #         msg = _('User account is disabled.')
#         #         raise exceptions.ValidationError(msg)
#         # else:
#         #     msg = _('Unable to log in with provided credentials.')
#         #     raise exceptions.ValidationError(msg)

#         attrs['user'] = user
#         return attrs


# class TokenSerializer(serializers.ModelSerializer):
#     """
#     Serializer for Token model.
#     """

#     class Meta:
#         model = TokenModel
#         fields = ('key',)


# class UserDetailsSerializer(serializers.ModelSerializer):
#     """
#     User model w/o password
#     """
#     class Meta:
#         model = UserModel
#         fields = ('pk', 'username', 'email', 'first_name', 'last_name')
#         read_only_fields = ('email', )


# class JWTSerializer(serializers.Serializer):
#     """
#     Serializer for JWT authentication.
#     """
#     token = serializers.CharField()
#     user = serializers.SerializerMethodField()

#     def get_user(self, obj):
#         """
#         Required to allow using custom USER_DETAILS_SERIALIZER in
#         JWTSerializer. Defining it here to avoid circular imports
#         """
#         rest_auth_serializers = getattr(settings, 'REST_AUTH_SERIALIZERS', {})
#         JWTUserDetailsSerializer = import_callable(
#             rest_auth_serializers.get('USER_DETAILS_SERIALIZER', UserDetailsSerializer)
#         )
#         user_data = JWTUserDetailsSerializer(obj['user'], context=self.context).data
#         return user_data


# class PasswordResetSerializer(serializers.Serializer):
#     """
#     Serializer for requesting a password reset e-mail.
#     """
#     email = serializers.EmailField()

#     password_reset_form_class = PasswordResetForm

#     def get_email_options(self):
#         """Override this method to change default e-mail options"""
#         return {}

#     def validate_email(self, value):
#         # Create PasswordResetForm with the serializer
#         self.reset_form = self.password_reset_form_class(data=self.initial_data)
#         if not self.reset_form.is_valid():
#             raise serializers.ValidationError(self.reset_form.errors)

#         return value

#     def save(self):
#         request = self.context.get('request')
#         # Set some values to trigger the send_email method.
#         opts = {
#             'use_https': request.is_secure(),
#             'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
#             'request': request,
#         }

#         opts.update(self.get_email_options())
#         self.reset_form.save(**opts)


# class PasswordResetConfirmSerializer(serializers.Serializer):
#     """
#     Serializer for requesting a password reset e-mail.
#     """
#     new_password1 = serializers.CharField(max_length=128)
#     new_password2 = serializers.CharField(max_length=128)
#     uid = serializers.CharField()
#     token = serializers.CharField()

#     set_password_form_class = SetPasswordForm

#     def custom_validation(self, attrs):
#         pass

#     def validate(self, attrs):
#         self._errors = {}

#         # Decode the uidb64 to uid to get User object
#         try:
#             uid = force_text(uid_decoder(attrs['uid']))
#             self.user = UserModel._default_manager.get(pk=uid)
#         except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
#             raise ValidationError({'uid': ['Invalid value']})

#         self.custom_validation(attrs)
#         # Construct SetPasswordForm instance
#         self.set_password_form = self.set_password_form_class(
#             user=self.user, data=attrs
#         )
#         if not self.set_password_form.is_valid():
#             raise serializers.ValidationError(self.set_password_form.errors)
#         if not default_token_generator.check_token(self.user, attrs['token']):
#             raise ValidationError({'token': ['Invalid value']})

#         return attrs

#     def save(self):
#         return self.set_password_form.save()


# class PasswordChangeSerializer(serializers.Serializer):
#     old_password = serializers.CharField(max_length=128)
#     new_password1 = serializers.CharField(max_length=128)
#     new_password2 = serializers.CharField(max_length=128)

#     set_password_form_class = SetPasswordForm

#     def __init__(self, *args, **kwargs):
#         self.old_password_field_enabled = getattr(
#             settings, 'OLD_PASSWORD_FIELD_ENABLED', False
#         )
#         self.logout_on_password_change = getattr(
#             settings, 'LOGOUT_ON_PASSWORD_CHANGE', False
#         )
#         super(PasswordChangeSerializer, self).__init__(*args, **kwargs)

#         if not self.old_password_field_enabled:
#             self.fields.pop('old_password')

#         self.request = self.context.get('request')
#         self.user = getattr(self.request, 'user', None)

#     def validate_old_password(self, value):
#         invalid_password_conditions = (
#             self.old_password_field_enabled,
#             self.user,
#             not self.user.check_password(value)
#         )

#         if all(invalid_password_conditions):
#             err_msg = _("Your old password was entered incorrectly. Please enter it again.")
#             raise serializers.ValidationError(err_msg)
#         return value

#     def validate(self, attrs):
#         self.set_password_form = self.set_password_form_class(
#             user=self.user, data=attrs
#         )

#         if not self.set_password_form.is_valid():
#             raise serializers.ValidationError(self.set_password_form.errors)
#         return attrs

#     def save(self):
#         self.set_password_form.save()
#         if not self.logout_on_password_change:
#             from django.contrib.auth import update_session_auth_hash
#             update_session_auth_hash(self.request, self.user)









# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ['url', 'user_type', 'first_name', 'last_name', 'email','password']

# # class CreateUserSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = User
# #         fields = ("id", "username", "password")
# #         extra_kwargs = {"password": {"write_only": True}}

# #     def create(self, validated_data):
# #         user = User.objects.create_user(
# #             validated_data["username"], None, validated_data["password"]
# #         )
# #         return user


# # # 로그인
# # class LoginUserSerializer(serializers.Serializer):
# #     username = serializers.CharField()
# #     password = serializers.CharField()

# #     def validate(self, data):
# #         user = authenticate(**data)
# #         if user and user.is_active:
# #             return user
# #         raise serializers.ValidationError("Unable to log in with provided credentials.")