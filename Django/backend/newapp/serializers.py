from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . models import Asset,Inventory,AssetAssignment,RepairTicket

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

class AssetAssignmentSerializer(serializers.ModelSerializer):
    #for assigning asset to an employee with emp name and asset name
    emp_name = serializers.CharField(
        source = 'employee.username', read_only = True
    )
    asset_name = serializers.CharField(
        source = 'asset.name', read_only = True
    )
    class Meta:
        model = AssetAssignment
        fields = '__all__'

class RepairTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepairTicket
        fields = '__all__'
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)
        #add custom fields
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        return token
