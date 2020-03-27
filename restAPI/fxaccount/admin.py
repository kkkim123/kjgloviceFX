from django.contrib import admin
from .models import FxAccount, DepositTransaction ,WithdrawTransaction ,MyModel
from django.db import connections
# from treebeard.admin import TreeAdmin
# from treebeard.forms import movenodeform_factory


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

class DepositTransAdmin(admin.ModelAdmin):
    list_display = (
        'request_user', 'transaction_type', 'amount',  'status',
    )
    # search_fields = ('mt4_account', 'fxuser')
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    list_per_page = 10
    list_editable = ('status',)
    search_fields = ('status',)

admin.site.register(DepositTransaction,DepositTransAdmin)

class WithdrawTransAdmin(admin.ModelAdmin):
    list_display = (
        'request_user', 'transaction_type', 'amount',  'status',
    )
    # search_fields = ('mt4_account', 'fxuser')
    # list_filter = ('account_type', 'account_status', 'fxuser', 'base_currency')

    list_per_page = 10
    list_editable = ('status',)
    search_fields = ('status',)
    #list_display_links = ['emp_no', 'first_name']
admin.site.register(WithdrawTransaction,WithdrawTransAdmin)


#admin.site.register()


class MyModelAdmin(admin.ModelAdmin):
    #print('MyModelAdmin')


    actions = ['make_published']
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



    change_form_template = "admin/change_form.html"



    def make_published(self, request, queryset):
        if "_make-unique" in request.GET:
            cursor =  connections['backOffice'].cursor()
            cursor.callproc("SP_IB_COMMISSION_IB_LIST", [1, 'Y'])
            results = list(cursor.fetchall())
            print(results)
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

admin.site.register(MyModel,MyModelAdmin)
