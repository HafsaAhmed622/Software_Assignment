from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from transactions.models import income, expenses
from django.db.models import Sum
from .models import User
import dns.resolver
import uuid


def is_valid_email_domain(email):
    try:
        domain = email.split('@')[1]
        dns.resolver.resolve(domain, 'MX')
        return True
    except Exception:
        return False


@login_required(login_url='/users/login/')
def delete_account_view(request):
    if request.method == 'POST':
        request.user.delete()
        messages.success(request, 'Your account has been deleted.')
        return redirect('users:sign-up')
    return redirect('users:user-profile')


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
        username  = request.POST.get('username')
        email     = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        if password1 != password2:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'users/sign-up.html')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already taken.')
            return render(request, 'users/sign-up.html')

        if not is_valid_email_domain(email):
            messages.error(request, 'Email domain does not exist. Please use a real email.')
            return render(request, 'users/sign-up.html')

        # create user but inactive until email verified
        user = User.objects.create_user(username=username, email=email, password=password1)
        user.is_active = False
        user.save()

        # generate token and store in session
        token = str(uuid.uuid4())
        request.session['verification_token'] = token
        request.session['verification_user_id'] = user.id

        verification_link = f"http://127.0.0.1:8000/users/verify/{token}/"

        send_mail(
            subject='Verify your Fintrack account',
            message=f'Hi {username},\n\nClick the link below to verify your email:\n\n{verification_link}\n\nIf you did not sign up, ignore this email.',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
        )

        messages.success(request, 'Account created! Please check your email to verify your account.')
        return render(request, 'users/sign-up.html')

    return render(request, 'users/sign-up.html')


def verify_email_view(request, token):
    session_token = request.session.get('verification_token')
    user_id       = request.session.get('verification_user_id')

    if token == session_token and user_id:
        try:
            user = User.objects.get(id=user_id)
            user.is_active = True
            user.save()
            login(request, user)
            messages.success(request, 'Email verified! Welcome to Fintrack!')
            return redirect('users:user-profile')
        except User.DoesNotExist:
            pass

    messages.error(request, 'Invalid or expired verification link.')
    return redirect('users:sign-up')


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