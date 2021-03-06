from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)

from django.utils.translation import ugettext_lazy as _
#from pygments.lexers import get_all_lexers
#from pygments.styles import get_all_styles
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight
from uuid import uuid4
import datetime
import json, configparser

#config = configparser.ConfigParser()
#config.read('common/config/config.ini')

from mptt.models import TreeForeignKey, MPTTModel

USER_TYPES = (
    ('R', 'Retail'),
    ('I', 'IB'),
)

EST_ANNUAL_INCOME = (
    ('0', 'Less Than 10,000'),
    ('1', '10,000 to 50,000'),
    ('2', '50,000 to 100,000'),
    ('3', 'Over 100,000'),
)
INCOME_OF_SOURCE = (
    ('0', 'salary'),
    ('1', 'Business/Profession'),
    ('2', 'capital gain'),
    ('3', 'House Property'),
    ('4', 'other sources'),
)

EST_NET_WORTH = (
    ('0', 'Less Than 10,000'),
    ('1', '10,000 to 50,000'),
    ('2', '50,000 to 100,000'),
    ('3', 'Over 100,000'),
)

EMPLOYMENT_STATUS_CHOICES = (
    ('0', 'Employed'),
    ('1', 'Self-Employed'),
    ('2', 'Unemployed'),
    ('3', 'Retired'),
    ('4', 'Student'),
)
EMPLOYMENT_POSITION_CHOICES = (
    ('0', 'Senior level Management'),
    ('1', 'Middle Management'),
    ('2', 'Entry Level'),
)

EDUCATION_LEVEL_CHOICES = (
    ('0', 'Bachelors Degree or Equivalent'),
    ('1', 'Masters Degree or equivalent'),
    ('2', 'Phd / Research Degree'),
    ('3', 'Diploma or Equivalent'),
)

INDUSTRY_CHOICES = (
    ('0', 'Employed'),
    ('1', 'Self-Employed'),
    ('2', 'Unemployed'),
    ('3', 'Retired'),
    ('4', 'Student'),
)
TRADING_EXPERIENCE = (
    ('0', 'Y'),
    ('1', 'N'),
)

TRADING_PERIOD = (
    ('0', 'I have a relevant education/professional qualification'),
    ('1', 'I regularly monitor the news/markets'),
    ('2', 'I have read educational material on FX trading'),
    ('3', 'all of the above'),
    ('4', 'none of above'),
)

IS_TRADED_INSTRUMENT_CHOICES = (
    (True, "Yes"),
    (False, "No"),
)

IS_FINANCIAL_SERVICE_PROVIDER = (
    (True, "Yes"),
    (False, "No"),
)


IS_IB_CHOICES = (
    ('A', "Approved"),
    ('P', "Pending"),
    ('R', "Reject"),
    ('N', "No"),
)


# SECRET_QUESTION_CHOICE = (
#     ('', 'Please Choose...'),
#     ('1', 'What is your mother\'s maiden name ?'),
#     ('2', 'What was your first pet\'s name ?'),
#     ('3', 'What street did you grow up ?'),
#     ('4', 'What is your favourite color ?'),
#     ('5', 'What is your favourite actor, musician, or artist ?'),
# )

USER_STATUS_CHOICE = (
    ('0', 'Welcome'),
    ('1', 'PENDING EMAIL ADDRESS'),
    ('2', 'CONFIRMED EMAIL ADDRESS'),
    ('3', 'PENDING PROFILE'),
    ('4', 'CONFIRMED PROFILE'),
    ('5', 'PENDING DOCUMENTS'),
    ('6', 'CONFIRMED DOCUMENTS'),
    ('7', 'PENDING OPEN ACCOUNT'),
    ('8', 'CONFIRMED OPEN ACCOUNT'),
    ('9', 'PENDING MAKE DEPOSIT'),
    ('10', 'CONFIRMED MAKE DEPOSIT'),
    # ('11', 'PENDING ALL COMPLETE'),
    # ('12', 'CONFIRMED ALL COMPLETE'),
)


DOC_STATUS = (
    ('A', "Approved"),
    ('P', "Pending"),
    ('R', "Reject"),
)
IB_STATUS = (
    ('A', "Approved"),
    ('P', "Pending"),
    ('R', "Reject"),
)
class FxUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, *args, **kwargs):
        """
        Creates and saves a superuser with the given email, password.
        """
        user = self.create_user(
            **kwargs
        )
        #user.is_superuser = True
        user.is_admin = True
        #user.is_staff = True
        user.save(using=self._db)
        return user

class FxUser(AbstractBaseUser):
    username_validator = None
    username = None

    id = models.AutoField(primary_key=True)
    resident_country = models.CharField(max_length=128)
    first_name  = models.CharField(max_length=240)
    last_name  = models.CharField(max_length=240)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=240)

    user_type = models.CharField(default='R', max_length=1, blank=True, choices=USER_TYPES)
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)

    #residential address
    address = models.CharField(max_length=128, blank=True,null=True)
    postal_code = models.CharField(max_length=36, blank=True,null=True)
    city = models.CharField(max_length=36, blank=True,null=True)

    #personal detail
    Nationality = models.CharField(max_length=128, blank=True,null=True)
    birthday = models.DateField(blank=True,null=True)
    mobile = models.CharField(max_length=24, blank=True,null=True)

    #Empoyment Info 
    employment_status = models.CharField(default='1', max_length=1, blank=True, choices=EMPLOYMENT_STATUS_CHOICES,null=True)
    industry = models.CharField(max_length=256, blank=True,null=True)
    employment_position = models.CharField(default='1', max_length=1, blank=True, choices=EMPLOYMENT_POSITION_CHOICES,null=True)
    education_level = models.CharField(default='1', max_length=1, blank=True, choices=EDUCATION_LEVEL_CHOICES,null=True)

    #Financial Info 
    annual_income = models.CharField(default='1', max_length=1, blank=True, choices=EST_ANNUAL_INCOME,null=True)
    income_source = models.CharField(default='1', max_length=1, blank=True, choices=INCOME_OF_SOURCE,null=True)
    expected_deposit = models.CharField(default='1', max_length=1, blank=True, choices=EMPLOYMENT_STATUS_CHOICES,null=True)
    trading_experience = models.CharField(default='1', max_length=1, blank=True, choices=TRADING_EXPERIENCE,null=True)
    trading_period = models.CharField(default='1', max_length=1, blank=True, choices=TRADING_PERIOD,null=True)

    referral_code = models.CharField(default='2002',max_length=36, blank=True,null=True)
    referral_website = models.URLField(default='' , max_length=128, blank=True, null=True)

    user_status = models.CharField(default='1', max_length=2, blank=True, choices=USER_STATUS_CHOICE)
    kj_address  = models.CharField(default='', max_length=50, blank=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    USER_CREATE_PASSWORD_RETYPE = True
    REQUIRED_FIELDS = ['resident_country','first_name','last_name','password','is_admin','referral_code','user_status', 
    'user_type', 'referral_website', 'address', 'postal_code', 'city',  'Nationality', 'birthday', 'mobile','kj_address',]
    objects = FxUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin




def user_id_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid4, ext)
    return 'user_{0}/id/{1}/{2}/{3}/{4}'.format(
        instance.fxuser.id,
        datetime.date.today().year,
        datetime.date.today().month,
        datetime.date.today().day,
        filename.encode('UTF-8').lower())

def user_residence_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid4(), ext)
    return 'user_{0}/residence/{1}/{2}/{3}/{4}'.format(
        instance.fxuser.id,
        datetime.date.today().year,
        datetime.date.today().month,
        datetime.date.today().day,
        filename.encode('UTF-8').lower())


class FxUserDocument(models.Model):
    fxuser = models.OneToOneField(FxUser, on_delete=models.CASCADE)
    doc_photo_id = models.FileField(upload_to=user_id_directory_path, blank=True, null=True)
    doc_photo_id_status = models.CharField(default='P', max_length=1, blank=True, choices=DOC_STATUS)
    doc_photo_id_updated_at = models.DateTimeField(auto_now=True)

    doc_proof_of_residence = models.FileField(upload_to=user_residence_directory_path, blank=True, null=True)
    doc_proof_of_residence_status = models.CharField(default='P', max_length=1, blank=True, choices=DOC_STATUS)
    doc_proof_of_residence_updated_at = models.DateTimeField(auto_now=True)

    doc_photo_id_2 = models.FileField(upload_to=user_id_directory_path, blank=True, null=True)
    doc_photo_id_2_status = models.CharField(default='P', max_length=1, blank=True, choices=DOC_STATUS)
    doc_photo_id_2_updated_at = models.DateTimeField(auto_now=True)

    doc_proof_of_residence_2 = models.FileField(upload_to=user_residence_directory_path, blank=True, null=True)
    doc_proof_of_residence_2_status = models.CharField(default='P', max_length=1, blank=True, choices=DOC_STATUS)
    doc_proof_of_residence_2_updated_at = models.DateTimeField(auto_now=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
  
    def __str__(self):
        return self.fxuser.email
    
    class Meta:
        ordering = ['created_at']


class ApplyIntroducingBroker(models.Model):
    fxuser = models.OneToOneField(FxUser, on_delete=models.CASCADE)
    company_idx = models.IntegerField(default = 1, blank=True, null=True)
    parent_idx = models.IntegerField(default = 69, blank=True, null=True)
    parent_name = models.CharField(blank=True, max_length=128, null=True)
    ib_code = models.IntegerField(blank=True, null=True)
    ib_name = models.CharField(blank=True, max_length=36)
    point = models.IntegerField(blank=True, null=True)
    live_yn = models.CharField(blank=True, max_length=1, null=True)
    email = models.EmailField(unique=True)
    send_report = models.CharField(blank=True, max_length=1, null=True)
    back_index = models.IntegerField(blank=True, null=True)
    referralurl = models.URLField(blank=True, null=True)
    ib_website = models.URLField(max_length=128, blank=True, null=True, default='')
    
    status = models.CharField(default='P', max_length=1, blank=True, choices=IB_STATUS,null=True)

    def __str__(self):
        return self.fxuser.email or self.ib_name or ''


class IntroducingBroker(MPTTModel):
    id = models.IntegerField(primary_key=True)
    fxuser = models.OneToOneField(FxUser, on_delete=models.CASCADE)
    company_idx = models.IntegerField(default = 1, blank=True, null=True)
    ib_code = models.IntegerField(blank=True, null=True)
    ib_name = models.CharField(blank=True, max_length=36)
    point = models.IntegerField(blank=True, null=True)
    live_yn = models.CharField(blank=True, max_length=1, null=True)
    email = models.EmailField(unique=True)
    send_report = models.CharField(blank=True, max_length=1, null=True)
    referralurl = models.URLField(blank=True, null=True)
    ib_website = models.URLField(max_length=128, blank=True, null=True, default='')
    
    status = models.CharField(default='P', max_length=1, blank=True, choices=IB_STATUS,null=True)
    parent = TreeForeignKey(
        'self',
        #default = 69,
        null=True,
        blank=True,
        related_name='children',
        on_delete=models.CASCADE
    )
    
    def __str__(self):
        return self.fxuser.email or self.ib_name or ''


class RequestUserCall(models.Model):
    id = models.AutoField(primary_key=True)
    from_email = models.CharField(max_length=50, default='', null=True, blank=True)
    subject = models.CharField(max_length=1000, default='')
    mobile = models.CharField(max_length=20, default='')
    content = models.CharField(max_length=4000, default='')
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)
    
    def __str__(self):
        return self.from_email
    
    class Meta:
        db_table = 'request_call_user'

# class IntroducingBroker(models.Model):
#     fxuser = models.OneToOneField(FxUser, on_delete=models.CASCADE)
#     company_idx = models.IntegerField(default = 1, blank=True, null=True)
#     #자신의 referral code 가져오기 
#     #FBP Main backoffice inx 69
#     parent_idx = models.IntegerField(default = 69, blank=True, null=True)
#     ib_code = models.IntegerField(blank=True, null=True)
#     ib_name = models.CharField(blank=True, max_length=36)
#     point = models.IntegerField(blank=True, null=True)
#     live_yn = models.CharField(blank=True, max_length=1, null=True)
#     email = models.EmailField(unique=True)
#     #password = models.CharField(max_length=240, null=True)
#     send_report = models.CharField(blank=True, max_length=1, null=True)
#     back_index = models.IntegerField(blank=True, null=True)
#     referralurl = models.URLField(blank=True, null=True)
#     ib_website = models.URLField(max_length=128, blank=True, null=True, default='')

#     status = models.CharField(default='P', max_length=1, blank=True, choices=IB_STATUS,null=True)
    
#     def __str__(self):
#         return self.fxuser.email