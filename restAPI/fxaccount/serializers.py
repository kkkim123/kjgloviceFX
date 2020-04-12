from rest_framework import serializers
from .models import FxAccount, DepositTransaction, WithdrawTransaction,FxAccountTransaction

class FxAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = FxAccount
        fields = "__all__"

class FxAccountTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FxAccountTransaction
        fields = "__all__"

class DepositSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositTransaction
        fields = "__all__"

class WithdrawSerializer(serializers.ModelSerializer):
    class Meta:
        model = WithdrawTransaction
        fields = "__all__"
