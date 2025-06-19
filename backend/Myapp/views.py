from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny 
import cv2
import face_recognition
import numpy as np
from PIL import Image
import io
from .models import *
import base64
from deepface import DeepFace



# Create your views here.



           
            
    
  


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
        users=Registrations.objects.all()
        details=[]
        
        for user in users:
            details.append({
                "first_name":user.first_name,
                "last_name":user.Last_name,
                "accept":user.accept,
                "image":user.imagefield.url, 
                "phonenumber":user.phonenumber,
                "email":user.email  ,
           })
                                   
        return JsonResponse({"count":count,"details":details})
    except Exception as e:       
        print(e)                        
        return JsonResponse({"nothing":0})                    
    
