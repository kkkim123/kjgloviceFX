from rest_framework.permissions import BasePermission,SAFE_METHODS

class IsOwnerProfileOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.id==request


class IsOwnerOnly(BasePermission):
    # 작성자만 접근
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            print(request.user.id)
            print(obj.id)
            return obj.id == request.user.id
            # True
            # if hasattr(obj, 'profile'):
            #     return obj.profile.id == request.user.id
            # if request.user. == '10':
            #     return True
            # elif hasattr(obj, 'profile'):
            #     return obj.profile.id == request.user.id
            # elif obj.__class__ == get_user_model():
            #     return obj.id == request.user.id
            #return False
        else:
            return False