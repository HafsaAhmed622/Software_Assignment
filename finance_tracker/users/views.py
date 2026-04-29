from django.shortcuts import redirect, render

def login_view(request):
    return render(request,'users/login.html')

def register_view(request):
    return render(request,'users/sign-up.html')

def profile_view(request):
   return render(request,'users/user-profile.html')
  
