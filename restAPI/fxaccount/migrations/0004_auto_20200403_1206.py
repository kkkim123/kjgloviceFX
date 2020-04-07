# Generated by Django 3.0.4 on 2020-04-03 03:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fxaccount', '0003_auto_20200402_1733'),
    ]

    operations = [
        migrations.RenameField(
            model_name='fxaccounttransaction',
            old_name='mt4_account',
            new_name='from_account',
        ),
        migrations.RemoveField(
            model_name='deposittransaction',
            name='transaction_type',
        ),
        migrations.RemoveField(
            model_name='fxaccounttransaction',
            name='account_description',
        ),
        migrations.RemoveField(
            model_name='fxaccounttransaction',
            name='account_name',
        ),
        migrations.RemoveField(
            model_name='fxaccounttransaction',
            name='account_trader_code',
        ),
        migrations.RemoveField(
            model_name='fxaccounttransaction',
            name='account_type',
        ),
        migrations.RemoveField(
            model_name='fxaccounttransaction',
            name='base_currency',
        ),
        migrations.RemoveField(
            model_name='fxaccounttransaction',
            name='leverage',
        ),
        migrations.RemoveField(
            model_name='fxaccounttransaction',
            name='trading_platform',
        ),
        migrations.RemoveField(
            model_name='withdrawtransaction',
            name='transaction_type',
        ),
        migrations.AddField(
            model_name='fxaccounttransaction',
            name='to_account',
            field=models.CharField(default='', max_length=36),
        ),
        migrations.AlterField(
            model_name='deposittransaction',
            name='currency',
            field=models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'USD')], default='1', max_length=1),
        ),
        migrations.AlterField(
            model_name='fxaccount',
            name='base_currency',
            field=models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'USD')], default='1', max_length=1),
        ),
        migrations.AlterField(
            model_name='fxaccounttransaction',
            name='transaction_type',
            field=models.CharField(choices=[('N', 'Normal'), ('I', 'IB')], default='N', max_length=2),
        ),
        migrations.AlterField(
            model_name='withdrawtransaction',
            name='currency',
            field=models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'USD')], default='1', max_length=1),
        ),
    ]