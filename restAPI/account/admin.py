from django.contrib import admin
from .models import Account

class AccountAdmin(admin.ModelAdmin):
    pass
#   list_display = ('user', 'created_at',)

admin.site.register(Account, AccountAdmin)