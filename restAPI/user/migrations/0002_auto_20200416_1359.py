# Generated by Django 3.0.4 on 2020-04-16 04:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fxuser',
            name='user_status',
            field=models.CharField(blank=True, choices=[('0', 'Welcome'), ('1', 'PENDING EMAIL ADDRESS'), ('2', 'CONFIRMED EMAIL ADDRESS'), ('3', 'PENDING PROFILE'), ('4', 'CONFIRMED PROFILE'), ('5', 'PENDING DOCUMENTS'), ('6', 'CONFIRMED DOCUMENTS'), ('7', 'PENDING OPEN ACCOUNT'), ('8', 'CONFIRMED OPEN ACCOUNT'), ('9', 'PENDING MAKE DEPOSIT'), ('10', 'CONFIRMED MAKE DEPOSIT')], default='1', max_length=2),
        ),
    ]
