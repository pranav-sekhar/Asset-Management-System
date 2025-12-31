from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import(
    AssetViewSet,InventoryViewSet,AssetAssignmentViewSet,RepairTicketViewSet,dashboard_analytics
)

router = DefaultRouter()
router.register('assets',AssetViewSet)
router.register('inventory',InventoryViewSet)
router.register('assignments',AssetAssignmentViewSet)
router.register('repairs',RepairTicketViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('dashboard/',dashboard_analytics)
] 