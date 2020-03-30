# Generated by Django 3.0.4 on 2020-03-26 05:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FxAccountTransaction',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('account_type', models.CharField(choices=[('L', 'Live MT4 Account'), ('D', 'Live IB Account'), ('P', 'PAMM-Master'), ('T', 'CopyTrader-Master'), ('Q', 'PAMM-Slave'), ('U', 'CopyTrader-Slave')], default='L', max_length=1)),
                ('mt4_account', models.CharField(default='', max_length=36)),
                ('new_pending_at', models.DateTimeField(blank=True, null=True)),
                ('approved_at', models.DateTimeField(blank=True, null=True)),
                ('rejected_at', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('account_description', models.TextField(blank=True, default='')),
                ('account_name', models.CharField(blank=True, default='', max_length=32)),
                ('account_trader_code', models.CharField(blank=True, default='', max_length=32)),
                ('status', models.CharField(choices=[('P', 'Pending'), ('A', 'Approved'), ('R', 'Rejected')], default='P', max_length=1)),
                ('transaction_type', models.CharField(choices=[('N', 'Normal'), ('I', 'IB'), ('PM', 'PAMM Master'), ('PS', 'PAMM Slave'), ('CM', 'CopyTrader Master'), ('CS', 'CopyTrader Slave')], default='N', max_length=2)),
                ('base_currency', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'USD'), ('2', 'CNY'), ('3', 'BTC'), ('4', 'ETH'), ('5', 'GLC'), ('6', 'WTX')], default='1', max_length=1)),
                ('leverage', models.CharField(choices=[('5', '1:100'), ('6', '1:50'), ('7', '1:25'), ('8', '1:10')], default='5', max_length=1)),
                ('trading_platform', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'MT4')], default='1', max_length=1)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'FxAccount Transaction',
                'verbose_name_plural': 'FxAccount Transactions',
            },
        ),
        migrations.CreateModel(
            name='FxAccount',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('account_type', models.CharField(choices=[('L', 'Live MT4 Account'), ('D', 'Live IB Account'), ('P', 'PAMM-Master'), ('T', 'CopyTrader-Master'), ('Q', 'PAMM-Slave'), ('U', 'CopyTrader-Slave')], default='L', max_length=1)),
                ('mt4_account', models.CharField(default='', max_length=36)),
                ('balance', models.FloatField(blank=True, default=0.0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('account_status', models.CharField(choices=[('P', 'Pending'), ('A', 'Approved'), ('R', 'Rejected'), ('D', 'Declined')], default='P', max_length=1)),
                ('ib_status', models.BooleanField(blank=True, choices=[(True, 'Yes'), (False, 'No')], default=False)),
                ('account_type_status', models.CharField(blank=True, choices=[('M', 'Master'), ('S', 'Slave')], default='N', max_length=1)),
                ('referral_code', models.CharField(blank=True, default='', max_length=6)),
                ('ib_commission', models.FloatField(blank=True, default=0.0)),
                ('base_currency', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'USD'), ('2', 'CNY'), ('3', 'BTC'), ('4', 'ETH'), ('5', 'GLC'), ('6', 'WTX')], default='1', max_length=1)),
                ('leverage', models.CharField(choices=[('5', '1:100'), ('6', '1:50'), ('7', '1:25'), ('8', '1:10')], default='1', max_length=1)),
                ('trading_platform', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'MT4')], default='1', max_length=1)),
                ('account_description', models.TextField(blank=True, default='')),
                ('account_name', models.CharField(blank=True, default='', max_length=32)),
                ('account_trader_code', models.CharField(blank=True, default='', max_length=32)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Trading Account',
                'verbose_name_plural': 'Trading Accounts',
            },
        ),
        migrations.CreateModel(
            name='DepositSaveTransaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_type', models.CharField(choices=[('D', 'Deposit'), ('W', 'Withdraw')], default='D', max_length=1)),
                ('status', models.CharField(blank=True, choices=[('P', 'Pending'), ('A', 'Approved'), ('R', 'Rejected'), ('S', 'Processed')], default='', max_length=20, verbose_name='Status')),
                ('approval_no', models.CharField(blank=True, default='', max_length=40)),
                ('customer_id', models.CharField(blank=True, default='', max_length=20)),
                ('order_id', models.CharField(blank=True, default='', max_length=40)),
                ('transaction_no', models.CharField(blank=True, default='', max_length=40)),
                ('amount', models.FloatField(blank=True, default=0.0, verbose_name='Amount')),
                ('mt4_account', models.CharField(blank=True, default='', max_length=36, verbose_name='BMI Account No')),
                ('payment_method', models.CharField(blank=True, choices=[('', 'Please Choose'), ('1', 'Bank Wire'), ('2', 'i-Account'), ('3', 'Paypal'), ('4', 'EzPay'), ('5', 'i-Pay'), ('6', 'ZotaPay'), ('7', 'ConceptPay'), ('8', 'Bitcoin'), ('9', 'Ethereum'), ('10', 'GELD Coin'), ('11', 'WTX')], default='', max_length=2, verbose_name='Payment Method')),
                ('currency', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'USD'), ('2', 'CNY'), ('3', 'BTC'), ('4', 'ETH'), ('5', 'GLC'), ('6', 'WTX')], default='1', max_length=1, verbose_name='Currency')),
                ('crypto_sender_address', models.CharField(blank=True, default='', max_length=64, null=True)),
                ('bank_name', models.CharField(blank=True, default='', max_length=48)),
                ('cellphone_number', models.CharField(blank=True, default='', max_length=30)),
                ('description', models.TextField(blank=True, default='', verbose_name='Description')),
                ('gateway_status', models.CharField(blank=True, default='', max_length=20, verbose_name='Gateway Status')),
                ('status_remark', models.TextField(blank=True, default='', verbose_name='Status Remark')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('request_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Deposit Transaction',
                'verbose_name_plural': 'Deposit Transactions',
            },
        ),
    ]