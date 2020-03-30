from django.db import models
from django.utils.translation import ugettext_lazy as _
from user.models import FxUser
from datetime import datetime, timedelta
# from pytz import timezone

# from django.db.models.signals import post_save
# from django.core.mail import EmailMessage
#from treebeard.mp_tree import MP_Node

# class Category(MP_Node):
#     name = models.CharField(max_length=30)

#     node_order_by = ['name']

#     # def __str__(self):
#     #     return 'Category: %s' % self.name



# class PLAYER(models.Model):
#     PLAYER_ID = models.CharField(max_length = 7)
#     PLAYER_NAME = models.CharField(max_length = 7)
#     TEAM_ID = models.CharField(max_length = 7)
#
# TradingAccountTransaction 전용
#
ACCOUNT_TRANSACTION_TYPES_CHOICE = (
    ('N', 'Normal'),
    ('I', 'IB'),
    ('PM', 'PAMM Master'),
    ('PS', 'PAMM Slave'),
    ('CM', 'CopyTrader Master'),
    ('CS', 'CopyTrader Slave')
)

ACCOUNT_TRANSACTION_STATUS = (
    ('P', 'Pending'),
    ('A', 'Approved'),
    ('R', 'Rejected'),
)


#
# TradingTransaction 전용
#

ACCOUNT_TYPES = (
    ('L', 'Live MT4 Account'),
    ('D', 'Live IB Account'),
    ('P', 'PAMM-Master'),
    ('T', 'CopyTrader-Master'),
    ('Q', 'PAMM-Slave'),
    ('U', 'CopyTrader-Slave')
)


ACCOUNT_STATUS = (
    ('P', 'Pending'),
    ('A', 'Approved'),
    ('R', 'Rejected'),
    ('D', 'Declined'),
)

TRADING_PLATFORM_CHOICE = (
    ('', 'Please Choose...'),
    ('1', 'MT4'),
    # ('2', 'PAMM-Master'),
    # ('3', 'CopyTrader-Master'),
    # ('4', 'PAMM-Slave'),
    # ('5', 'CopyTrader-Slave'),
)

ACCOUNT_BASE_CURRENCY_CHOICE = (
    ('', 'Please Choose...'),
    ('1', 'USD'),
    ('2', 'CNY'),
    ('3', 'BTC'),
    ('4', 'ETH'),
    ('5', 'GLC'),
    ('6', 'WTX'),
)

LEVERAGE_CHOICES = (
    #('1', '1:500'),
    #('2', '1:400'),
    #('3', '1:300'),
    #('4', '1:200'),
    ('5', '1:100'),
    ('6', '1:50'),
    ('7', '1:25'),
    ('8', '1:10'),
)

ACCOUNT_PAMM_STATUS = (
    ('M', 'Master'),
    ('S', 'Slave'),
)

IB_STATUS_CHOICES = (
    (True, "Yes"),
    (False, "No"),
)


#
# Deposit & Withdraw
#
DEPOSIT_WITHDRAW_TRANSACTION_TYPE_CHOICE = (
    ('D', 'Deposit'),
    ('W', 'Withdraw'),
)

DEPOSIT_METHOD_CHOICE = (
    ('', 'Please Choose'),
    ('1', 'Bank Wire'),
    ('2', 'i-Account'),
    ('3', 'Paypal'),
    ('4', 'EzPay'),
    ('5', 'i-Pay'),
    ('6', 'ZotaPay'),
    ('7', 'ConceptPay'),
    ('8', 'Bitcoin'),
    ('9', 'Ethereum'),
    ('10', 'GELD Coin'),
    ('11', 'WTX'),
)

WITHDRAW_METHOD_CHOICE = (
    ('', 'Please Choose'),
    ('1', 'Bank Wire'),
    ('2', 'i-Account'),
    ('3', 'Paypal'),
    ('8', 'Bitcoin'),
    ('9', 'Ethereum'),
    ('10', 'GELD Coin'),
    ('11', 'WTX'),
)

WITHDRAW_METHOD_DICT = dict()
for wc in WITHDRAW_METHOD_CHOICE:
    WITHDRAW_METHOD_DICT[wc[0]] = wc[1]


DEPOSIT_WITHDRAW_TRANSACTION_STATUS = (
    ('P', 'Pending'),
    ('A', 'Approved'),
    ('R', 'Rejected'),
    ('S', 'Processed'),
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

class MyModel(models.Model):
    COMPANY_IDX = models.IntegerField()



class FxAccountTransaction(models.Model):
    id = models.AutoField(primary_key=True)
    account_type = models.CharField(default='L', max_length=1, blank=False, choices=ACCOUNT_TYPES)
    mt4_account = models.CharField(default='', max_length=36, blank=False)

    new_pending_at = models.DateTimeField(blank=True, null=True)
    approved_at = models.DateTimeField(blank=True, null=True)
    rejected_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)

    user = models.ForeignKey(FxUser,on_delete=models.CASCADE)

    account_description = models.TextField(default='', blank=True)
    account_name = models.CharField(default='', max_length=32, blank=True)
    account_trader_code = models.CharField(default='', max_length=32, blank=True)

    status = models.CharField(default='P', max_length=1, blank=False, choices=ACCOUNT_TRANSACTION_STATUS)
    transaction_type = models.CharField(default='N', max_length=2, blank=False, choices=ACCOUNT_TRANSACTION_TYPES_CHOICE)

    base_currency = models.CharField(default='1', max_length=1, blank=True, choices=ACCOUNT_BASE_CURRENCY_CHOICE)
    leverage = models.CharField(default='5', max_length=1, blank=False, choices=LEVERAGE_CHOICES)
    trading_platform = models.CharField(default='1', max_length=1, blank=True, choices=TRADING_PLATFORM_CHOICE)



    # pamm_name = models.CharField(default='', max_length=32, blank=True)  
    # pamm_description = models.TextField(default='', blank=True)   
    # pamm_trader_code = models.CharField(default='', max_length=32, blank=True)  # investor 로 신청할 경우 trader 의 pamm code 가 들어감
      # investor 로 신청할 경우 trader 의 pamm code 가 들어감
    

    class Meta:
        verbose_name = "FxAccount Transaction"
        verbose_name_plural = "FxAccount Transactions"


class FxAccount(models.Model):
    id = models.AutoField(primary_key=True)

    account_type = models.CharField(default='L', max_length=1, blank=False, choices=ACCOUNT_TYPES)
    mt4_account = models.CharField(default='', max_length=36, blank=False)
    balance = models.FloatField(default=0.0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)

    user = models.ForeignKey(FxUser,on_delete=models.CASCADE)
    account_status = models.CharField(default='P', max_length=1, blank=False, choices=ACCOUNT_STATUS)
    ib_status = models.BooleanField(default=False, blank=True, choices=IB_STATUS_CHOICES)
    account_type_status = models.CharField(default='N', max_length=1, blank=True, choices=ACCOUNT_PAMM_STATUS)
    referral_code = models.CharField(default='', max_length=6, blank=True)
    ib_commission = models.FloatField(default=0.0, blank=True)

    
    base_currency = models.CharField(default='1', max_length=1, blank=True, choices=ACCOUNT_BASE_CURRENCY_CHOICE)
    leverage = models.CharField(default='1', max_length=1, blank=False, choices=LEVERAGE_CHOICES)

    trading_platform = models.CharField(default='1', max_length=1, blank=True, choices=TRADING_PLATFORM_CHOICE)
    account_description = models.TextField(default='', blank=True)
    account_name = models.CharField(default='', max_length=32, blank=True)
    account_trader_code = models.CharField(default='', max_length=32, blank=True)  # investor 로 신청할 경우 trader 의 pamm code 가 들어감


    class Meta:
        verbose_name = "Trading Account"
        verbose_name_plural = "Trading Accounts"


class BaseTransaction(models.Model):
    class Meta:
        abstract = True

    def history_id(self):
        return "{}{}".format(self.transaction_type, self.id)



class DepositTransaction(BaseTransaction):
    transaction_type = models.CharField(default='D', max_length=1, choices=DEPOSIT_WITHDRAW_TRANSACTION_TYPE_CHOICE)
    request_user = models.ForeignKey(FxUser,on_delete=models.CASCADE)
    status = models.CharField( default='P', max_length=20, blank=True, choices=DEPOSIT_WITHDRAW_TRANSACTION_STATUS)
    approval_no = models.CharField(default='', max_length=40, blank=True)
    customer_id = models.CharField(default='', max_length=20, blank=True)
    order_id = models.CharField(default='', max_length=40, blank=True)
    transaction_no = models.CharField(default='', max_length=40, blank=True)
    amount = models.FloatField( default=0.0, blank=True)
    mt4_account = models.CharField( default='', max_length=36, blank=True)
    payment_method = models.CharField( default='', max_length=2, blank=True, choices=DEPOSIT_METHOD_CHOICE)
    currency = models.CharField( default='1', max_length=1, blank=True, choices=ACCOUNT_BASE_CURRENCY_CHOICE)
    crypto_sender_address = models.CharField(default='', max_length=64, blank=True, null=True)
    bank_name = models.CharField(default='', max_length=48, blank=True)  # for wire transfer
    cellphone_number = models.CharField(default='', max_length=30, blank=True)  # for wire transfer
    description = models.TextField( default='', blank=True)
    gateway_status = models.CharField(default='', max_length=20, blank=True)
    status_remark = models.TextField( default='', blank=True)
    created_at = models.DateTimeField( auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)

    class Meta:
        verbose_name = "Deposit Transaction"
        verbose_name_plural = "Deposit Transactions"


class WithdrawTransaction(BaseTransaction):
    transaction_type = models.CharField(default='W', max_length=1, choices=DEPOSIT_WITHDRAW_TRANSACTION_TYPE_CHOICE)
    request_user = models.ForeignKey(FxUser,on_delete=models.CASCADE)
    status = models.CharField(default='P', max_length=1, blank=False, choices=DEPOSIT_WITHDRAW_TRANSACTION_STATUS)
    payment_method = models.CharField(default='', max_length=2, blank=True, choices=WITHDRAW_METHOD_CHOICE)
    amount = models.FloatField( default=0.0, blank=True)
    mt4_account = models.CharField( default='', max_length=36, blank=True)
    bank_name = models.CharField(default='', max_length=48, blank=True)
    bank_account = models.CharField(default='', max_length=48, blank=True)
    bank_address = models.CharField(default='', max_length=128, blank=True)
    bank_swift = models.CharField(default='', max_length=16, blank=True)
    bank_iban = models.CharField(default='', max_length=48, blank=True)
    bank_branch_name = models.CharField(default='', max_length=48, blank=True)
    bank_branch_code = models.CharField(default='', max_length=48, blank=True)
    intermediary_bank_name = models.CharField(default='', max_length=48, blank=True)
    intermediary_bank_swift = models.CharField(default='', max_length=16, blank=True)
    currency = models.CharField( default='1', max_length=1, blank=True, choices=ACCOUNT_BASE_CURRENCY_CHOICE)
    beneficiary_full_name = models.CharField(default='', max_length=48, blank=True)
    beneficiary_address = models.CharField(default='', max_length=128, blank=True)
    description = models.TextField(default='', blank=True)
    paypal_email = models.EmailField(default='', blank=True)
    crypto_receiver_address = models.CharField(default='', max_length=64, blank=True, null=True)
    i_account_no = models.CharField(default='', max_length=48, blank=True, null=True)
    status_remark = models.TextField( default='', blank=True)
    created_at = models.DateTimeField( auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)

    class Meta:
        verbose_name = "Withdraw Request"
        verbose_name_plural = "Withdraw Requests"



#class CallSP(models.Model):




#class GetIBCOMMISSIONLIST(models.Model):