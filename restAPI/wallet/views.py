from .models import Wallet
from .serializers import WalletSerializer
from .permissions import IsOwnerOnly

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permission_classes = [IsOwnerOnly, IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        permission_classes = [IsOwnerOnly, IsAuthenticated]

        wallet = Wallet.objects.get(id=kwargs['pk'])
        serializer = WalletSerializer(wallet)
        print(wallet.kj_balance)

        return Response(serializer.data)

UserProfile = WalletViewSet.as_view({
    'get': 'retrieve',
})
