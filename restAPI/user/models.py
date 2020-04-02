from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)

from django.utils.translation import ugettext_lazy as _
#from pygments.lexers import get_all_lexers
#from pygments.styles import get_all_styles
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight
#from simple_email_confirmation.models import SimpleEmailConfirmationUserMixin
#from django_countries.fields import CountryField
from uuid import uuid4
import datetime
# LEXERS = [item for item in get_all_lexers() if item[1]]
# LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
# STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])


USER_TYPES = (
    ('', 'Please Choose...'),
    ('R', 'Retail'),
    ('I', 'IB'),
)

EST_ANNUAL_INCOME = (
    ('', 'Please Choose...'),
    ('1', 'Less Than 10,000'),
    ('2', '10,000 to 50,000'),
    ('3', '50,000 to 100,000'),
    ('4', 'Over 100,000'),
)

EST_NET_WORTH = (
    ('', 'Please Choose...'),
    ('1', 'Less Than 10,000'),
    ('2', '10,000 to 50,000'),
    ('3', '50,000 to 100,000'),
    ('4', 'Over 100,000'),
)

EMPLOYMENT_STATUS_CHOICES = (
    ('', 'Please Choose...'),
    ('1', 'Employed'),
    ('2', 'Self-Employed'),
    ('3', 'Unemployed'),
    ('4', 'Retired'),
    ('5', 'Student'),
)
EMPLOYMENT_POSITION_CHOICES = (
    ('', 'Please Choose...'),
    ('1', 'Senior level Management'),
    ('2', 'Middle Management'),
    ('3', 'Entry Level'),
)

EDUCATION_LEVEL_CHOICES = (
    ('', 'Please Choose...'),
    ('1', 'Bachelors Degree or Equivalent'),
    ('2', 'Masters Degree or equivalent'),
    ('3', 'Phd / Research Degree'),
    ('4', 'Diploma or Equivalent'),
)

INDUSTRY_CHOICES = (
    ('', 'Please Choose...'),
    ('1', 'Employed'),
    ('2', 'Self-Employed'),
    ('3', 'Unemployed'),
    ('4', 'Retired'),
    ('5', 'Student'),
)
TRADING_EXPERIENCE = (
    ('', 'Please Choose...'),
    ('1', 'Y'),
    ('2', 'N'),
)

TRADING_PERIOD = (
    ('', 'Please Choose...'),
    ('1', 'I have a relevant education/professional qualification'),
    ('2', 'I regularly monitor the news/markets'),
    ('3', 'I have read educational material on FX trading'),
    ('4', 'all of the above'),
    ('5', 'none of above'),
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


SECRET_QUESTION_CHOICE = (
    ('', 'Please Choose...'),
    ('1', 'What is your mother\'s maiden name ?'),
    ('2', 'What was your first pet\'s name ?'),
    ('3', 'What street did you grow up ?'),
    ('4', 'What is your favourite color ?'),
    ('5', 'What is your favourite actor, musician, or artist ?'),
)

USER_STATUS_CHOICE = (
    ('', 'Please Choose...'),
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
    ('11', 'PENDING ALL COMPLETE'),
    ('12', 'CONFIRMED ALL COMPLETE'),

)


DOC_STATUS = (
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
    resident_country = models.CharField(max_length=240)
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
    annual_income = models.CharField(_("annual income"),default='1', max_length=1, blank=True, choices=EST_ANNUAL_INCOME,null=True)
    income_source = models.CharField(_("income source"),default='1', max_length=1, blank=True, choices=EMPLOYMENT_STATUS_CHOICES,null=True)
    expected_deposit = models.CharField(_("expected deposit"),default='1', max_length=1, blank=True, choices=EMPLOYMENT_STATUS_CHOICES,null=True)
    trading_experience = models.CharField(_("trading experience"),default='1', max_length=1, blank=True, choices=TRADING_EXPERIENCE,null=True)
    trading_period = models.CharField(_("trading period"),default='1', max_length=1, blank=True, choices=TRADING_PERIOD,null=True)



    # is_ib = models.BooleanField(default=False)

    # ib_code = models.CharField(max_length=6, blank=True,null=True)
    # ib_website = models.CharField(max_length=128, blank=True, null=True, default='')

    referral_code = models.CharField(max_length=36, blank=True,null=True)
    referral_website = models.URLField(max_length=128, blank=True, null=True, default='')

    user_status = models.CharField(default='1', max_length=2, blank=True, choices=USER_STATUS_CHOICE)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    USER_CREATE_PASSWORD_RETYPE = True
    REQUIRED_FIELDS = ['resident_country','first_name','last_name','password','is_admin']

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
    fxuser = models.ForeignKey(FxUser, on_delete=models.CASCADE)
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
        return self.fxuser
    
    class Meta:
        ordering = ['created_at']


class UserInvoices(models.Model):
    fxuser = models.ForeignKey(FxUser, on_delete=models.CASCADE)
    name = models.CharField(_("Name"), max_length=256, blank=True, default='')
    email = models.EmailField(_("Email"), max_length=512, blank=True, default='')
    mobile = models.CharField(_("Mobile"), max_length=50, blank=True, default='')
    address1 = models.CharField(_("Address 1"), max_length=128, blank=True, default='')
    address2 = models.CharField(_("Address 2"), max_length=128, blank=True, default='')
    address3 = models.CharField(_("Address 3"), max_length=128, blank=True, default='')
    address4 = models.CharField(_("Address 4"), max_length=128, blank=True, default='')
    invoice_no = models.CharField(blank=True, max_length=36, null=True)
    invoice_date = models.DateField(auto_now_add=True)
    item_code = models.CharField(_("Item Code"), max_length=128, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.invoice_no

    def save(self, *args, **kwargs):
        import uuid
        if not self.pk:
            self.invoice_no = str(uuid.uuid4()).replace('-', '')[:16]
        super(UserInvoices, self).save(args, kwargs)





# IN i_company_idx	int ,
#  IN i_parent_idx   int,
#  IN i_login int,
#  IN i_name varchar(33),
# IN i_point int,
# IN i_live_yn  char(1),
# IN i_email varchar(33),
# IN i_password varchar(33),
# IN i_send_report char(1)
class IntroducingBroker(models.Model):
    fxuser = models.ForeignKey(FxUser, on_delete=models.CASCADE)
    company_idx = models.IntegerField(default = 8, blank=True, null=True)
    #자신의 referral code 가져오기 
    parent_idx = models.IntegerField(default = 0, blank=True, null=True)
    ib_code = models.IntegerField(blank=True, null=True)
    ib_name = models.CharField(blank=True, max_length=36)
    point = models.IntegerField(blank=True)
    live_yn = models.CharField(blank=True, max_length=1, null=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=240, null=True)
    send_report = models.CharField(blank=True, max_length=1, null=True)
    back_index = models.IntegerField(blank=True, null=True)
    refrralurl = models.URLField(blank=True, null=True)