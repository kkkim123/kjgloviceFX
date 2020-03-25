from django.db import models
from user.models import FxUser

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


class AccountTransaction(models.Model):
    transaction_type = models.CharField(default='N', max_length=2, blank=False, choices=ACCOUNT_TRANSACTION_TYPES_CHOICE)
    account_type = models.CharField(default='L', max_length=1, blank=False, choices=ACCOUNT_TYPES)
    status = models.CharField(default='P', max_length=1, blank=False, choices=ACCOUNT_TRANSACTION_STATUS)
    request_user = models.ForeignKey(FxUser,on_delete=models.CASCADE)
    mt4_account = models.CharField(default='', max_length=36, blank=False)
    trading_platform = models.CharField(default='1', max_length=1, blank=True, choices=TRADING_PLATFORM_CHOICE)
    base_currency = models.CharField(default='1', max_length=1, blank=True, choices=ACCOUNT_BASE_CURRENCY_CHOICE)
    leverage = models.CharField(default='5', max_length=1, blank=False, choices=LEVERAGE_CHOICES)
    # pamm_name = models.CharField(default='', max_length=32, blank=True)
    account_name = models.CharField(default='', max_length=32, blank=True)
    # pamm_description = models.TextField(default='', blank=True)
    account_description = models.TextField(default='', blank=True)
    # pamm_trader_code = models.CharField(default='', max_length=32, blank=True)  # investor 로 신청할 경우 trader 의 pamm code 가 들어감
    account_trader_code = models.CharField(default='', max_length=32, blank=True)  # investor 로 신청할 경우 trader 의 pamm code 가 들어감
    new_pending_at = models.DateTimeField(blank=True, null=True)
    approved_at = models.DateTimeField(blank=True, null=True)
    rejected_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)

    class Meta:
        verbose_name = "Trading Account Transaction"
        verbose_name_plural = "Trading Account Transactions"


class Account(models.Model):

    mt4_account = models.CharField(default='', max_length=36, blank=False)
    account_type = models.CharField(default='L', max_length=1, blank=False, choices=ACCOUNT_TYPES)
    trading_platform = models.CharField(default='1', max_length=1, blank=True, choices=TRADING_PLATFORM_CHOICE)
    base_currency = models.CharField(default='1', max_length=1, blank=True, choices=ACCOUNT_BASE_CURRENCY_CHOICE)
    leverage = models.CharField(default='1', max_length=1, blank=False, choices=LEVERAGE_CHOICES)
    account_status = models.CharField(default='P', max_length=1, blank=False, choices=ACCOUNT_STATUS)

    #email
    user = models.ForeignKey(User,on_delete=models.CASCADE)

    ib_status = models.BooleanField(default=False, blank=True, choices=IB_STATUS_CHOICES)

    referral_code = models.CharField(default='', max_length=6, blank=True)
    ib_commission = models.FloatField(default=0.0, blank=True)
    # pamm_status = models.CharField(default='N', max_length=1, blank=True, choices=ACCOUNT_PAMM_STATUS)
    #account_type_status = models.CharField(default='N', max_length=1, blank=True, choices=ACCOUNT_PAMM_STATUS)

    # pamm_name = models.CharField(default='', max_length=32, blank=True)
    #account_name = models.CharField(default='', max_length=32, blank=True)

    # pamm_description = models.TextField(default='', blank=True)
    #account_description = models.TextField(default='', blank=True)

    # pamm_trader_code = models.CharField(default='', max_length=32, blank=True)  # investor 로 신청할 경우 trader 의 pamm code 가 들어감
    #account_trader_code = models.CharField(default='', max_length=32, blank=True)  # investor 로 신청할 경우 trader 의 pamm code 가 들어감

    #balance = models.FloatField(default=0.0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)

    #def was_published_recently(self):
    #    return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

    #was_published_recently.admin_order_field = 'pub_date'
    #was_published_recently.boolean = True
    #was_published_recently.short_description = 'Published recently?'

    class Meta:
        verbose_name = "Trading Account"
        verbose_name_plural = "Trading Accounts"


class BaseTransaction(models.Model):
    class Meta:
        abstract = True

    def history_id(self):
        return "{}{}".format(self.transaction_type, self.id)
