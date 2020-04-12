from rest_framework.permissions import BasePermission,SAFE_METHODS

class IsOwnerProfileOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.id==request


class IsOwnerOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            print('[IsOwnerOnly]')
            print('request.user.id:',request.user.id)
            print('obj.id:',obj.id)
            return obj.id == request.user.id
        else:
            return False

class IsFKOwnerOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            print('[IsOwnerOnly]')
            print('request.user.id:',request.user.id)
            print('obj.fxuser_id:',obj.fxuser_id)
            return obj.fxuser_id == request.user.id
        else:
            return False