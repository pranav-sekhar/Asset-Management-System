from django.db import models
from django.contrib.auth.models import User

#track assets like laptops,monitors etc
class Asset(models.Model):
    name = models.CharField(max_length=100)
    asset_type = models.CharField(max_length=50)
    serial_no = models.CharField(max_length=50,unique=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('Available','Available'),('Assigned','Assigned'),('Repair','Repair')
        ],
        default='Available'
    )
    def __str__(self):
        return self.name
    
#track quantity of items
class Inventory(models.Model):
    item = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    def __str__(self):
        return self.item

#track assets assigned
class AssetAssignment(models.Model):
    employee = models.ForeignKey(User,on_delete=models.CASCADE)
    asset = models.ForeignKey(Asset,on_delete=models.CASCADE)
    assigned_date = models.DateField(auto_now_add=True)
    returned_date = models.DateField(null=True,blank=True)
    def __str__(self):
        return f"{self.employee.username} - {self.asset.name}" 
    
#track ticket status for repair
class RepairTicket(models.Model):
    asset = models.ForeignKey(Asset,on_delete=models.CASCADE)
    descrip = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=[
            ('Reported','Reported'),('In Progress','In Progress'),('Resolved','Resolved')
        ],
        default='Reported'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.asset.name
