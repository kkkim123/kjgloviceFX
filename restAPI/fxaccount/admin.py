from django.contrib import admin
from django.db import connections
from django.http import HttpResponse,HttpResponseRedirect
from django.urls import path
from django.template.response import TemplateResponse

from .models import FxAccount, DepositTransaction ,WithdrawTransaction ,IBListCommission,FxAccountTransaction
from user.models import FxUser
from wallet.models import Wallet
import configparser
import requests

config = configparser.ConfigParser()
config.read('common/config/config.ini')

class FxAccountAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'mt4_account', 'referral_code','ib_commission','status','updated_at',
    )
    # search_fields = ('mt4_account', 'fxuser')
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    list_per_page = 10
    list_editable = ('mt4_account','ib_commission','status',)
    search_fields = ('user','mt4_account','referral_code',)

    def save_model(self, request, obj, form, change):
        fxuser = FxUser.objects.get(id = obj.user_id)
        #print(len(obj.mt4_account))
        if(len(obj.mt4_account) > 4 and 8 > int(fxuser.user_status)):
            fxuser.user_status = '8'     
            fxuser.save()    
        # else if(len(obj.mt4_account) > 0) :
        #     fxuser.user_status = '7'     
        #     fxuser.save()       
        
        super().save_model(request, obj, form, change)    


admin.site.register(FxAccount, FxAccountAdmin)

class FxAccountTransactionAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'from_account', 'to_account','status','transaction_type','created_at','updated_at',
    )
    # search_fields = ('mt4_account', 'fxuser')
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    list_per_page = 10
    list_editable = ('status',)
    search_fields = ('user','from_account','to_account','referral_code',)


admin.site.register(FxAccountTransaction,FxAccountTransactionAdmin)

class DepositTransAdmin(admin.ModelAdmin):
    list_display = (
        'user','mt4_account', 'currency','amount','crypto_address','deposit_crypto','crypto_amount','cellphone_number','status',
        'created_at','updated_at',
    )
    # search_fields = ('mt4_account', 'fxuser')'user',
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    list_per_page = 10
    list_editable = ('status',)
    search_fields = ('user','mt4_account','cellphone_number',)

    def save_model(self, request, obj, form, change):
        print(obj.user_id)
        if(obj.status == 'A'):
            wallet = Wallet.objects.get(id = obj.user_id)
            ETH_BALANCE_URL = 'http://3.0.181.55:3000/eth/fx/getbalance/' + str(obj.user_id)
            jsresponse = requests.get(ETH_BALANCE_URL).json()
            print(jsresponse)
            if(float(jsresponse['balnace']) < 0.002):
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
            wallet.eth_balance = jsresponse['balnace']
            wallet.save()  
            KJ_BALANCE_URL = 'http://3.0.181.55:3000/kj/fx/getbalance/' + str(obj.user_id)
            jsresponse = requests.get(KJ_BALANCE_URL).json()
            print(jsresponse)
            if(float(jsresponse['balnace']) > float(obj.crypto_amount)):
                KJ_SEND_URL = 'http://3.0.181.55:3000/kj/fx/send'
                try:
                    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
                    print(obj.user_id)
                    data = {'index': obj.user_id, 'from': obj.crypto_address,'to': config["ACCOUNT"]["KJ_ADDRESS"], 
                            'value': obj.crypto_amount,'gasLimit': config["TOKEN"]["GASLIMIT"], 'gasPrice': config["TOKEN"]["GAS"]}
                    res = requests.post(KJ_SEND_URL, headers=headers, data=data)

                    if res.status_code == 200:
                        print("OK")
                    else : 
                        print("400")
                except :
                    print("Failed.FailedFailedFailedFailed")
                KJ_BALANCE_URL = 'http://3.0.181.55:3000/kj/fx/getbalance/' + str(obj.user_id)
                jsresponse = requests.get(KJ_BALANCE_URL).json()
                wallet.kj_balance = jsresponse['balnace'] 
                wallet.save()    
        super().save_model(request, obj, form, change)  

admin.site.register(DepositTransaction,DepositTransAdmin)

class WithdrawTransAdmin(admin.ModelAdmin):
    list_display = (
        'mt4_account', 'currency','amount', 'crypto_address',
        'created_at','updated_at','status',
    )
    # search_fields = ('mt4_account', 'fxuser')'user',
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    list_per_page = 10
    list_editable = ('status',)
    search_fields = ('status',)
    #list_display_links = ['emp_no', 'first_name']

admin.site.register(WithdrawTransaction,WithdrawTransAdmin)


class MyModelAdmin(admin.ModelAdmin):
    #print('MyModelAdmin')
    list_display = ("IB_LOGIN", "COMPANY_IDX","TOT_COMMISSION","LIVE_YN")

    actions = ['set_immortal']
    # cursor =  connections['backOffice'].cursor()
    # #cursor.execute("{call fbp_live.SP_IB_COMMISSION_IB_LIST(?)}", [id])
    # #cursor.execute(call 'SP_IB_COMMISSION_IB_LIST()')
    # #result = cursor.fetchall()
    # #with connections['backOffice'].cursor() as cursor:
    # cursor.callproc('SP_IB_COMMISSION_IB_LIST', [1, 'Y'])
    # MyModel = cursor.fetchall()
    # result_list = []   

    # from row in rows:
    #     p = MyModel(id=row[0], fist_name=row[1], last_name=row[2], birthday=row[3])
    #     result_list.append(p)
    # return result_list



    change_list_template  = "admin/change_list_.html"
    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('immortal/', self.set_immortal),
        ]
        return my_urls + urls
    # COMPANY_IDX = models.IntegerField(primary_key=True)
    # LIVE_YN = models.CharField(max_length=1)
    # IB_LOGIN = models.IntegerField()
    # TOT_COMMISSION = models.IntegerField()
    def set_immortal(self, request):
        if "_make-unique" in request.GET:
            cursor =  connections['backOffice'].cursor()
            cursor.callproc("SP_IB_COMMISSION_IB_LIST", [request.GET['i_company_id'], request.GET['i_live_yn']])
            results = list(cursor.fetchall())
            print(results)
            for t in results:
                IBListCommission(COMPANY_IDX=1,LIVE_YN='Y',IB_LOGIN=t[0],TOT_COMMISSION=t[1]).save()
        return HttpResponseRedirect("../")



    # def make_published(self, request, queryset):
    #     if "_make-unique" in request.GET:
    #         cursor =  connections['backOffice'].cursor()
    #         cursor.callproc("SP_IB_COMMISSION_IB_LIST", [1, 'Y'])
    #         results = list(cursor.fetchall())
    #         print(results)
    #         for t in results:
    #             MyModel(COMPANY_IDX=t[0]).save()
    #     return HttpResponseRedirect("../")
        # cursor =  connections['backOffice'].cursor()
        # cursor.callproc("SP_IB_COMMISSION_IB_LIST", [1, 'Y'])
        # results = list(cursor.fetchall())
        # print('backOffice')
        # result_list = []   
        # print(results)
        # from row in results:
        #     p = MyModel(id=row[0], fist_name=row[1], last_name=row[2], birthday=row[3])
        #     result_list.append(p)
        # return result_list

admin.site.register(IBListCommission,MyModelAdmin)


	# IN i_admin_id varchar(30)
	# , IN i_company_idx int
    # , IN i_account int 
    # , IN i_group varchar(20)
	# , IN i_sorting 		varchar(20) 
	# , IN	 i_sort_colume   varchar(50) 
# class IBListStructureAdmin(admin.ModelAdmin):

#     list_display = ("IB_LOGIN", "COMPANY_IDX","TOT_COMMISSION","LIVE_YN")

#     actions = ['set_immortal']
#     # cursor =  connections['backOffice'].cursor()
#     # #cursor.execute("{call fbp_live.SP_IB_COMMISSION_IB_LIST(?)}", [id])
#     # #cursor.execute(call 'SP_IB_COMMISSION_IB_LIST()')
#     # #result = cursor.fetchall()
#     # #with connections['backOffice'].cursor() as cursor:
#     # cursor.callproc('SP_IB_COMMISSION_IB_LIST', [1, 'Y'])
#     # MyModel = cursor.fetchall()
#     # result_list = []   

#     # from row in rows:
#     #     p = MyModel(id=row[0], fist_name=row[1], last_name=row[2], birthday=row[3])
#     #     result_list.append(p)
#     # return result_list



#     change_list_template  = "admin/change_list_.html"
#     def get_urls(self):
#         urls = super().get_urls()
#         my_urls = [
#             path('immortal/', self.set_immortal),
#         ]
#         return my_urls + urls
#     # COMPANY_IDX = models.IntegerField(primary_key=True)
#     # LIVE_YN = models.CharField(max_length=1)
#     # IB_LOGIN = models.IntegerField()
#     # TOT_COMMISSION = models.IntegerField()
#     def set_immortal(self, request):
#         if "_make-unique" in request.GET:
#             cursor =  connections['backOffice'].cursor()
#             cursor.callproc("SP_IB_COMMISSION_IB_LIST", [request.GET['i_company_id'], request.GET['i_live_yn']])
#             results = list(cursor.fetchall())
#             print(results)
#             for t in results:
#                 IBListCommission(COMPANY_IDX=1,LIVE_YN='Y',IB_LOGIN=t[0],TOT_COMMISSION=t[1]).save()
#         return HttpResponseRedirect("../")



#     # def make_published(self, request, queryset):
#     #     if "_make-unique" in request.GET:
#     #         cursor =  connections['backOffice'].cursor()
#     #         cursor.callproc("SP_IB_COMMISSION_IB_LIST", [1, 'Y'])
#     #         results = list(cursor.fetchall())
#     #         print(results)
#     #         for t in results:
#     #             MyModel(COMPANY_IDX=t[0]).save()
#     #     return HttpResponseRedirect("../")
#         # cursor =  connections['backOffice'].cursor()
#         # cursor.callproc("SP_IB_COMMISSION_IB_LIST", [1, 'Y'])
#         # results = list(cursor.fetchall())
#         # print('backOffice')
#         # result_list = []   
#         # print(results)
#         # from row in results:
#         #     p = MyModel(id=row[0], fist_name=row[1], last_name=row[2], birthday=row[3])
#         #     result_list.append(p)
#         # return result_list

# admin.site.register(IBListCommission,MyModelAdmin)