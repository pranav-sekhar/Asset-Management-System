from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . models import Asset,Inventory,AssetAssignment,RepairTicket
from django.contrib.auth.models import User

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
    emp_name = serializers.CharField(source = 'employee.username', read_only = True)
    asset_name = serializers.CharField(source = 'asset.name', read_only = True)
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

#for adding new emp by admin
class EmployeeSerializer(serializers.ModelSerializer):
    empid = serializers.CharField(write_only = True)
    class Meta:
        model = User
        fields = ['username','password','empid']
        extra_kwargs = {'password':{'write_only':True}}

    def create(self,validated_data):
        password = validated_data.pop('password')
        empid = validated_data.pop('empid')
        user = User(username = validated_data['username'], is_staff = False)
        user.set_password(password)
        user.save()
        return user
    