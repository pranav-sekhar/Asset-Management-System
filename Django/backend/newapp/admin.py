from django.contrib import admin

from .models import Asset,Inventory,AssetAssignment,RepairTicket
@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('name','asset_type','serial_no','status')  #displays these fields as columns
    list_filter = ('status','asset_type')  #filter option to filter assets by status and assettype 
    search_fields = ('name','serial_no')  #search box to search for name,serial no of assets

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('item','quantity')
    search_fields = ('item',)

@admin.register(AssetAssignment)
class AssetAssignmentAdmin(admin.ModelAdmin):
    list_display = ('employee','asset','assigned_date','returned_date')
    list_filter = ('assigned_date',)

@admin.register(RepairTicket)
class RepairTicketAdmin(admin.ModelAdmin):
    list_display = ('asset','status','created_at')
    list_filter = ('status',)

#superuser name : admin, pass: user@123
#Employee1: John, pass: employee@1