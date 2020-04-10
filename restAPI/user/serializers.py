from rest_framework import serializers
from .models import FxUser, FxUserDocument,IntroducingBroker ,EMPLOYMENT_STATUS_CHOICES


class UserSerializer(serializers.ModelSerializer):
    #user=serializers.StringRelatedField(read_only=True)
    employment_status = serializers.ChoiceField(choices=EMPLOYMENT_STATUS_CHOICES, default='1')
    class Meta:
        model = FxUser
        fields = '__all__'


class DocumentSerializer ( serializers.ModelSerializer ) :
    class Meta:
        model = FxUserDocument
        fields = "__all__"


class IntroducingBrokerSerializer ( serializers.ModelSerializer ) :
    class Meta:
        model = IntroducingBroker
        fields = "__all__"

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = FxUser
        fields = ('resident_country' , 'first_name','last_name',
        'user_type' , 'user_status','is_active','created_at',)