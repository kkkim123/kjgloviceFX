from django.contrib.admin.apps import AdminConfig

class BaseAdminConfig(AdminConfig):
    default_site = 'restAPI.admin.BaseAdminSite'