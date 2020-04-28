# Generated by Django 3.0.4 on 2020-04-28 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fxaccount', '0005_remove_deposittransaction_exchange_rate'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='withdrawtransaction',
            name='exchange_rate',
        ),
        migrations.AddField(
            model_name='deposittransaction',
            name='pre_status',
            field=models.CharField(choices=[('P', 'Pending'), ('A', 'Approved'), ('D', 'Declined'), ('S', 'Completed')], default='P', max_length=1),
        ),
        migrations.AddField(
            model_name='withdrawtransaction',
            name='pre_status',
            field=models.CharField(choices=[('P', 'Pending'), ('A', 'Approved'), ('D', 'Declined'), ('S', 'Completed')], default='P', max_length=1),
        ),
        migrations.AlterField(
            model_name='deposittransaction',
            name='status',
            field=models.CharField(blank=True, choices=[('P', 'Pending'), ('A', 'Approved'), ('D', 'Declined'), ('S', 'Completed')], default='P', max_length=1),
        ),
    ]
