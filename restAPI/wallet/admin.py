from django.contrib import admin
from web3 import Web3, HTTPProvider
#from common.utils import TokenUtil
from .models import Wallet, TransactionHistory
import configparser
import requests
config = configparser.ConfigParser()
config.read('common/config/config.ini')
# class WalletAdmin( admin.ModelAdmin):
#     actions = ['getBalance']
#     list_display = ('id', 'address', 'balance' , 'updated_at','created_at')


#     def getBalance(self, request, queryset):
#         if queryset.count() != 1:
#             self.message_user(request, 'Let\'s do it slowly one by one')
#             return
#         web3 = Web3(HTTPProvider(config["INFURA"]["URI"]))
#         Wallets = queryset.values_list('address')
#         #checksum_address = web3.toChecksumAddress(config['ACCOUNT']['ETH_ADDRESS'])
#         checksum_address = web3.toChecksumAddress(Wallets[0][0])
#         select_balance= web3.eth.getBalance(checksum_address)
#         queryset.update(balance = web3.fromWei(select_balance, 'ether'))


        
#     getBalance.short_description = "getBalance"


class WalletAdmin( admin.ModelAdmin):
    actions = ['getBalance']
    list_display = ('id', 'address', 'kj_balance' , 'eth_balance' , 'updated_at','created_at')


    def getBalance(self, request, queryset):
        if queryset.count() != 1:
            self.message_user(request, 'Let\'s do it slowly one by one')
            return
        wallets = queryset.values_list('id', 'address', 'kj_balance' , 'eth_balance')
        #wallet = Wallet.objects.get(id = wallets.fxuser_id)

        for wallet in wallets:
            print(wallet[0])
            URL = 'http://3.0.181.55:3000/kj/fx/getbalance/' + str(wallet[0])
            response = requests.get(URL)
            jsresponse = response.json()
            print(jsresponse['balnace'])
            queryset.update(kj_balance=jsresponse['balnace'])
            URL = 'http://3.0.181.55:3000/eth/fx/getbalance/' + str(wallet[0])
            response = requests.get(URL)
            jsresponse = response.json()
            print(jsresponse['balnace'])
            queryset.update(eth_balance=jsresponse['balnace'])
           
    getBalance.short_description = "getBalance"


class TransactionAdmin(admin.ModelAdmin):
    actions = None
    list_display = ('hash', 'confirmations', 'from_address', 'to_address', 'value')
    readonly_fields = ('hash', 'confirmations', 'from_address', 'to_address', 'value')

    def get_actions(self, request):
        actions = super().get_actions(request)
        
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    def has_add_permission(self, request):
        return False


admin.site.register(Wallet, WalletAdmin)
admin.site.register(TransactionHistory, TransactionAdmin)