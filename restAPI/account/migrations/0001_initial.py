# Generated by Django 3.0.4 on 2020-03-20 06:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AccountTransaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_type', models.CharField(choices=[('N', 'Normal'), ('I', 'IB'), ('PM', 'PAMM Master'), ('PS', 'PAMM Slave'), ('CM', 'CopyTrader Master'), ('CS', 'CopyTrader Slave')], default='N', max_length=2)),
                ('account_type', models.CharField(choices=[('L', 'Live MT4 Account'), ('D', 'Live IB Account'), ('P', 'PAMM-Master'), ('T', 'CopyTrader-Master'), ('Q', 'PAMM-Slave'), ('U', 'CopyTrader-Slave')], default='L', max_length=1)),
                ('status', models.CharField(choices=[('P', 'Pending'), ('A', 'Approved'), ('R', 'Rejected')], default='P', max_length=1)),
                ('mt4_account', models.CharField(default='', max_length=36)),
                ('trading_platform', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'MT4')], default='1', max_length=1)),
                ('base_currency', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'USD'), ('2', 'CNY'), ('3', 'BTC'), ('4', 'ETH'), ('5', 'GLC'), ('6', 'WTX')], default='1', max_length=1)),
                ('leverage', models.CharField(choices=[('5', '1:100'), ('6', '1:50'), ('7', '1:25'), ('8', '1:10')], default='5', max_length=1)),
                ('account_name', models.CharField(blank=True, default='', max_length=32)),
                ('account_description', models.TextField(blank=True, default='')),
                ('account_trader_code', models.CharField(blank=True, default='', max_length=32)),
                ('new_pending_at', models.DateTimeField(blank=True, null=True)),
                ('approved_at', models.DateTimeField(blank=True, null=True)),
                ('rejected_at', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('request_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.User')),
            ],
            options={
                'verbose_name': 'Trading Account Transaction',
                'verbose_name_plural': 'Trading Account Transactions',
            },
        ),
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mt4_account', models.CharField(default='', max_length=36)),
                ('account_type', models.CharField(choices=[('L', 'Live MT4 Account'), ('D', 'Live IB Account'), ('P', 'PAMM-Master'), ('T', 'CopyTrader-Master'), ('Q', 'PAMM-Slave'), ('U', 'CopyTrader-Slave')], default='L', max_length=1)),
                ('trading_platform', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'MT4')], default='1', max_length=1)),
                ('base_currency', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'USD'), ('2', 'CNY'), ('3', 'BTC'), ('4', 'ETH'), ('5', 'GLC'), ('6', 'WTX')], default='1', max_length=1)),
                ('leverage', models.CharField(choices=[('5', '1:100'), ('6', '1:50'), ('7', '1:25'), ('8', '1:10')], default='1', max_length=1)),
                ('account_status', models.CharField(choices=[('P', 'Pending'), ('A', 'Approved'), ('R', 'Rejected'), ('D', 'Declined')], default='P', max_length=1)),
                ('ib_status', models.BooleanField(blank=True, choices=[(True, 'Yes'), (False, 'No')], default=False)),
                ('referral_code', models.CharField(blank=True, default='', max_length=6)),
                ('ib_commission', models.FloatField(blank=True, default=0.0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.User')),
            ],
            options={
                'verbose_name': 'Trading Account',
                'verbose_name_plural': 'Trading Accounts',
            },
        ),
    ]
