from django.contrib import admin
from web3 import Web3, HTTPProvider
#from common.utils import TokenUtil
from .models import Wallet
import configparser

config = configparser.ConfigParser()
config.read('common/config/config.ini')
class WalletAdmin( admin.ModelAdmin):
    actions = ['getBalance']
    list_display = ('id', 'address', 'balance' , 'updated_at','created_at')


    def getBalance(self, request, queryset):
        if queryset.count() != 1:
            self.message_user(request, 'Let\'s do it slowly one by one')
            return
        web3 = Web3(HTTPProvider(config["INFURA"]["URI"]))
        Wallets = queryset.values_list('address')
        #checksum_address = web3.toChecksumAddress(config['ACCOUNT']['ETH_ADDRESS'])
        checksum_address = web3.toChecksumAddress(Wallets[0][0])
        select_balance= web3.eth.getBalance(checksum_address)
        queryset.update(balance = web3.fromWei(select_balance, 'ether'))


        
    getBalance.short_description = "getBalance"







admin.site.register(Wallet, WalletAdmin)