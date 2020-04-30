from django.contrib.admin import AdminSite
from django.views.decorators.cache import never_cache

from user.models import *
from user.admin import *
from fxaccount.models import *
from fxaccount.admin import *
from wallet.models import *
from wallet.admin import *


class BaseAdminSite(AdminSite):
    # app_index_template = 'admin/index.html'
    pass

admin_site = BaseAdminSite()
admin_site.register(DepositTransaction,DepositTransAdmin)
admin_site.register(WithdrawTransaction,WithdrawTransAdmin)

admin_site.register(FxUser, UserAdmin)
admin_site.register(IntroducingBroker, IBAdmin)
admin_site.register(ApplyIntroducingBroker, ApplyIBAdmin)
# admin_site.register(FxUserDocument, DocumentAdmin)
admin_site.register(FxAccount, FxAccountAdmin)
admin_site.register(FxAccountTransaction,FxAccountTransactionAdmin)
# admin_site.register(IBListCommission,MyModelAdmin)

admin_site.register(Wallet, WalletAdmin)
admin_site.register(TransactionHistory, TransactionAdmin)
# admin_site.register(MyModel)