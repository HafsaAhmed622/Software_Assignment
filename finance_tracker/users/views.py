from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from transactions.models import income, expenses, Budget  # Imported Budget from transactions
from django.db.models import Sum
from .models import User, EmailVerificationToken
from datetime import datetime
import dns.resolver
import uuid

# --- Helper Functions ---

def is_valid_email_domain(email):
    try:
        domain = email.split('@')[1]
        dns.resolver.resolve(domain, 'MX')
        return True
    except Exception:
        return False

# --- Account & Auth Views ---

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

        token_obj = EmailVerificationToken.objects.create(user=user)
        verification_link = f"http://127.0.0.1:8000/users/verify/{token_obj.token}/"

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
    try:
        token_obj = EmailVerificationToken.objects.get(token=token)

        if token_obj.is_expired():
            token_obj.delete()
            messages.error(request, 'Verification link has expired. Please sign up again.')
            return redirect('users:sign-up')

        user = token_obj.user
        user.is_active = True
        user.save()
        token_obj.delete()

        login(request, user)
        messages.success(request, 'Email verified! Welcome to Fintrack!')
        return redirect('users:user-profile')

    except EmailVerificationToken.DoesNotExist:
        messages.error(request, 'Invalid or expired verification link.')
        return redirect('users:sign-up')


def logout_view(request):
    logout(request)
    return redirect('users:login')


# --- Profile & Financial Views ---

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


@login_required(login_url='/users/login/')
def budget_view(request):
    if request.method == 'POST':
        category = request.POST.get('category')
        limit = request.POST.get('limit')
        month_raw = request.POST.get('month') 
        
        # Convert YYYY-MM to a Date object (first day of that month)
        month_date = datetime.strptime(month_raw + "-01", "%Y-%m-%d").date()

        Budget.objects.create(
            user=request.user,
            Category=category,
            Amount_Limit=limit,
            Month=month_date
        )
        messages.success(request, f'Budget for {category} created successfully!')
        return redirect('users:budget')

    # Calculate spending for each budget
    user_budgets = Budget.objects.filter(user=request.user)
    budget_data = []

    for b in user_budgets:
        # Sum expenses matching this specific category and month/year
        spent = expenses.objects.filter(
            user=request.user,
            Category=b.Category,
            Date__year=b.Month.year,
            Date__month=b.Month.month
        ).aggregate(Sum('Amount'))['Amount__sum'] or 0
        
        percent = (spent / b.Amount_Limit) * 100 if b.Amount_Limit > 0 else 0
        
        # Assign CSS classes based on spending thresholds
        status_class = ''
        if percent >= 90:
            status_class = 'danger'
        elif percent >= 70:
            status_class = 'warn'

        budget_data.append({
            'id': b.id,
            'category': b.Category,
            'limit': b.Amount_Limit,
            'spent': spent,
            'remaining': b.Amount_Limit - spent,
            'percent': min(percent, 100),
            'month': b.Month.strftime('%B %Y'),
            'class': status_class
        })

    return render(request, 'budget.html', {'budgets': budget_data})