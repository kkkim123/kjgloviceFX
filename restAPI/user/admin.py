from django.contrib import admin
#from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from datetime import timezone, datetime
#from .forms import UserChangeForm
from .models import FxUser,FxUserDocument,IntroducingBroker
from django.db import connections
# from django.http import HttpResponse,HttpResponseRedirect
# from django.urls import path
# from django.template.response import TemplateResponse
class IBAdmin(admin.ModelAdmin):
    actions = ['addIBtoBackoffice','updateIBtoBackoffice','moveIBtoBackoffice']
    list_display = ('fxuser', 'company_idx', 'parent_idx', 'back_index','ib_code','ib_name',
    'point', 'live_yn', 'email', 'send_report','referralurl','status')
    # list_filter = ('is_admin',)
    list_editable = ('company_idx','parent_idx','ib_code','ib_name','point','live_yn','send_report','back_index','status')
    search_fields = ('ib_code',)
    # ordering = ('email',)
    # filter_horizontal = ()

    def addIBtoBackoffice(self, request, queryset):
        if queryset.count() != 1:
            self.message_user(request, 'Let\'s do it slowly one by one')
            return
        cursor =  connections['backOffice'].cursor()

<<<<<<< Updated upstream
        ibs = queryset.values_list('company_idx', 'parent_idx','ib_code','ib_name','point', 'live_yn', 'email', 'send_report')

=======
        ibs = queryset.values_list('company_idx', 'parent_idx', 'ib_code','ib_name'
                                           ,'point', 'live_yn', 'email', 'password','send_report','back_index')
        if(ibs.count < 1) :
            self.message_user(request, 'not found')
            return
>>>>>>> Stashed changes
        for ib in ibs:
            print(ib[2])
            cursor.callproc("SP_IB_CHECKING_ID", (ib[2],))
            #columns = [col[0] for col in cursor.description]
            for row in cursor.fetchall():
                print(row[0])
                if row[0] == 'SUCCESS':
                    cursor.nextset()
                    cursor.callproc("SP_IB_STRUCTURE_ADD", (ib[0],ib[1],ib[2],ib[3],ib[4],ib[5],ib[6],"",ib[7]))
                    cursor.nextset()
                    cursor.execute("select IDX from IB_STRUCTURE where IB_LOGIN = '" + str(ib[2]) +"';")
                    #print(cursor.description)
                    
                    for row in cursor.fetchall():
                        queryset.update(back_index=row[0])
                        queryset.update(referralurl="127.0.0.1:8000/user?refcode = "+ str(ib[2]))
                        #IB Code가 정상적으로 생성되면 유저정보의 계
                    self.message_user(request, 'SP_IB_STRUCTURE_ADD {}'.format(cursor.fetchall()))
                else :
                    cursor.nextset()
                    cursor.execute("select MAX(IB_LOGIN) from IB_STRUCTURE where COMPANY_IDX = '" + str(ib[0]) +"';")

                    for row in cursor.fetchall():
                        self.message_user(request, '[{}] recommended'.format(int(row[0]) + 1))
                        return
                    self.message_user(request, '{}'.format(row))
        #
    addIBtoBackoffice.short_description = "add IB to Backoffice"




	# IN i_idx	int ,
	# IN i_parent_idx int, 
    # IN i_login int,
    # IN i_name varchar(33),
	# IN i_point int,
	# IN i_email varchar(50),
	# IN i_send_report int,
	# IN i_new_pass varchar(50)

    def updateIBtoBackoffice(self, request, queryset):
        if queryset.count() != 1:
            self.message_user(request, 'Let\'s do it slowly one by one')
            return
        cursor =  connections['backOffice'].cursor()

        ibs = queryset.values_list('back_index', 'parent_idx', 'ib_code','ib_name'
                                    ,'point', 'email', 'send_report','password')
        if(ibs.count < 1) :
            self.message_user(request, 'not found')
            return
        for ib in ibs:
            cursor.callproc("SP_IB_STRUCTURE_EDIT", (ib[0],ib[1],ib[2],ib[3],ib[4],ib[5],1 if ib[6] == 'Y' else 0,ib[7]))           
            self.message_user(request, 'SP_IB_STRUCTURE_EDIT {}'.format(cursor.fetchall()))

        
    updateIBtoBackoffice.short_description = "update IB to Backoffice"

    def moveIBtoBackoffice(self, request, queryset):
        if queryset.count() != 1:
            self.message_user(request, 'Let\'s do it slowly one by one')
            return
        cursor =  connections['backOffice'].cursor()

        ibs = queryset.values_list('back_index')
        if(ibs.count < 1) :
            self.message_user(request, 'back_index is not found')
            return
        cursor.callproc("SP_IB_STRUCTURE_GET_ITEM", (ibs[0]))
        #print(cursor.fetchall())
        old_parent_idx = 0
        for row in cursor.fetchall():
            old_parent_idx = row[2]
<<<<<<< Updated upstream
        ibs = queryset.values_list('back_index', 'parent_idx','ib_code')

=======
        
        ibs = queryset.values_list('back_index', 'parent_idx')
        # if(ibs.count < 1) :
        #     self.message_user(request, 'back_index is not found')
        #     return
>>>>>>> Stashed changes
        for ib in ibs:
            cursor.nextset()
            cursor.callproc("SP_IB_STRUCTURE_MOVE", (ib[0],ib[1],old_parent_idx))    
            cursor.nextset()
            cursor.execute("select IDX from IB_STRUCTURE where IB_LOGIN = '" + str(ib[2]) +"';")

            for row in cursor.fetchall():
                queryset.update(back_index=row[0])

            self.message_user(request, 'SP_IB_STRUCTURE_MOVE {}'.format(cursor.fetchall()))

    moveIBtoBackoffice.short_description = "move IB to Backoffice"

admin.site.register(IntroducingBroker, IBAdmin)

class UserAdmin( admin.ModelAdmin):
    list_display = ('id','email', 'first_name', 'last_name', 'user_type','user_status','referral_code')
    list_filter = ('is_admin',)
    list_editable = ('user_status','referral_code')
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()	

admin.site.register(FxUser, UserAdmin)

class DocumentAdmin( admin.ModelAdmin):
    list_display = ('fxuser', 'doc_photo_id', 'doc_photo_id_status' , 'doc_proof_of_residence', 'doc_proof_of_residence_status' 
    ,'doc_photo_id_2', 'doc_photo_id_2_status' ,'doc_proof_of_residence_2', 'doc_proof_of_residence_2_status','created_at')

    list_editable = ('doc_photo_id_status','doc_proof_of_residence_status','doc_photo_id_2_status','doc_proof_of_residence_2_status')
    list_filter = ['created_at']
    #actions = ['levelUpUser']
    def save_model(self, request, obj, form, change):
        fxuser = FxUser.objects.get(id = obj.fxuser_id)
        if(obj.doc_photo_id_status =='A'
        and obj.doc_proof_of_residence_status =='A'
        and obj.doc_photo_id_2_status =='A'
        and obj.doc_proof_of_residence_2_status =='A'
        and 6 > int(fxuser.user_status)):
            fxuser.user_status = '6'     
            fxuser.save()    
        else :
            fxuser.user_status = '5'     
            fxuser.save()       
        
        super().save_model(request, obj, form, change)
admin.site.register(FxUserDocument, DocumentAdmin)
