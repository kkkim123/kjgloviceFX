from rest_framework import serializers
from .models import FxUser, FxUserDocument,IntroducingBroker
# class ChoicesField(serializers.Field):
#     def __init__(self, choices, **kwargs):
#         self._choices = choices
#         super(ChoicesField, self).__init__(**kwargs)

#     def to_representation(self, obj):
#         return self._choices[obj]

#     def to_internal_value(self, data):
#         return getattr(self._choices, data)

class UserSerializer(serializers.ModelSerializer):
    #user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model = FxUser
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = FxUser
        fields = ('resident_country' , 'first_name','last_name',
        'user_type' , 'user_status','is_active','created_at',)

class DocumentSerializer ( serializers.ModelSerializer ) :
    class Meta:
        model = FxUserDocument
        fields = "__all__"

class IntroducingBrokerSerializer ( serializers.ModelSerializer ) :
    class Meta:
        model = IntroducingBroker
        fields = "__all__"
