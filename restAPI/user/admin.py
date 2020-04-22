
import json
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from datetime import timezone, datetime
from .models import FxUser,FxUserDocument,IntroducingBroker,ApplyIntroducingBroker
from django.db import connections
from django.utils.html import format_html
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Count
from django.db.models.functions import TruncDay
from django.contrib.admin.utils import unquote, quote
from django_mptt_admin.admin import DjangoMpttAdmin
from django.http import JsonResponse
from copy import deepcopy
import requests

class IBFilter(admin.SimpleListFilter):
    title = 'ib_code'
    parameter_name = 'IntroducingBroker'
    def lookups(self, request, model_admin):
        continents = IntroducingBroker.objects.filter(level=1).order_by('ib_code')

        return [(c.ib_code, c.ib_code) for c in continents]

    def queryset(self, request, queryset):
        value = self.value()

        if not value:
            return queryset
        else:
            continent = IntroducingBroker.objects.get(name=value, level=1)

            return continent.get_descendants(include_self=True)

class IBAdmin(DjangoMpttAdmin):
    tree_auto_open = 0
    # actions = ['updateIBtoBackoffice','moveIBtoBackoffice',]
    list_display = ('id', 'fxuser', 'company_idx', 'ib_code','ib_name','point',
    'live_yn', 'email', 'send_report', 'referralurl','ib_website','status')
    #list_filter = ('status',)
    #list_filter = (IBFilter,)
    list_editable = ('company_idx','ib_code','ib_name','point','live_yn','send_report','status')
    search_fields = ('fxuser','ib_code',)
    # ordering = ('email',)
    # filter_horizontal = ()

    def move_view(self, request, object_id):
        request.current_app = self.admin_site.name
        instance = self.get_object(request, unquote(object_id))


        target_id = request.POST['target_id']
        position = request.POST['position']
        target_instance = self.get_object(request, target_id)

        self.do_move(instance, position, target_instance)

        return JsonResponse(
            dict(success=True)
        )
    def do_move(self, instance, position, target_instance):
        print('do_move')
        if position == 'before':
            print('before')
            instance.move_to(target_instance, 'left')
        elif position == 'after':
            print('after')
            instance.move_to(target_instance, 'right')
        elif position == 'inside':
            print('inside')
            instance.move_to(target_instance)
        else:
            raise Exception('Unknown position')
        #print(str(instance.id))
        cursor =  connections['backOffice'].cursor()
        cursor.callproc("SP_IB_STRUCTURE_GET_ITEM", (instance.id,))
        #print(instance.parent_id)

        old_parent_idx = 0
        for row in cursor.fetchall():
            old_parent_idx = row[2]
      
        if(old_parent_idx == 0):
            return
        # print(old_parent_idx)
        # print(instance.parent_id)
        cursor.nextset()
        cursor.callproc("SP_IB_STRUCTURE_MOVE", (instance.id,instance.parent_id,old_parent_idx))    
        cursor.nextset()
        cursor.execute("select IDX from IB_STRUCTURE where IB_LOGIN = '" + str(instance.ib_code) +"';")

        for row in cursor.fetchall():
            old_ib = deepcopy(instance)
            instance.delete()

            ib = IntroducingBroker.objects.create(
                id = row[0], 
                fxuser = old_ib.fxuser, 
                company_idx = old_ib.company_idx, 
                ib_code = old_ib.ib_code, 
                ib_name = old_ib.ib_name, 
                point = old_ib.point, 
                live_yn = old_ib.live_yn, 
                email = old_ib.email, 
                send_report = old_ib.send_report, 
                referralurl = old_ib.referralurl,
                ib_website = old_ib.ib_website,
                status = old_ib.status,
                parent_id = old_ib.parent_id
            )

        if self.trigger_save_after_move:
            instance.save()







    # def fxuser_colored(self, obj):
    #     if obj.status == 'P':
    #         color_code = '00FF00'
    #     else:
    #         color_code = 'FF0000'
    #     html = '<span style="color: #{};">{}</span>'.format(color_code, obj.fxuser)
    #     return format_html(html)
    # fxuser_colored.admin_order_field = 'fxuser'
    # fxuser_colored.short_description = 'fxuser'

    # def custom_referralurl(self, obj):
    #     return format_html('<a  href="{0}" >{0}</a>&nbsp;',
    #         obj.referralurl
    #     )
    # #custom_referralurl.short_description = 'Github Profile'
    # custom_referralurl.allow_tags = True
    # def get_form(self, request, obj=None, **kwargs):
    #     form = super(IBAdmin, self).get_form(request, obj, **kwargs)
    #     form.base_fields['live_yn'].widget.attrs['style'] = 'width: 10em;'
    #     return form




    # def delete(self, obj):
    #     view_name = "admin:{}_{}_delete".format(obj._meta.app_label, obj._meta.model_name)
    #     link = reverse(view_name, args=[IntroducingBroker.pk])
    #     html = '<input type="button" onclick="location.href=\'{}\'" value="Delete" />'.format(link)
    #     return format_html(html)
    
    def updateIBtoBackoffice(self, request, queryset):
        if queryset.count() != 1:
            self.message_user(request, 'Let\'s do it slowly one by one')
            return
        cursor =  connections['backOffice'].cursor()

        ibs = queryset.values_list('back_index', 'parent_idx', 'ib_code','ib_name'
                                    ,'point', 'email', 'send_report')
        # if(ibs.count < 1) :
        #     self.message_user(request, 'not found')
        #     return
        for ib in ibs:
        #i_idx	int ,i_parent_idx int, i_login int,i_name varchar(33),i_point int,i_email varchar(50),i_send_report int,i_new_pass varchar(50)
            cursor.callproc("SP_IB_STRUCTURE_EDIT", (ib[0],ib[1],ib[2],ib[3],ib[4],ib[5],1 if ib[6] == 'Y' else 0,''))           
            self.message_user(request, 'SP_IB_STRUCTURE_EDIT {}'.format(cursor.fetchall()))     
    updateIBtoBackoffice.short_description = "update IB to Backoffice"

admin.site.register(IntroducingBroker, IBAdmin)


class ApplyIBAdmin(admin.ModelAdmin):
    actions = ['addIBtoBackoffice',]
    list_display = ('fxuser', 'company_idx', 'parent_idx', 'back_index','ib_code','ib_name',
    'point', 'live_yn', 'email', 'send_report','referralurl','status')
    list_filter = ('status',)
    list_editable = ('company_idx','parent_idx','ib_code','ib_name','point','live_yn','send_report','status')
    search_fields = ('fxuser','ib_code',)
    # ordering = ('email',)
    # filter_horizontal = ()

    def save_model(self, request, obj, form, change):
        fxuser = FxUser.objects.get(id = obj.fxuser_id)
        if(obj.status =='A'):
            fxuser.user_type = 'I'     
            fxuser.save()   
            ib = IntroducingBroker.objects.create(
                id = obj.back_index, 
                fxuser = obj.fxuser, 
                company_idx = obj.company_idx, 
                ib_code = obj.ib_code, 
                ib_name = obj.ib_name, 
                point = obj.point, 
                live_yn = obj.live_yn, 
                email = obj.email, 
                send_report = obj.send_report, 
                referralurl = obj.referralurl,
                ib_website = obj.ib_website,
                status = obj.status,
                parent_id = obj.parent_idx
            )
        else :
            fxuser.user_type = 'R'     
            fxuser.save()       
        
        super().save_model(request, obj, form, change)

    def addIBtoBackoffice(self, request, queryset):
        if queryset.count() != 1:
            self.message_user(request, 'Let\'s do it slowly one by one')
            return
        cursor =  connections['backOffice'].cursor()

        ibs = queryset.values_list('company_idx', 'parent_idx', 'ib_code','ib_name','point', 'live_yn', 'email','send_report')
        # if(ibs.count < 1) :
        #     self.message_user(request, 'not found')
        #     return

        for ib in ibs:
            print(ib[2])
            cursor.callproc("SP_IB_CHECKING_ID", (ib[2],))
            #columns = [col[0] for col in cursor.description]
            for row in cursor.fetchall():
                print(row[0])
                if row[0] == 'SUCCESS':
                    cursor.nextset()
                    cursor.callproc("SP_IB_STRUCTURE_ADD", (ib[0],ib[1],ib[2],ib[3],ib[4],ib[5],ib[6],'',ib[7]))
                    cursor.nextset()
                    cursor.execute("select IDX from IB_STRUCTURE where IB_LOGIN = '" + str(ib[2]) +"';")
                    #print(cursor.description)
                    
                    for row in cursor.fetchall():
                        queryset.update(back_index=row[0])
                        queryset.update(referralurl="glovicefx.com/user?refcode = "+ str(ib[2]))
                        # queryset.update(referralurl="127.0.0.1:8000/user?refcode = "+ str(ib[2]))
                        #IB Code가 정상적으로 생성되면 유저정보의 계
                    self.message_user(request, 'SP_IB_STRUCTURE_ADD {}'.format(cursor.fetchall()))
                else :
                    cursor.nextset()
                    cursor.execute("select MAX(IB_LOGIN) from IB_STRUCTURE where COMPANY_IDX = '" + str(ib[0]) +"';")

                    for row in cursor.fetchall():
                        self.message_user(request, '[{}] recommended'.format(int(row[0]) + 1))
                        return
                    self.message_user(request, '{}'.format(row))
        
    addIBtoBackoffice.short_description = "add IB to Backoffice"

admin.site.register(ApplyIntroducingBroker, ApplyIBAdmin)






class UserAdmin(admin.ModelAdmin):
    list_display = ('id','email', 'first_name', 'last_name', 'user_type','kj_address','referral_code','user_status')
    list_filter = ('is_admin',)
    list_editable = ('user_status','referral_code')
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()	
    def changelist_view(self, request, extra_context=None):

        # Aggregate new subscribers per day
        chart_data = (
            FxUser.objects.annotate(date=TruncDay("created_at"))
            .values("date")
            .annotate(y=Count("id"))
            .order_by("-date")
        )

        # Serialize and attach the chart data to the template context
        as_json = json.dumps(list(chart_data), cls=DjangoJSONEncoder)
        extra_context = extra_context or {"chart_data": as_json}

        # Call the superclass changelist_view to render the page
        return super().changelist_view(request, extra_context=extra_context)



    def save_model(self, request, obj, form, change):
        if(obj.user_status >= '6' and obj.kj_address == ''):
            URL = 'http://3.0.181.55:3000/kj/fx/getaddress/' + str(obj.id)
            response = requests.get(URL)
            jsresponse = response.json()
            print(jsresponse['address'])
            obj.kj_address = jsresponse['address']
        super().save_model(request, obj, form, change)        
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
