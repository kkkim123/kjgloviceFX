from django.contrib import admin
from .models import Currency

class CurrencyAdmin(admin.ModelAdmin):
    search_fields = ('code',)
    list_display = ('code', 'name')
