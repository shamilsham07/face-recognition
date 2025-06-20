from .import views
from django.urls import path

from django.urls import path,include

urlpatterns = [
   
    path("register",views.register),
    path("CheckingAttendence",views.CheckingAttendence),
    path("markAttendence",views.markAttendence),
    path("checkattendence",views.checkattendence),
    path("gettotalrequest",views.gettotalrequest), 
    path("getpendingrequest",views.getpendingrequest),  
    path("confirmregister",views.confirmregister),   
     
      
    
               
    

]