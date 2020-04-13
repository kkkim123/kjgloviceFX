# Generated by Django 3.0.4 on 2020-04-13 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_auto_20200409_1802'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fxuser',
            name='annual_income',
            field=models.CharField(blank=True, choices=[('0', 'Less Than 10,000'), ('1', '10,000 to 50,000'), ('2', '50,000 to 100,000'), ('3', 'Over 100,000')], default='1', max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='fxuser',
            name='education_level',
            field=models.CharField(blank=True, choices=[('0', 'Bachelors Degree or Equivalent'), ('1', 'Masters Degree or equivalent'), ('2', 'Phd / Research Degree'), ('3', 'Diploma or Equivalent')], default='1', max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='fxuser',
            name='employment_position',
            field=models.CharField(blank=True, choices=[('0', 'Senior level Management'), ('1', 'Middle Management'), ('2', 'Entry Level')], default='1', max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='fxuser',
            name='employment_status',
            field=models.CharField(blank=True, choices=[('0', 'Employed'), ('1', 'Self-Employed'), ('2', 'Unemployed'), ('3', 'Retired'), ('4', 'Student')], default='1', max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='fxuser',
            name='expected_deposit',
            field=models.CharField(blank=True, choices=[('0', 'Employed'), ('1', 'Self-Employed'), ('2', 'Unemployed'), ('3', 'Retired'), ('4', 'Student')], default='1', max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='fxuser',
            name='income_source',
            field=models.CharField(blank=True, choices=[('0', 'salary'), ('1', 'Business/Profession'), ('2', 'capital gain'), ('3', 'House Property'), ('4', 'other sources')], default='1', max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='fxuser',
            name='trading_experience',
            field=models.CharField(blank=True, choices=[('0', 'Y'), ('1', 'N')], default='1', max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='fxuser',
            name='trading_period',
            field=models.CharField(blank=True, choices=[('0', 'I have a relevant education/professional qualification'), ('1', 'I regularly monitor the news/markets'), ('2', 'I have read educational material on FX trading'), ('3', 'all of the above'), ('4', 'none of above')], default='1', max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='fxuser',
            name='user_type',
            field=models.CharField(blank=True, choices=[('R', 'Retail'), ('I', 'IB')], default='R', max_length=1),
        ),
    ]
