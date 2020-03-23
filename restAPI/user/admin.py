from django.contrib import admin
from .models import FxUser

class UserAdmin(admin.ModelAdmin):
    pass
#   list_display = ('user', 'created_at',)

admin.site.register(FxUser, UserAdmin)
