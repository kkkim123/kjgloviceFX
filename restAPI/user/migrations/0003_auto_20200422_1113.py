# Generated by Django 3.0.4 on 2020-04-22 02:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_auto_20200422_1035'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='introducingbroker',
            name='back_index',
        ),
        migrations.RemoveField(
            model_name='introducingbroker',
            name='parent_idx',
        ),
        migrations.AddField(
            model_name='applyintroducingbroker',
            name='back_index',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='applyintroducingbroker',
            name='company_idx',
            field=models.IntegerField(blank=True, default=1, null=True),
        ),
        migrations.AddField(
            model_name='applyintroducingbroker',
            name='ib_code',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='applyintroducingbroker',
            name='parent_idx',
            field=models.IntegerField(blank=True, default=69, null=True),
        ),
        migrations.AddField(
            model_name='applyintroducingbroker',
            name='referralurl',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='introducingbroker',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
