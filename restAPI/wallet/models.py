from django.db import models
from user.models import FxUser
class Wallet(models.Model):
    id = models.OneToOneField(FxUser, on_delete=models.CASCADE,primary_key=True)

    address = models.CharField(default='', max_length=42, blank=False)
    balance = models.FloatField(default=0.0, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)

    class Meta:
        verbose_name = "Wallet"
        verbose_name_plural = "Wallet"
