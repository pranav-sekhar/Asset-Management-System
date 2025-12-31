from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Asset,Inventory,AssetAssignment,RepairTicket
from .serializers import (
    AssetSerializer,InventorySerializer,AssetAssignmentSerializer,RepairTicketSerializer
)
    
class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    #search feature
    filter_backends = [SearchFilter,DjangoFilterBackend] #SearchFilter for search feature,DjangoFilterBackend for filter feature
    search_fields = ['name','asset_type','serial_no']
    #filter feature
    filterset_fields = ['status']

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

class AssetAssignmentViewSet(viewsets.ModelViewSet):
    queryset = AssetAssignment.objects.all()
    serializer_class = AssetAssignmentSerializer

class RepairTicketViewSet(viewsets.ModelViewSet):
    queryset = RepairTicket.objects.all()
    serializer_class = RepairTicketSerializer

#for dashboard asset counts since pagination is involved,otherwise no need
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_analytics(request):
    tot_assets = Asset.objects.count()
    assigned_assets = Asset.objects.filter(status='Assigned').count()
    available_assets = Asset.objects.filter(status='Available').count()
    open_tkts = RepairTicket.objects.exclude(status='Resolved').count()
    return Response({
        "tot_assets":tot_assets,"assigned_assets":assigned_assets,"available_assets":available_assets,"open_tkts":open_tkts
    })