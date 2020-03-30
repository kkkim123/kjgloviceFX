# Generated by Django 3.0.4 on 2020-03-24 10:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import user.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FxUser',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('resident_country', models.CharField(max_length=240)),
                ('first_name', models.CharField(max_length=240)),
                ('last_name', models.CharField(max_length=240)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=240)),
                ('user_type', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('R', 'Retail'), ('I', 'IB')], default='R', max_length=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('address', models.CharField(blank=True, max_length=128)),
                ('postal_code', models.CharField(blank=True, max_length=36)),
                ('city', models.CharField(blank=True, max_length=36)),
                ('Nationality', models.CharField(blank=True, max_length=128)),
                ('birthday', models.DateField(blank=True)),
                ('mobile', models.CharField(blank=True, max_length=24)),
                ('employment_status', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'Employed'), ('2', 'Self-Employed'), ('3', 'Unemployed'), ('4', 'Retired'), ('5', 'Student')], default='1', max_length=1)),
                ('industry', models.CharField(blank=True, max_length=256)),
                ('employment_position', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'Senior level Management'), ('2', 'Middle Management'), ('3', 'Entry Level')], default='1', max_length=1)),
                ('education_level', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'Bachelors Degree or Equivalent'), ('2', 'Masters Degree or equivalent'), ('3', 'Phd / Research Degree'), ('4', 'Diploma or Equivalent')], default='1', max_length=1)),
                ('annual_income', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'Less Than 10,000'), ('2', '10,000 to 50,000'), ('3', '50,000 to 100,000'), ('4', 'Over 100,000')], default='1', max_length=1, verbose_name='annual income')),
                ('income_source', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'Employed'), ('2', 'Self-Employed'), ('3', 'Unemployed'), ('4', 'Retired'), ('5', 'Student')], default='1', max_length=1, verbose_name='income source')),
                ('expected_deposit', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'Employed'), ('2', 'Self-Employed'), ('3', 'Unemployed'), ('4', 'Retired'), ('5', 'Student')], default='1', max_length=1, verbose_name='expected deposit')),
                ('trading_experience', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'Y'), ('2', 'N')], default='1', max_length=1, verbose_name='trading experience')),
                ('trading_period', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'I have a relevant education/professional qualification'), ('2', 'I regularly monitor the news/markets'), ('3', 'I have read educational material on FX trading'), ('4', 'all of the above'), ('5', 'none of above')], default='1', max_length=1, verbose_name='trading period')),
                ('user_status', models.CharField(blank=True, choices=[('', 'Please Choose...'), ('1', 'PENDING EMAIL ADDRESS'), ('2', 'CONFIRMED EMAIL ADDRESS'), ('3', 'PENDING PROFILE'), ('4', 'CONFIRMED PROFILE'), ('5', 'PENDING DOCUMENTS'), ('6', 'CONFIRMED DOCUMENTS'), ('7', 'PENDING OPEN ACCOUNT'), ('8', 'CONFIRMED OPEN ACCOUNT'), ('9', 'PENDING MAKE DEPOSIT'), ('10', 'CONFIRMED MAKE DEPOSIT'), ('11', 'PENDING ALL COMPLETE'), ('12', 'CONFIRMED ALL COMPLETE')], default='1', max_length=2)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', user.models.FxUserManager()),
            ],
        ),
        migrations.CreateModel(
            name='UserInvoices',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, default='', max_length=256, verbose_name='Name')),
                ('email', models.EmailField(blank=True, default='', max_length=512, verbose_name='Email')),
                ('mobile', models.CharField(blank=True, default='', max_length=50, verbose_name='Mobile')),
                ('address1', models.CharField(blank=True, default='', max_length=128, verbose_name='Address 1')),
                ('address2', models.CharField(blank=True, default='', max_length=128, verbose_name='Address 2')),
                ('address3', models.CharField(blank=True, default='', max_length=128, verbose_name='Address 3')),
                ('address4', models.CharField(blank=True, default='', max_length=128, verbose_name='Address 4')),
                ('invoice_no', models.CharField(blank=True, max_length=36, null=True)),
                ('invoice_date', models.DateField(auto_now_add=True)),
                ('item_code', models.CharField(blank=True, default='', max_length=128, verbose_name='Item Code')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('fxuser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FxUserDocument',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doc_photo_id', models.FileField(blank=True, null=True, upload_to=user.models.user_id_directory_path)),
                ('doc_photo_id_status', models.CharField(blank=True, choices=[('A', 'Approved'), ('P', 'Pending'), ('R', 'Reject')], default='P', max_length=1)),
                ('doc_photo_id_updated_at', models.DateTimeField(auto_now=True)),
                ('doc_proof_of_residence', models.FileField(blank=True, null=True, upload_to=user.models.user_residence_directory_path)),
                ('doc_proof_of_residence_status', models.CharField(blank=True, choices=[('A', 'Approved'), ('P', 'Pending'), ('R', 'Reject')], default='P', max_length=1)),
                ('doc_proof_of_residence_updated_at', models.DateTimeField(auto_now=True)),
                ('doc_photo_id_2', models.FileField(blank=True, null=True, upload_to=user.models.user_id_directory_path)),
                ('doc_photo_id_2_status', models.CharField(blank=True, choices=[('A', 'Approved'), ('P', 'Pending'), ('R', 'Reject')], default='P', max_length=1)),
                ('doc_photo_id_2_updated_at', models.DateTimeField(auto_now=True)),
                ('doc_proof_of_residence_2', models.FileField(blank=True, null=True, upload_to=user.models.user_residence_directory_path)),
                ('doc_proof_of_residence_2_status', models.CharField(blank=True, choices=[('A', 'Approved'), ('P', 'Pending'), ('R', 'Reject')], default='P', max_length=1)),
                ('doc_proof_of_residence_2_updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('fxuser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]
