from django.db import models
from django.utils.translation import ugettext_lazy as _
from user.models import FxUser
from datetime import datetime, timedelta

# TradingAccountTransaction 전용
ACCOUNT_TRANSACTION_TYPES_CHOICE = (
    ('R', 'Retail'),
    #('I', 'IB'),
    # ('PM', 'PAMM Master'),
    # ('PS', 'PAMM Slave'),
    # ('CM', 'CopyTrader Master'),
    # ('CS', 'CopyTrader Slave')
)

ACCOUNT_TRANSACTION_STATUS = (
    ('P', 'Pending'),
    ('A', 'Approved'),
    ('D', 'Declined'),
    ('S', 'Processed'),
)



# TradingTransaction 전용
ACCOUNT_TYPES = (
    ('0', 'Live MT4 Account'),
    # ('D', 'Live IB Account'),
    # ('P', 'PAMM-Master'),
    # ('T', 'CopyTrader-Master'),
    # ('Q', 'PAMM-Slave'),
    # ('U', 'CopyTrader-Slave')
)


ACCOUNT_STATUS = (
    ('P', 'Pending'),
    ('A', 'Approved'),
    ('D', 'Declined'),
    ('S', 'Processed'),
)

TRADING_PLATFORM_CHOICE = (
    ('0', 'MT4'),
    # ('2', 'PAMM-Master'),
    # ('3', 'CopyTrader-Master'),
    # ('4', 'PAMM-Slave'),
    # ('5', 'CopyTrader-Slave'),
)

ACCOUNT_BASE_CURRENCY_CHOICE = (
    ('0', 'USD'),
    # ('2', 'CNY'),
    # ('3', 'BTC'),
    # ('4', 'ETH'),
    # ('5', 'GLC'),
    # ('6', 'WTX'),
)

LEVERAGE_CHOICES = (
    #('1', '1:500'),
    #('2', '1:400'),
    #('3', '1:300'),
    #('4', '1:200'),
    ('0', '1:100'),
    ('1', '1:50'),
    ('2', '1:25'),
    ('3', '1:10'),
)

ACCOUNT_PAMM_STATUS = (
    ('M', 'Master'),
    ('S', 'Slave'),
)

IB_STATUS_CHOICES = (
    (True, "Yes"),
    (False, "No"),
)



# Deposit & Withdraw
DEPOSIT_WITHDRAW_TRANSACTION_TYPE_CHOICE = (
    ('D', 'Deposit'),
    ('W', 'Withdraw'),
)

DEPOSIT_CRYPTO_CHOICE = (
    ('0', 'KJ'),
)

WITHDRAW_CRYPTO_CHOICE = (
    ('0', 'KJ'),
)

WITHDRAW_METHOD_DICT = dict()
for wc in WITHDRAW_CRYPTO_CHOICE:
    WITHDRAW_METHOD_DICT[wc[0]] = wc[1]


DEPOSIT_WITHDRAW_TRANSACTION_STATUS = (
    ('P', 'Pending'),
    ('A', 'Approved'),
    ('D', 'Declined'),
    ('S', 'Completed'),
)

def send_mt4_details(sender, **kwargs):
    created = kwargs['created']

    if created:
        mt4_account = kwargs['instance'].mt4_account
        user = kwargs['instance'].fxuser.email
        subject = 'MT4 account details.'

        account_type = kwargs['instance'].account_type

        if account_type == 'P':
            subject = 'MT4 PAMM-Master details.'
        elif account_type == 'Q':
            subject = 'MT4 PAMM-Slave details.'
        elif account_type == 'T':
            subject = 'MT4 CopyTrader-Master details.'
        elif account_type == 'U':
            subject = 'MT4 CopyTrader-Slave details.'

        body = """
            Dear User,

            Please use the following information to connect to the MT4 Live Server

            MT4 ID - """ + mt4_account.encode('utf-8') + """
            Password - Bmf9876
            Server - 185.164.160.112:443

            Please change your password once you log on.

            亲爱的用户，
            请使用以下信息连接到MT4 Live Server
            MT4 ID - """ + mt4_account.encode('utf-8') + """
            密码 - Bmf9876
            IP地址：185.164.160.112:443

            登录后请更改密码。

            http://www.bmifutures.com/en/mt4download/
        """
        # if mt4_account:
        #     email = EmailMessage(subject, body, 'noreply@bmifutures.com', to=[user])
        #     email.send()
        # else:
        #     raise Exception("mt4_account blank")
        #     pass

class IBListCommission(models.Model):
    COMPANY_IDX = models.IntegerField()
    LIVE_YN = models.CharField(max_length=1)
    IB_LOGIN = models.IntegerField(primary_key=True)
    TOT_COMMISSION = models.FloatField()
    class Meta:
        verbose_name = "IBListCommission"
        verbose_name_plural = "IBListCommission"


class IBListStructure(models.Model):
    COMPANY_IDX = models.IntegerField()
    LIVE_YN = models.CharField(max_length=1)
    IB_LOGIN = models.IntegerField(primary_key=True)
    TOT_COMMISSION = models.FloatField()
    class Meta:
        verbose_name = "IBListCommission"
        verbose_name_plural = "IBListCommission"

class FxAccountTransaction(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(FxUser,on_delete=models.CASCADE)
    from_account = models.CharField(default='', max_length=36, blank=False)
    to_account = models.CharField(default='', max_length=36, blank=False)

    currency = models.CharField( default='1', max_length=1, blank=True, choices=ACCOUNT_BASE_CURRENCY_CHOICE)
    amount = models.FloatField( default=0.0, blank=True, null=True)

    status = models.CharField(default='P', max_length=1, blank=False, choices=ACCOUNT_TRANSACTION_STATUS)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)


    class Meta:
        verbose_name = "FxAccount Transaction"
        verbose_name_plural = "FxAccount Transactions"

# class DailyTradingHistory(models.Model):
#     id = models.AutoField(primary_key=True)
#     mt4_account = models.CharField(default='', max_length=36, blank=False,null=True)
#     user = models.ForeignKey(FxUser,on_delete=models.CASCADE)
#     date = models.DateTimeField(auto_now_add=True, auto_now=False)
#     profit = models.FloatField(default=0.0, blank=True)

#     class Meta:
#         verbose_name = "DailyTradingHistory"
#         verbose_name_plural = "DailyTradingHistory"


class FxAccount(models.Model):
    id = models.AutoField(primary_key=True)

    account_type = models.CharField(default='0', max_length=1, blank=False, choices=ACCOUNT_TYPES)
    mt4_account = models.CharField(default='', max_length=36, blank=False,null=True)
    balance = models.FloatField(default=0.0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)

    user = models.ForeignKey(FxUser,on_delete=models.CASCADE)
    status = models.CharField(default='P', max_length=1, blank=False, choices=ACCOUNT_STATUS)
    ib_status = models.BooleanField(default=False, blank=True, choices=IB_STATUS_CHOICES)
    referral_code = models.CharField(default='2002', max_length=6, blank=True)
    ib_commission = models.FloatField(default=0.0, blank=True)
  
    base_currency = models.CharField(default='1', max_length=1, blank=True, choices=ACCOUNT_BASE_CURRENCY_CHOICE)
    leverage = models.CharField(default='1', max_length=1, blank=False, choices=LEVERAGE_CHOICES)

    trading_platform = models.CharField(default='1', max_length=1, blank=True, choices=TRADING_PLATFORM_CHOICE)
    account_description = models.TextField(default='', blank=True)
    account_name = models.CharField(default='', max_length=32, blank=True)

    class Meta:
        verbose_name = "Trading Account"
        verbose_name_plural = "Trading Accounts"


class BaseTransaction(models.Model):
    class Meta:
        abstract = True

    def history_id(self):
        return "{}{}".format(self.transaction_type, self.id)

class DepositTransaction(BaseTransaction):
    user = models.ForeignKey(FxUser,on_delete=models.CASCADE)

    mt4_account = models.CharField( default='', max_length=36, blank=True)
    currency = models.CharField( default='1', max_length=1, blank=True, choices=ACCOUNT_BASE_CURRENCY_CHOICE)
    #전환된 법정화폐 수량 
    amount = models.FloatField( default=0.0, blank=True, null=True)

    deposit_crypto = models.CharField( default='', max_length=2, blank=True, choices=DEPOSIT_CRYPTO_CHOICE)
    crypto_address = models.CharField(default='', max_length=64, blank=True)
    crypto_amount = models.CharField(default='', max_length=64, blank=True)
    cellphone_number = models.CharField(default='', max_length=30, blank=True, null=True)  

    status = models.CharField( default='P', max_length=20, blank=True, choices=DEPOSIT_WITHDRAW_TRANSACTION_STATUS)

    created_at = models.DateTimeField( auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)
    #REQUIRED_FIELDS = ['user','mt4_account','currency','crypto_sender_address','crypto_amount','']

    class Meta:
        verbose_name = "Request Deposit"
        verbose_name_plural = "Request Deposit"

class WithdrawTransaction(BaseTransaction):
    user = models.ForeignKey(FxUser,on_delete=models.CASCADE)

    mt4_account = models.CharField( default='', max_length=36, blank=True)
    currency = models.CharField( default='1', max_length=1, blank=True, choices=ACCOUNT_BASE_CURRENCY_CHOICE)
    amount = models.FloatField( default=0.0, blank=True)

    exchange_rate = models.FloatField( default=0.0, blank=True, null=True)

    withdraw_crypto = models.CharField(default='', max_length=2, blank=True, choices=WITHDRAW_CRYPTO_CHOICE)
    crypto_address = models.CharField(default='', max_length=64, blank=True)
    #출금된 암호화폐 수량
    crypto_amount = models.CharField(default='', max_length=64, blank=True, null=True)
    cellphone_number = models.CharField(default='', max_length=30, blank=True)  

    status = models.CharField(default='P', max_length=1, blank=False, choices=DEPOSIT_WITHDRAW_TRANSACTION_STATUS)

    created_at = models.DateTimeField( auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)

    class Meta:
        verbose_name = "Request Withdraw"
        verbose_name_plural = "Request Withdraw"
