from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from transactions.models import income, expenses
from django.db.models import Sum
from .models import User

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('users:user-profile')
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, 'users/login.html')

def register_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email    = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        if password1 != password2:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'users/sign-up.html')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already taken.')
            return render(request, 'users/sign-up.html')

        user = User.objects.create_user(username=username, email=email, password=password1)
        user.save()
        login(request, user)
        return redirect('users:user-profile')

    return render(request, 'users/sign-up.html')

def logout_view(request):
    logout(request)
    return redirect('users:login')

@login_required(login_url='/users/login/')
def profile_view(request):
    user = request.user

    if request.method == 'POST':
        
        user.first_name   = request.POST.get('first_name', user.first_name)
        user.last_name    = request.POST.get('last_name', user.last_name)
        user.email        = request.POST.get('email', user.email)
        
        
        user.job_title    = request.POST.get('job_title', '')
        user.phone_number = request.POST.get('phone_number', '')
        user.country      = request.POST.get('country', '')
        user.city         = request.POST.get('city', '')
        if request.FILES.get('avatar'):         
            user.avatar = request.FILES['avatar']  
        user.save()
        messages.success(request, 'Profile updated successfully!')
        return redirect('users:user-profile')
    total_income   = income.objects.filter(user=request.user).aggregate(Sum('Amount'))['Amount__sum'] or 0
    total_expenses = expenses.objects.filter(user=request.user).aggregate(Sum('Amount'))['Amount__sum'] or 0
    total_balance  = total_income - total_expenses

    return render(request, 'users/user-profile.html', {
        'user': user,
        'total_balance': total_balance,
    })