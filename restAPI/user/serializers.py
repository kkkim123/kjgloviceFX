from rest_framework import serializers
from .models import FxUser, FxUserDocument

class UserSerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model = FxUser
        fields = '__all__'


class DocumentSerializer ( serializers.ModelSerializer ) :
    class Meta:
        model = FxUserDocument
        fields = "__all__"

# class DocumentFileSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = FxUserDocument
#         read_only_fields = ("fxuser",)
