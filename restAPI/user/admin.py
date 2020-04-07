 
from django.contrib import admin
#from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from datetime import timezone, datetime
from .forms import UserChangeForm
from .models import FxUser,FxUserDocument,IntroducingBroker
from django.db import connections
# from django.http import HttpResponse,HttpResponseRedirect
# from django.urls import path
# from django.template.response import TemplateResponse
class IBAdmin(admin.ModelAdmin):
    # fxuser = models.ForeignKey(FxUser, on_delete=models.CASCADE)
    # company_idx = models.IntegerField(blank=True)
    # parent_idx = models.IntegerField(blank=True)
    # ib_code = models.IntegerField(blank=True)
    # ib_name = models.CharField(blank=True, max_length=36)
    # point = models.IntegerField(blank=True)
    # live_yn = models.CharField(blank=True, max_length=1)
    # email = models.EmailField(unique=True)
    # password = models.CharField(max_length=240)
    # send_report = models.CharField(blank=True, max_length=1)
    actions = ['addIBtoBackoffice',]
    list_display = ('fxuser', 'company_idx', 'parent_idx', 'ib_code','ib_name',
    'point', 'live_yn', 'email', 'password','send_report','back_index','referralurl')
    # list_filter = ('is_admin',)
    list_editable = ('company_idx','parent_idx','ib_code','ib_name','point','live_yn','send_report','back_index',)
    # search_fields = ('email',)
    # ordering = ('email',)
    # filter_horizontal = ()

    def addIBtoBackoffice(self, request, queryset):
        if queryset.count() != 1:
            self.message_user(request, 'Let\'s do it slowly one by one')
            return
        cursor =  connections['backOffice'].cursor()
        #selected = queryset.values('company_idx', 'parent_idx', 'ib_code','ib_name'
         #                                   ,'point', 'live_yn', 'email', 'password','send_report')

        ibs = queryset.values_list('company_idx', 'parent_idx', 'ib_code','ib_name'
                                           ,'point', 'live_yn', 'email', 'password','send_report','back_index')
        #print(type(selected))

        for ib in ibs:
            print(ib[2])
            cursor.callproc("SP_IB_CHECKING_ID", (ib[2],))
            #columns = [col[0] for col in cursor.description]
            for row in cursor.fetchall():
                print(row[0])
                if row[0] == 'SUCCESS':
                    cursor.nextset()
                    cursor.callproc("SP_IB_STRUCTURE_ADD", (ib[0],ib[1],ib[2],ib[3],ib[4],ib[5],ib[6],ib[7],ib[8]))
                    cursor.nextset()
                    cursor.execute("select IDX from IB_STRUCTURE where IB_LOGIN = '" + str(ib[2]) +"';")
                    #print(cursor.description)
                    
                    for row in cursor.fetchall():
                        queryset.update(back_index=row[0])
                        queryset.update(referralurl="127.0.0.1:8000/user?refcode = "+ str(ib[2]))
                        #IB Code가 정상적으로 생성되면 유저정보의 계
                    self.message_user(request, 'SP_IB_STRUCTURE_ADD {}'.format(cursor.fetchall()))
                else :
                    self.message_user(request, '{}'.format(row))
        #
    addIBtoBackoffice.short_description = "add IB to Backoffice"

    # def chk_IBcode(self, request, queryset):
    #     cursor =  connections['backOffice'].cursor()
    #     cursor.callproc("SP_IB_CHECKING_ID", ('1'))
    #     print(cursor.description)
    # applayforIB.short_description = "check IB code in Backoffice"
admin.site.register(IntroducingBroker, IBAdmin)

class UserAdmin( admin.ModelAdmin):
    #form = UserChangeForm
    #actions = ['applayforIB']
    list_display = ('id','email', 'first_name', 'user_type', 'user_type','user_status')
    list_filter = ('is_admin',)
    list_editable = ('user_status',)
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()	

admin.site.register(FxUser, UserAdmin)

class DocumentAdmin( admin.ModelAdmin):
    # fieldsets = [
    #     (None,                  {'fields':['file_origin_name']}),
    #     ('Date information' ,   {'fields':['file_path']})
    # ]
    
    list_display = ('fxuser', 'doc_photo_id', 'doc_photo_id_status' , 'doc_proof_of_residence', 'doc_proof_of_residence_status' 
    ,'doc_photo_id_2', 'doc_photo_id_2_status' ,'doc_proof_of_residence_2', 'doc_proof_of_residence_2_status','created_at')

    # def was_published_recently(self):
    #     return self.create_date >= timezone.now() - datetime.timedelta(days=1)
    
    # was_published_recently.admin_order_field = 'create_date'
    # was_published_recently.boolean = True
    # was_published_recently.short_description = '  '
    list_editable = ('doc_photo_id_status','doc_proof_of_residence_status','doc_photo_id_2_status','doc_proof_of_residence_2_status')
    list_filter = ['created_at']
    
    # search_fields = ['file_origin_name']
    # def __str__ (self): 
    #     return str(self.fxuser)

admin.site.register(FxUserDocument, DocumentAdmin)
