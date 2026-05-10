from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import Sum, Value, CharField
from itertools import chain
import datetime
from .models import income, expenses, Budget

@login_required
def dashboard_view(request):
    today = datetime.date.today()

    total_income = income.objects.filter(user=request.user).aggregate(Sum('Amount'))['Amount__sum'] or 0
    total_expenses = expenses.objects.filter(user=request.user).aggregate(Sum('Amount'))['Amount__sum'] or 0
    net_balance = total_income - total_expenses

    current_budgets = Budget.objects.filter(
        user=request.user,
        Month__year=today.year,
        Month__month=today.month
    )

    budget_summary = []
    near_limit_count = 0

    for b in current_budgets:
        spent = expenses.objects.filter(
            user=request.user,
            Category=b.Category,
            Date__year=today.year,
            Date__month=today.month
        ).aggregate(Sum('Amount'))['Amount__sum'] or 0

        percent = (spent / b.Amount_Limit) * 100 if b.Amount_Limit > 0 else 0
        if percent >= 80:
            near_limit_count += 1

        budget_summary.append({
            'category': b.Category,
            'spent': spent,
            'limit': b.Amount_Limit,
            'remaining': b.Amount_Limit - spent,
            'percent': min(percent, 100),
            'class': 'danger' if percent >= 90 else ('warn' if percent >= 70 else '')
        })

    # Recent Transactions
    recent_income = income.objects.filter(user=request.user).order_by('-Date')[:10].values('Amount', 'Source', 'Date')
    recent_expenses = expenses.objects.filter(user=request.user).order_by('-Date')[:10].values('Amount', 'Category', 'Date')

    income_list = [{'Amount': t['Amount'], 'label': t['Source'], 'Date': t['Date'], 'type': 'income'} for t in recent_income]
    expense_list = [{'Amount': t['Amount'], 'label': t['Category'], 'Date': t['Date'], 'type': 'expense'} for t in recent_expenses]

    recent_transactions = sorted(chain(income_list, expense_list), key=lambda x: x['Date'], reverse=True)[:5]

    context = {
        'total_income': total_income,
        'total_expenses': total_expenses,
        'net_balance': net_balance,
        'full_name': request.user.get_full_name() or request.user.username,
        'initials': request.user.username[:2].upper(),
        'budget_summary': budget_summary,
        'active_budgets_count': current_budgets.count(),
        'near_limit_count': near_limit_count,
        'recent_transactions': recent_transactions,
    }

    return render(request, 'user-dashboard.html', context)


@login_required
def budget_view(request):
    if request.method == 'POST':
        category = request.POST.get('category')
        limit = request.POST.get('limit')
        month_raw = request.POST.get('month')
        month_date = datetime.datetime.strptime(month_raw + "-01", "%Y-%m-%d").date()
        Budget.objects.create(user=request.user, Category=category, Amount_Limit=limit, Month=month_date)
        return redirect('budget')

    user_budgets = Budget.objects.filter(user=request.user)
    budget_data = []

    for b in user_budgets:
        spent = expenses.objects.filter(
            user=request.user,
            Category=b.Category,
            Date__year=b.Month.year,
            Date__month=b.Month.month
        ).aggregate(Sum('Amount'))['Amount__sum'] or 0

        percent = (spent / b.Amount_Limit) * 100 if b.Amount_Limit > 0 else 0

        budget_data.append({
            'id': b.id,
            'category': b.Category,
            'limit': b.Amount_Limit,
            'spent': spent,
            'remaining': b.Amount_Limit - spent,
            'percent': min(percent, 100),
            'month': b.Month.strftime('%B %Y'),
            'class': 'danger' if percent >= 90 else ('warn' if percent >= 70 else '')
        })

    return render(request, 'budget.html', {'budgets': budget_data})

@login_required
def delete_budget(request, pk):
    budget = get_object_or_404(Budget, id=pk, user=request.user)
    if request.method == 'POST':
        budget.delete()
    return redirect('budget')


@login_required
def income_view(request):
    if request.method == 'POST':
        income.objects.create(
            user=request.user,
            Amount=request.POST.get('amount'),
            Source=request.POST.get('source'),
            Payment_Method=request.POST.get('payment_method'),
            Date=request.POST.get('date'),
            Recurring_income=request.POST.get('recurring') == 'on'
        )
        return redirect('track-income')

    incomes = income.objects.filter(user=request.user).order_by('-Date')
    return render(request, 'track-income.html', {'incomes': incomes})


@login_required
def expense_view(request):
    if request.method == 'POST':
        expenses.objects.create(
            user=request.user,
            Amount=request.POST.get('amount'),
            Category=request.POST.get('category'),
            Payment_Method=request.POST.get('payment_method'),
            Notes=request.POST.get('notes'),
            Date=request.POST.get('date')
        )
        return redirect('track-expenses')

    all_expenses = expenses.objects.filter(user=request.user).order_by('-Date')
    return render(request, 'track-expenses.html', {'expenses': all_expenses})


@login_required
def delete_income(request, pk):
    item = get_object_or_404(income, id=pk, user=request.user)
    item.delete()
    return redirect('track-income')


@login_required
def delete_expense(request, pk):
    item = get_object_or_404(expenses, id=pk, user=request.user)
    item.delete()
    return redirect('track-expenses')


def home(request):
    return render(request, 'home-page.html')