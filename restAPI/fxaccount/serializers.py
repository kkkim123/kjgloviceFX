from rest_framework import serializers
from .models import FxAccount, DepositTransaction, WithdrawTransaction,TradingHistory


class FxAccountSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    # account_type = serializers.CharField(read_only=True)
    # mt4_account = serializers.CharField(read_only=True)
    # balance = serializers.FloatField(read_only=True)

    # created_at = serializers.DateTimeField(read_only=True)
    # updated_at = serializers.DateTimeField(read_only=True)

    # user = serializers.IntegerField(read_only=True)
    # account_status = serializers.CharField(read_only=True)
    # ib_status = serializers.BooleanField(read_only=True)
    # account_type_status = serializers.CharField(read_only=True)
    # referral_code = serializers.CharField(read_only=True)
    # ib_commission = serializers.FloatField(read_only=True)

    
    # base_currency = serializers.CharField(read_only=True)
    # leverage = serializers.CharField(read_only=True)

    # trading_platform = serializers.CharField(read_only=True)
    # account_description = serializers.CharField(read_only=True)
    # account_name = serializers.CharField(read_only=True)
    # account_trader_code = serializers.CharField(read_only=True) 

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

class TradingHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TradingHistory
        fields = "__all__"