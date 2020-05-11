from django import forms
from django.contrib import admin
from django.db import connections
from django.http import HttpResponse,HttpResponseRedirect
from django.urls import path
from django.template.response import TemplateResponse

from .models import FxAccount, DepositTransaction ,WithdrawTransaction ,IBListCommission,FxAccountTransaction
from user.models import FxUser, IntroducingBroker
from wallet.models import Wallet
import configparser
import requests

config = configparser.ConfigParser()
config.read('common/config/config.ini')
div = 1000000000000000000
class FxAccountForm(forms.ModelForm):
    class Meta:
        model = FxAccount
        fields = '__all__'

        labels = {
            'user': 'Email',
        }

    
class FxAccountAdmin(admin.ModelAdmin):
    form = FxAccountForm
    list_display = (
        'user', 'mt4_account', 'referral_code','ib_commission','status','updated_at',
    )
    # search_fields = ('mt4_account', 'fxuser')
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    list_per_page = 10
    list_editable = ('status',)
    search_fields = ('user','mt4_account','referral_code',)
    readonly_fields = ('ib_commission', 'balance')

    fieldsets = (
        (None, {
            "fields": (
                'mt4_account', 'account_type', 'user', 'status', 'ib_status', 'ib_commission', 'base_currency',
                'leverage',  'trading_platform', 'account_name'
            ),
        }),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj: # obj is not None, so this is an edit
           return ['ib_commission', 'balance'] # Return a list or tuple of readonly fields' names
        else: # This is an addition
            return []
    
    def save_model(self, request, obj, form, change):
        fxuser = FxUser.objects.get(id = obj.user_id)
        obj.referral_code = fxuser.referral_code
        #print(obj.referral_code)
        if(len(obj.mt4_account) > 4 and obj.status == 'A' and obj.pre_status == 'P'): 

            if(int(fxuser.user_status) < 8):   
                fxuser.user_status = '8'     
                fxuser.save()    
            # IN i_company_id int, 
			# IN i_account int ,
			# IN i_seq int,
			# IN i_ib_login int,
			# IN i_ib_point int ,
			# IN i_live_yn char(1) )

            #IB_COMMISSION_STRUTURE SP_IB_COMMISSION_STRUCTURE_SAVE
            #i_seq 70001082 2080 1      70001082 2016 2      70001082 2200 3

            ib = IntroducingBroker.objects.get(ib_code = obj.referral_code)
            related_ibs = ib.get_ancestors(ascending=True, include_self=True)

            cursor =  connections['backOffice'].cursor()

            index = 1
            for ib in related_ibs:
                #print(ib)
                cursor.nextset()
                cursor.callproc("SP_IB_COMMISSION_STRUCTURE_SAVE", ('1',obj.mt4_account,index,ib.ib_code,1,'Y'))
                index += 1

            results = list(cursor.fetchall())
            print(results)
        obj.pre_status = obj.status
        super().save_model(request, obj, form, change)    


admin.site.register(FxAccount, FxAccountAdmin)

class FxAccountTransactionAdmin(admin.ModelAdmin):
    list_display = (
      'id', 'user', 'from_account', 'to_account','currency','amount','status','created_at','updated_at',
    )

    list_filter = ('status',)

    list_per_page = 10
    list_editable = ('status',)
    search_fields = ('user','from_account','to_account',)
    readonly_fields = ('from_account', 'to_account',)

    fieldsets = (
        (None, {
            "fields": (
                'user', 'from_account', 'to_account','currency','amount','status'
            ),
        }),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj: # obj is not None, so this is an edit
           return ['from_account', 'to_account'] # Return a list or tuple of readonly fields' names
        else: # This is an addition
            return []
    


admin.site.register(FxAccountTransaction,FxAccountTransactionAdmin)


class DepositTransForm(forms.ModelForm):
    class Meta:
        model = DepositTransaction
        fields = '__all__'

        labels = {
            'user': 'Email',
        }


class DepositTransAdmin(admin.ModelAdmin):
    form = DepositTransForm
    list_display = (
        'get_email','mt4_account', 'currency','amount','crypto_address','deposit_crypto','crypto_amount','cellphone_number','status',
        'created_at','updated_at',
    )
    # search_fields = ('mt4_account', 'fxuser')'user',
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    list_per_page = 10
    list_editable = ('status',)
    search_fields = ('user','mt4_account','cellphone_number',)
    readonly_fields = ('user','mt4_account', 'currency','amount','crypto_address','deposit_crypto','crypto_amount','cellphone_number',)

    fieldsets = (
        (None, {
            "fields": (
                'user', 'mt4_account', 'currency', 'amount', 'crypto_address', 'deposit_crypto', 'crypto_amount', 'cellphone_number',
                'status'
            ),
        }),
    )
    
    def get_readonly_fields(self, request, obj=None):
        if obj: # obj is not None, so this is an edit
           return ['user','mt4_account', 'currency','amount','crypto_address','deposit_crypto','crypto_amount','cellphone_number'] # Return a list or tuple of readonly fields' names
        else: # This is an addition
            return []

    def get_email(self, obj):
        return obj.user.email

    def save_model(self, request, obj, form, change):
        print(obj.user_id)
        if(obj.status == 'A' and obj.pre_status == 'P'):
            wallet = Wallet.objects.get(id = obj.user_id)
            ETH_BALANCE_URL = 'http://3.0.181.55:3000/eth/fx/getbalance/' + str(obj.user_id)
            eth_balance = float(requests.get(ETH_BALANCE_URL).json()['balnace'])
            eth_balance = 0 if eth_balance == 0 else eth_balance/div
            if(eth_balance < 0.002):
                ETH_SEND_URL = 'http://3.0.181.55:3000/eth/fx/send'
                try:
                    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
                    print(obj.user_id)
                    data = {'index': 0, 'from': config["ACCOUNT"]["KJ_ADDRESS"],'to': obj.crypto_address, 
                            'value': 0.002,'gasLimit': config["TOKEN"]["GASLIMIT"], 'gasPrice': config["TOKEN"]["GAS"]}
                    res = requests.post(ETH_SEND_URL, headers=headers, data=data)
                    print(res)
                    if res.status_code == 400:
                        print("Failed. Bad post data.")
                except :
                    print("Failed.FailedFailedFailedFailed")

            wallet.eth_balance = eth_balance
            wallet.save()  


            KJ_BALANCE_URL = 'http://3.0.181.55:3000/kj/fx/getbalance/' + str(obj.user_id)
            kj_balance = float(requests.get(KJ_BALANCE_URL).json()['balnace'])
            kj_balance = 0 if kj_balance == 0 else kj_balance/div
            #print(kj_balance)
            #print(float(obj.crypto_amount))
            if(kj_balance >= float(obj.crypto_amount)):
                KJ_SEND_URL = 'http://3.0.181.55:3000/kj/fx/send'
                try:
                    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
                    #print(float(obj.crypto_amount) * div)
                    data = {'index': obj.user_id, 'from': obj.crypto_address,'to': config["ACCOUNT"]["KJ_ADDRESS"], 
                            'value': int(float(obj.crypto_amount) * div) ,'gasLimit': config["TOKEN"]["GASLIMIT"], 'gasPrice': config["TOKEN"]["GAS"]}
                    res = requests.post(KJ_SEND_URL, headers=headers, data=data)

                    if res.status_code == 200:
                        print("OK")
                    else : 
                        print("400")
                except :
                     print("requests failed.")
                print('getbalance start')

                kj_balance = float(requests.get(KJ_BALANCE_URL).json()['balnace'])
                wallet.kj_balance = 0 if kj_balance == 0 else kj_balance/div
                wallet.save()

        obj.pre_status = obj.status    
        super().save_model(request, obj, form, change)  
    
    get_email.short_description = "Email"

admin.site.register(DepositTransaction,DepositTransAdmin)


class WithdrawTransForm(forms.ModelForm):
    class Meta:
        model = WithdrawTransaction
        fields = '__all__'

        labels = {
            'user': 'Email',
        }


class WithdrawTransAdmin(admin.ModelAdmin):
    form = WithdrawTransForm
    list_display = (
        'user','mt4_account', 'currency','amount', 'crypto_address','withdraw_crypto','crypto_amount',
        'created_at','updated_at','status',
    )
    # search_fields = ('mt4_account', 'fxuser')'user',
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    list_per_page = 10
    list_editable = ('status',)
    search_fields = ('status',)
    #readonly_fields = ('mt4_account', 'currency','amount', 'crypto_address','withdraw_crypto','crypto_amount',)


    fieldsets = (
        (None, {
            "fields": (
                'user','mt4_account', 'currency','amount', 'crypto_address','withdraw_crypto','crypto_amount', 'status'
            ),
        }),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj: # obj is not None, so this is an edit
           return ['user','mt4_account', 'currency','amount', 'crypto_address','withdraw_crypto','crypto_amount'] # Return a list or tuple of readonly fields' names
        else: # This is an addition
            return []
    
    def save_model(self, request, obj, form, change):

        if(obj.status == 'A' and obj.pre_status == 'P'):

            wallet = Wallet.objects.get(id = obj.user_id)
            
            #master get balance
            KJ_BALANCE_URL = 'http://3.0.181.55:3000/kj/fx/getbalance/' + str(0)
            kj_balance = float(requests.get(KJ_BALANCE_URL).json()['balnace'])
            kj_balance = 0 if kj_balance == 0 else kj_balance/div

            #USD withdraw > kj withdraw 
            if(kj_balance > float(obj.crypto_amount)):
                KJ_SEND_URL = 'http://3.0.181.55:3000/kj/fx/send'
                try:
                    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
                    data = {'index': 0, 'from': config["ACCOUNT"]["KJ_ADDRESS"],'to': wallet.address, 
                            'value': int(float(obj.crypto_amount) * div),'gasLimit': config["TOKEN"]["GASLIMIT"], 'gasPrice': config["TOKEN"]["GAS"]}
                    res = requests.post(KJ_SEND_URL, headers=headers, data=data)

                    if res.status_code == 200:
                        print("OK")
                    else : 
                        print("400")
                except :
                    print("Failed.FailedFailedFailedFailed")

                KJ_BALANCE_URL = 'http://3.0.181.55:3000/kj/fx/getbalance/' + str(obj.user_id)
                kj_balance = float(requests.get(KJ_BALANCE_URL).json()['balnace'])
                wallet.kj_balance = 0 if kj_balance == 0 else kj_balance/div 
                wallet.save() 

        obj.pre_status = obj.status  
        super().save_model(request, obj, form, change)  

admin.site.register(WithdrawTransaction,WithdrawTransAdmin)
