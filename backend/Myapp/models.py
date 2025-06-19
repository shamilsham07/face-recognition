from django.db import models

# Create your models here.



class Registrations(models.Model):
    first_name=models.CharField(max_length=250,blank=True,null=True)
    imagefield=models.ImageField(upload_to="images/",blank=True,null=True)
    Last_name=models.CharField(max_length=250,blank=True,null=True)
    email=models.EmailField(max_length=191, unique=True, blank=True, null=True)
    phonenumber=models.TextField(blank=True,null=True)
    accept=models.BooleanField(default=False) 

class Attendencemark(models.Model):
    user=models.ForeignKey(Registrations,on_delete=models.CASCADE)
    date=models.DateField()
    join_time=models.DateField()
    leave_time=models.DateField()
  