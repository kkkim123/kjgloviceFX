from django.contrib import admin
from .models import FxAccount, DepositTransaction ,WithdrawTransaction ,IBListCommission
from django.db import connections
from django.http import HttpResponse,HttpResponseRedirect
from django.urls import path
from django.template.response import TemplateResponse


class FxAccountAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'mt4_account', 'account_type',  'ib_commission',
    )
    # search_fields = ('mt4_account', 'fxuser')
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    def get_ib_code(self, obj):
        if obj.ib_status :
            return obj.fxuser.ib_code
        else:
            return "N/A"

    get_ib_code.short_description = 'IB Code'
    get_ib_code.admin_order_field = 'fxuser__ib_code'

    list_per_page = 10
    list_editable = ('ib_commission',)
    search_fields = ('mt4_account',)

admin.site.register(FxAccount, FxAccountAdmin)

class DepositTransAdmin(admin.ModelAdmin):
    list_display = (
        'transaction_no', 'request_user', 'mt4_account', 'currency','amount', 'bank_name','cellphone_number',
        'created_at','updated_at','status',
    )
    # search_fields = ('mt4_account', 'fxuser')
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    list_per_page = 10
    list_editable = ('status',)
    search_fields = ('status',)

admin.site.register(DepositTransaction,DepositTransAdmin)

class WithdrawTransAdmin(admin.ModelAdmin):
    list_display = (
        'request_user', 'mt4_account', 'currency','amount', 'bank_name','bank_account',
        'created_at','updated_at','status',
    )
    # search_fields = ('mt4_account', 'fxuser')
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    list_per_page = 10
    list_editable = ('status',)
    search_fields = ('status',)
    #list_display_links = ['emp_no', 'first_name']
    
admin.site.register(WithdrawTransaction,WithdrawTransAdmin)


#admin.site.register()

#@admin.register(MyModel)
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