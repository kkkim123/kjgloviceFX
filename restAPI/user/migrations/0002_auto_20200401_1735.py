# Generated by Django 3.0.4 on 2020-04-01 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='introducingbroker',
            name='company_idx',
            field=models.IntegerField(blank=True, default=8, null=True),
        ),
        migrations.AlterField(
            model_name='introducingbroker',
            name='ib_code',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='introducingbroker',
            name='live_yn',
            field=models.CharField(blank=True, max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='introducingbroker',
            name='parent_idx',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='introducingbroker',
            name='password',
            field=models.CharField(max_length=240, null=True),
        ),
        migrations.AlterField(
            model_name='introducingbroker',
            name='send_report',
            field=models.CharField(blank=True, max_length=1, null=True),
        ),
    ]
