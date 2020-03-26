from django.contrib import admin
from .models import FxAccount, DepositTransaction ,WithdrawTransaction

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

admin.site.register(WithdrawTransaction,WithdrawTransAdmin)