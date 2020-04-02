from rest_framework import serializers
from .models import FxAccount, DepositTransaction, WithdrawTransaction


class FxAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = FxAccount
        fields = "__all__"


class DepositSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositTransaction
        fields = "__all__"

class WithdrawSerializer(serializers.ModelSerializer):
    class Meta:
        model = WithdrawTransaction
        fields = "__all__"

# class TradingHistorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TradingHistory
#         fields = "__all__"