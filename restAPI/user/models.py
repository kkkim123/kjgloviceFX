from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
#from pygments.lexers import get_all_lexers
#from pygments.styles import get_all_styles
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight

#from django_countries.fields import CountryField

# LEXERS = [item for item in get_all_lexers() if item[1]]
# LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
# STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])


USER_TYPES = (
    ('', 'Please Choose...'),
    ('R', 'Retail'),
    ('C', 'Corporate'),
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

TRADING_EXPERIENCE = (
    ('', 'Please Choose...'),
    ('1', '0'),
    ('2', '1-3'),
    ('3', '4-7'),
    ('4', '8+'),
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
    ('3', 'PENDING DOCUMENTS'),
    ('4', 'CONFIRMED DOCUMENTS'),
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
        user.save()
        return user

#     def create_superuser(self, email, password):
#         """
#         Creates and saves a superuser with the given email and password.
#         """
#         user = self.create_user(
#             email,
#             password=password,
#         )
#         user.staff = True
#         user.admin = True
#         user.save(using=self._db)
#         return user
    # def create_superuser(self, email, password, **extra_fields):
    #     """
    #     Create and save a SuperUser with the given email and password.
    #     """
    #     extra_fields.setdefault('is_staff', True)
    #     extra_fields.setdefault('is_superuser', True)
    #     extra_fields.setdefault('is_active', True)

    #     if extra_fields.get('is_staff') is not True:
    #         raise ValueError(_('Superuser must have is_staff=True.'))
    #     if extra_fields.get('is_superuser') is not True:
    #         raise ValueError(_('Superuser must have is_superuser=True.'))
    #     return self.create_user(email, password, **extra_fields)
class FxUser(AbstractBaseUser):

    #username = models.EmailField(primary_key=True,unique=True)
    resident_country = models.CharField(max_length=240)
    first_name  = models.CharField(max_length=240)
    last_name  = models.CharField(max_length=240)
    email = models.EmailField(primary_key=True,unique=True)
    password = models.CharField(max_length=240)
    user_type = models.CharField(default='R', max_length=1, blank=True, choices=USER_TYPES)
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(auto_now_add=False, auto_now=True)

    #residential address
    address = models.CharField(max_length=128, blank=True)
    postal_code = models.CharField(max_length=36, blank=True)
    city = models.CharField(max_length=36, blank=True)

    #personal detail
    Nationality = models.CharField(max_length=128, blank=True)
    birthday = models.DateTimeField(blank=True, null=True)
    mobile = models.CharField(max_length=24, blank=True)

    #USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['resident_country','first_name','last_name','password'
    ,'address','postal_code','city'
    ,'Nationality','birthday','mobile']

    objects = FxUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"



# class User(models.Model): CountryField()
#     name = models.CharField("Name", max_length=240)
#     email = models.EmailField()
#     document = models.CharField("Document", max_length=20)
#     phone = models.CharField(max_length=20)
#     registrationDate = models.DateField("Registration Date", auto_now_add=True)

#     def __str__(self):
#         return self.name


# class Friend(models.Model):
#     name = models.CharField(max_length=100)

# class Belonging(models.Model):
#     name = models.CharField(max_length=100)

# class Borrowed(models.Model):
#     what = models.ForeignKey(Belonging, on_delete=models.CASCADE)
#     to_who = models.ForeignKey(Friend, on_delete=models.CASCADE)
#     when = models.DateTimeField(auto_now_add=True)
#     returned = models.DateTimeField(null=True, blank=True)

# class OwnedModel(models.Model):
#     owner = models.ForeignKey(settings.AUTH_USER_MODEL,
#     on_delete=models.CASCADE)

#     class Meta:
#         abstract = True

# class Belonging(OwnedModel):
#     name = models.CharField(max_length=100)