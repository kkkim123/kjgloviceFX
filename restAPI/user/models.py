from django.db import models
from django.contrib.auth.models import AbstractUser
#from pygments.lexers import get_all_lexers
#from pygments.styles import get_all_styles
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight

from django_countries.fields import CountryField

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

# owner = models.ForeignKey('auth.User', related_name='users', on_delete=models.CASCADE)
# highlighted = models.TextField()

# def save(self, *args, **kwargs):
#     """
#     Use the `pygments` library to create a highlighted HTML
#     representation of the code snippet.
#     """
#     lexer = get_lexer_by_name(self.language)
#     linenos = 'table' if self.linenos else False
#     options = {'title': self.title} if self.title else {}
#     formatter = HtmlFormatter(style=self.style, linenos=linenos,
#                               full=True, **options)
#     self.highlighted = highlight(self.code, lexer, formatter)
#     super(User, self).save(*args, **kwargs)

class User(AbstractUser):
    #country = CountryField()
    #resident_country = CountryField()
    created = models.DateTimeField(auto_now_add=True)
    first_name  = models.CharField(max_length=240)
    last_name  = models.CharField(max_length=240)
    email = models.EmailField(primary_key=True,unique=True)
    password = models.CharField(max_length=240)
    user_type = models.CharField(default='R', max_length=1, blank=True, choices=USER_TYPES)
    #username = models.CharField(max_length=240,unique=False)
    #REQUIRED_FIELDS = ['email', ]
    class Meta:
        ordering = ['created']

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