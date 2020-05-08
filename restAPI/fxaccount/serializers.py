from rest_framework import serializers
from .models import FxAccount, DepositTransaction, WithdrawTransaction,FxAccountTransaction
#,DailyTradingHistory
class FxAccountSerializer(serializers.ModelSerializer):
    available = serializers.FloatField()

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


# class DailyTradingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DailyTradingHistory
#         fields = "__all__"