from rest_framework.permissions import BasePermission,SAFE_METHODS

class IsOwnerProfileOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.id==request


class IsOwnerOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            print(request.user.id)
            print(obj.user_id )
            return obj.user_id == request.user.id
        else:
            return False

class IsFKOwnerOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            print('[IsFKOwnerOnly]')
            print('request.user.id:',request.user.id)
            print('obj.user_id:',obj.user_id)
            return obj.user_id == request.user.id
        else:
            return False