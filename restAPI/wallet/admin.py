from django import forms
from django.contrib import admin
from web3 import Web3, HTTPProvider
#from common.utils import TokenUtil
from .models import Wallet, TransactionHistory
from user.models import FxUser
import configparser
import requests

config = configparser.ConfigParser()
config.read('common/config/config.ini')
div = 1000000000000000000

class WalletForm(forms.ModelForm):
    class Meta:
        model = Wallet
        fields = '__all__'


class WalletAdmin(admin.ModelAdmin):
    actions = ['getBalance']
    list_display = ('id', 'address', 'kj_balance' , 'eth_balance' , 'updated_at','created_at')
    readonly_fields = ('id', 'address',)
    
    fieldsets = (
        (None, {
            "fields": (
                'id', 'address', 'kj_balance', 'eth_balance'
            ),
        }),
    )
    
    def get_readonly_fields(self, request, obj=None):
        if obj: # obj is not None, so this is an edit
           return ['id','address'] # Return a list or tuple of readonly fields' names
        else: # This is an addition
            return []

    def getBalance(self, request, queryset):
        if queryset.count() != 1:
            self.message_user(request, 'Let\'s do it slowly one by one')
            return
        wallets = queryset.values_list('id', 'address', 'kj_balance' , 'eth_balance')
        #wallet = Wallet.objects.get(id = wallets.fxuser_id)

        for wallet in wallets:
            URL = 'http://3.0.181.55:3000/kj/fx/getbalance/' + str(wallet[0])
            kj_balance = float(requests.get(URL).json()['balnace'])
            queryset.update(kj_balance= 0 if kj_balance == 0 else kj_balance/div)

            URL = 'http://3.0.181.55:3000/eth/fx/getbalance/' + str(wallet[0])
            eth_balance = float(requests.get(URL).json()['balnace'])
            queryset.update(eth_balance= 0 if eth_balance == 0 else eth_balance/div)
           
    getBalance.short_description = "getBalance"


class TransactionAdmin(admin.ModelAdmin):
    actions = None
    list_display = ('user_email', 'hash', 'confirmations', 'from_address', 'to_address', 'value')
    readonly_fields = ('hash', 'confirmations', 'from_address', 'to_address', 'value')

    def user_email(self, obj):
        try:
            user_object = FxUser.objects.get(kj_address=obj.to_address)
            return user_object
        except FxUser.DoesNotExist:
            return ''

    def get_actions(self, request):
        actions = super().get_actions(request)
        
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    def has_add_permission(self, request):
        return False


admin.site.register(Wallet, WalletAdmin)
admin.site.register(TransactionHistory, TransactionAdmin)