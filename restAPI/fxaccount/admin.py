from django.contrib import admin
from .models import FxAccount, DepositTransaction ,WithdrawTransaction ,IBListCommission
from django.db import connections
from django.http import HttpResponse,HttpResponseRedirect
from django.urls import path
from django.template.response import TemplateResponse

# class MyModelAdmin2(admin.ModelAdmin):
#     def get_urls(self):
#         urls = super().get_urls()
#         my_urls = [
#             path('my_view/', self.my_view),
#         ]
#         return my_urls + urls

#     def my_view(self, request):
#         # ...
#         context = dict(
#            # Include common variables for rendering the admin template.
#            self.admin_site.each_context(request),
#            # Anything else you want in the context...
#            key=value,
#         )
#         return TemplateResponse(request, "sometemplate.html", context)
# def my_custom_view(request):
# 	return HttpResponse('Admin Custom View')
 
# class DummyModelAdmin(admin.ModelAdmin):
#     model = DummyModel
 
#     def get_urls(self):
#         view_name = '{}_{}_changelist'.format(
#             self.model._meta.app_label, self.model._meta.model_name)
#         return [
#             path('my_admin_path/', my_custom_view, name=view_name),
#         ]
# admin.site.register(DummyModel, DummyModelAdmin)

# class MyAdmin(TreeAdmin):
#     form = movenodeform_factory(MyNode)

# admin.site.register(MyNode, MyAdmin)



class FxAccountAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'mt4_account', 'account_type',  'ib_commission',
    )
    # search_fields = ('mt4_account', 'fxuser')
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    # def save_model(self, request, obj, form, change):
    #     user = request.user
    #     instance = form.save(commit=False)
    #     if not change:  #new object
    #         new_transaction = TradingAccountTransaction()
    #         new_transaction.request_user = user
    #         new_transaction.new_pending_at = datetime.datetime.now()
    #         new_transaction.save()

    #     instance.save()
    #     form.save_m2m()
    #     return instance

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


    # transaction_type = models.CharField(default='D', max_length=1, choices=DEPOSIT_WITHDRAW_TRANSACTION_TYPE_CHOICE)
    # request_user = models.ForeignKey(FxUser,on_delete=models.CASCADE)
    # status = models.CharField( default='P', max_length=20, blank=True, choices=DEPOSIT_WITHDRAW_TRANSACTION_STATUS)
    # approval_no = models.CharField(default='', max_length=40, blank=True)
    # customer_id = models.CharField(default='', max_length=20, blank=True)
    # order_id = models.CharField(default='', max_length=40, blank=True)
    # transaction_no = models.CharField(default='', max_length=40, blank=True)
    # amount = models.FloatField( default=0.0, blank=True)
    # mt4_account = models.CharField( default='', max_length=36, blank=True)
    # payment_method = models.CharField( default='', max_length=2, blank=True, choices=DEPOSIT_METHOD_CHOICE)
    # currency = models.CharField( default='1', max_length=1, blank=True, choices=ACCOUNT_BASE_CURRENCY_CHOICE)
    # crypto_sender_address = models.CharField(default='', max_length=64, blank=True, null=True)
    # bank_name = models.CharField(default='', max_length=48, blank=True)  # for wire transfer
    # cellphone_number = models.CharField(default='', max_length=30, blank=True)  # for wire transfer
    # description = models.TextField( default='', blank=True)
    # gateway_status = models.CharField(default='', max_length=20, blank=True)
    # status_remark = models.TextField( default='', blank=True)
    # created_at = models.DateTimeField( auto_now_add=True, auto_now=False)
    # updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)
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
# transaction_type = models.CharField(default='W', max_length=1, choices=DEPOSIT_WITHDRAW_TRANSACTION_TYPE_CHOICE)
#     request_user = models.ForeignKey(FxUser,on_delete=models.CASCADE)
#     status = models.CharField(default='P', max_length=1, blank=False, choices=DEPOSIT_WITHDRAW_TRANSACTION_STATUS)
#     payment_method = models.CharField(default='', max_length=2, blank=True, choices=WITHDRAW_METHOD_CHOICE)
#     amount = models.FloatField( default=0.0, blank=True)
#     mt4_account = models.CharField( default='', max_length=36, blank=True)
#     bank_name = models.CharField(default='', max_length=48, blank=True)
#     bank_account = models.CharField(default='', max_length=48, blank=True)
#     bank_address = models.CharField(default='', max_length=128, blank=True)
#     bank_swift = models.CharField(default='', max_length=16, blank=True)
#     bank_iban = models.CharField(default='', max_length=48, blank=True)
#     bank_branch_name = models.CharField(default='', max_length=48, blank=True)
#     bank_branch_code = models.CharField(default='', max_length=48, blank=True)
#     intermediary_bank_name = models.CharField(default='', max_length=48, blank=True)
#     intermediary_bank_swift = models.CharField(default='', max_length=16, blank=True)
#     currency = models.CharField( default='1', max_length=1, blank=True, choices=ACCOUNT_BASE_CURRENCY_CHOICE)
#     beneficiary_full_name = models.CharField(default='', max_length=48, blank=True)
#     beneficiary_address = models.CharField(default='', max_length=128, blank=True)
#     description = models.TextField(default='', blank=True)
#     paypal_email = models.EmailField(default='', blank=True)
#     crypto_receiver_address = models.CharField(default='', max_length=64, blank=True, null=True)
#     i_account_no = models.CharField(default='', max_length=48, blank=True, null=True)
#     status_remark = models.TextField( default='', blank=True)
#     created_at = models.DateTimeField( auto_now_add=True, auto_now=False)
#     updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)
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