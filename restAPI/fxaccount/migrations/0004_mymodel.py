# Generated by Django 3.0.4 on 2020-03-26 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fxaccount', '0003_auto_20200326_1533'),
    ]

    operations = [
        migrations.CreateModel(
            name='MyModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('COMPANY_IDX', models.IntegerField()),
            ],
        ),
    ]
