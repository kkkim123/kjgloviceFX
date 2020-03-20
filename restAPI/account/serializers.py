from rest_framework import serializers
from .models import Account


class AccountSerializer(serializers.Serializer):

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
        return Account.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.first_name = validated_data.get('first_name', instance.first_name)
    #     instance.last_name = validated_data.get('last_name', instance.last_name)
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.password = validated_data.get('password', instance.password)
    #     #instance.user_type = validated_data.get('user_type', instance.user_type)
    #     instance.save()
    #     return instance