from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny 
import cv2
from django.contrib.auth import authenticate
import face_recognition
import numpy as np
from PIL import Image
import io
from .models import *
import base64
from deepface import DeepFace
import datetime



# Create your views here.



           
            
    
now = datetime.datetime.now()


@api_view(["POST"])
@permission_classes([AllowAny]) 
def register(request):
    try:
            print("hello")
            first_name=request.data.get("first_name")
            last_name=request.data.get("last_name")   
            phonenumber=request.data.get("phonenumber")  
            emailaddress=request.data.get("emailAddresss")
            image=request.FILES["image"]     
            print(image)         
            print("hiiii")      
            print("....................................")
           
            if image:
                if Registrations.objects.filter(email=emailaddress):             
                    return JsonResponse({"emailerror":"email already exist"})
                else:
                 Registrations.objects.create(
                    first_name=first_name,
                    Last_name=last_name,
                    imagefield=image,
                    phonenumber=phonenumber,
                    email=emailaddress
                 )
               
                 return JsonResponse ({"message":"good"})
            else:
                return JsonResponse({"notfoundimage":"very bad"})
          
            
    except Exception as e:
        print("e",e)
        return JsonResponse({"error":'somehting went wrong'})         
  
@api_view(["POST"])  
@permission_classes([AllowAny])  
def CheckingAttendence(request):
    try:
        image1=request.FILES['image']
        print(image1)  
        img1_pil = Image.open(image1).convert("RGB")
        img1_np = np.array(img1_pil)
        print(img1_np)
        try:
         faces = DeepFace.extract_faces(img1_np,enforce_detection=True)  
         print("face")
        except Exception as e:
         return JsonResponse({"no face":"something went wrong"})     
         
        print(".........",faces)                       
        print(image1)                 
        reg=Registrations.objects.all()
        for img in reg:
            print("hello")         
            image2=img.imagefield.path
            first_name=img.first_name
            last_name=img.Last_name
            print(image2)   
            result = DeepFace.verify(
            img1_path = img1_np,
            img2_path = image2,
            enforce_detection=True
                )
            print("...............................................................................")
            print(result["verified"])                    
            if result["verified"]:
                return JsonResponse({"result":f"hey {first_name} {last_name} , warm welcome you"})             
                                                
        return JsonResponse({"good":"very good"})
    except Exception as e:
        print(e)
        return JsonResponse({"bad":"something went wrong"})
   
                    
                    
    
@api_view(["POST"])  
@permission_classes([AllowAny])  
def markAttendence(request):  
    print("hi")              
    return JsonResponse({"good":"verygood"})


@api_view(["POST"])  
@permission_classes([AllowAny]) 
def checkattendence(request):
    try:
        data=request.FILES["image"]
        print(data)
        image_pil=Image.open(data).convert("RGB")
        image_np=np.array(image_pil)   
        print(image_np)
        try:
            face=DeepFace.extract_faces(image_np,enforce_detection=True)
            print(face)
        except Exception as e:
            return JsonResponse({"no_face":" there is no face"})
        reg=Registrations.objects.all()
        for img in reg:
            images=img.imagefield
            
            if images:
                stored_img_pil=Image.open(images).convert("RGB")
                stored_img_np=np.array(stored_img_pil)
                result=DeepFace.verify(
                    img1_path=image_np,
                    img2_path=stored_img_np,
                    enforce_detection=True
                )
                print(result)
                if result["verified"]:
                    first_name=img.first_name
                    last_name=img.Last_name
                    if img.accept:
                        print(datetime.datetime.now())
                        date=datetime.datetime.now()  
                        if Attendencemark.objects.filter(date=date,user=img).exists():         
                            return JsonResponse({"already":f"{first_name} {last_name}"})
                        else:
                            print(date.time())                  
                            Attendencemark.objects.create(date=date,user=img,join_time=date.time())     
                            return JsonResponse({"faceRecognise":f"{first_name} {last_name}"})                       
                            
                                                                                                                                         
                    else:
                        return JsonResponse({"contact":"please contact admin"})
                
        return JsonResponse({"good":"bad"})       
        
    except Exception as e:
        print(e)
        return JsonResponse({"something":"something went wrong"})
    
  
@api_view(["GET"])  
@permission_classes([AllowAny]) 
def gettotalrequest(request):
    try:
        print('...................................')
        count=Registrations.objects.filter(accept=False).count()
        print(count)        
        users=Registrations.objects.filter(accept=True)                
        details=[]
        
        for user in users:         
            if Attendencemark.objects.filter(user=user,date=datetime.datetime.now()).exists():   
                registered=Attendencemark.objects.filter(user=user)                       
                counts=Attendencemark.objects.filter(user=user,date=datetime.datetime.now())
                for register in counts:                
                    print("..............................................................")                     
                    time=register.join_time
                    l_time=register.leave_time.strftime("%I:%M %p")
                    formatted_time = time.strftime("%I:%M %p")                            
                    details.append({
                        "first_name":register.user.first_name,          
                        "last_name":register.user.Last_name,
                        "accept":register.user.accept,
                        "image":register.user.imagefield.url, 
                        "phonenumber":register.user.phonenumber,            
                        "email":register.user.email,
                        "report_time":formatted_time,                                            
                        "attendence":"present",  
                        "Leave_time":l_time,                                                                  
                    })  
            else:                                                 
                       details.append({
                        "first_name":user.first_name,          
                        "last_name":user.Last_name,
                        "accept":user.accept,
                        "image":user.imagefield.url, 
                        "phonenumber":user.phonenumber,            
                        "email":user.email,
                        "attendence":"absent",
                        "report_time":0,
                        "leave":0,                                                                     
                    })          
                                           
                                           
        return JsonResponse({"count":count,"details":details})
    except Exception as e:       
        print(e)                        
        return JsonResponse({"nothing":0})                    
    

@api_view(["GET"])  
@permission_classes([AllowAny]) 
def getpendingrequest(request):
    try:
        print("jey ")
        details=Registrations.objects.filter(accept=False)
        send=[]
        for detail in details:
            print(detail.id)
            send.append({
                "first_name":  detail.first_name,
                "last_name":detail.Last_name,
                "image":detail.imagefield.url,
                "phonenumber":detail.phonenumber,         
                "email":detail.email,
                "id":detail.id,
            })
        return JsonResponse({"details":send})
    except Exception as e:
        print(e)                                              
        return JsonResponse({"error":'something went wrong'})
    
    

@api_view(["POST"])  
@permission_classes([AllowAny]) 
def confirmregister(request):    
    data=request.data  
    id=data.get("id")            
    print(id)
    the_user=Registrations.objects.get(id=id)
    if the_user:
         the_user.accept=True
         the_user.save()
         send=[]
         details=Registrations.objects.filter(accept=False)  
         if details:
              for detail in details:
                  send.append({
                      "first_name":detail.first_name,
                       "last_name":detail.Last_name,
                       "image":detail.imagefield.url,
                       "id":detail.id,
                        "phonenumber":detail.phonenumber,         
                        "email":detail.email,
                    })
              return JsonResponse({"detail":send})
         else:
             return JsonResponse({"nothing":""})
                       
              
                                
        
    return JsonResponse({"send":"sended"})



@api_view(["GET"])  
@permission_classes([AllowAny]) 
def goCheckanynotification(request):
    try:
       reg= Registrations.objects.filter(accept=False)
       details=[]
       if reg:
           for registration in reg:
               print("heello")
               img=registration.imagefield.url
               first_name=registration.first_name
               last_name=registration.Last_name
               email=registration.email
               details.append({
                   "name":f"{first_name} {last_name}",
                   "img":img,
                   "email":email, 
               })           
           return JsonResponse({"details":details})                    
    except Exception as e:
        print(e)
        return JsonResponse({"error":"something went wrong"})
    
@api_view(["POST"])  
@permission_classes([AllowAny])            
def markLeave(request):
    try:
        print("hiiiu")
        data=request.FILES["image"]
        print(data)
        image_pil=Image.open(data).convert("RGB")
        image_np=np.array(image_pil) 
        formatted_time = now.strftime("%I:%M %p")     
        print(now)
        try:
            print("e")
            face=DeepFace.extract_faces(image_np,enforce_detection=True)
            print(face)
        except Exception as e:
            print(e)
            return JsonResponse ({"noface":"bro no face detected"})
        reg=Registrations.objects.all()
        for regist in reg:
              images=regist.imagefield
            
              if images:
                stored_img_pil=Image.open(images).convert("RGB")
                stored_img_np=np.array(stored_img_pil)
                result=DeepFace.verify(
                    img1_path=image_np,
                    img2_path=stored_img_np,
                    enforce_detection=True
                )
              print(result)                          
                  
              if result["verified"]:
                     if Attendencemark.objects.filter(date=now,user=regist).exists():
                         attendence=Attendencemark.objects.get(date=now,user=regist)
                         if attendence.join_time:
                             if attendence.leave_time:
                                 return JsonResponse({"alreadymarked":"bro you already mark"})
                             else:
                                attendence.leave_time=now.time()
                                attendence.save()
                                return JsonResponse({"suucessfully":"every seems good"})     
                         else:
                             return JsonResponse({"so_late": "Please a contact manager you so late "}) 
                     else:
                            return JsonResponse({"so_late": "Please a contact manager you so late "}) 
                     
                                                                        
        print(formatted_time)                                                                
        return JsonResponse({"error":"may be you are not registered"})           
    except Exception as e:
        print(e)
        return JsonResponse({"error":"something went wrong"})                                         
    
    
    
@api_view(["GET"])  
@permission_classes([AllowAny])            
def requests(request):
    try:
        print("helo")
        count_present=Attendencemark.objects.filter(date=now).count()
        totaluser=Registrations.objects.filter(accept=True).count()
        updats=Registrations.objects.filter(accept=False).count()
        print("...........................",count_present)
        return JsonResponse({"count":count_present,"total":totaluser,"update":updats})
        
    except Exception as e:                      
        print(e)
        return JsonResponse({"error":"something went wrong"})                               
    
@api_view(["POST"])                                          
@permission_classes([AllowAny])            
def userlog(request):
    try: 
        data=request.data
        name=data.get("username")                                                                                                        
        password=data.get("pass")          
        result=authenticate(username=name,password=password)  
               
        print(result)      
        if(result):
            return JsonResponse({"data":"goood"})
               
        return JsonResponse({"error":"wrong id and pass"})
    except Exception as e: 
        print(e)
        return JsonResponse({"error":"something went wrong"})          