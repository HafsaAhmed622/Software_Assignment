from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from transactions.models import income, expenses, Budget
import json
from datetime import date
from dateutil.relativedelta import relativedelta

@login_required
def reports_view(request):
    today = date.today()

    period = request.GET.get('period', 'monthly')
    
    if period == 'yearly':
        start_date = today.replace(month=1, day=1)
    elif period == 'quarterly':
        quarter_start_month = ((today.month - 1) // 3) * 3 + 1
        start_date = today.replace(month=quarter_start_month, day=1)
    else:  
        start_date = today.replace(day=1)

    custom_from = request.GET.get('from')
    custom_to = request.GET.get('to')
    if custom_from and custom_to:
        start_date = date.fromisoformat(custom_from)
        end_date = date.fromisoformat(custom_to)
    else:
        end_date = today

    user = request.user

    total_income = income.objects.filter(
        user=user, Date__range=[start_date, end_date]
    ).aggregate(Sum('Amount'))['Amount__sum'] or 0

    total_expenses = expenses.objects.filter(
        user=user, Date__range=[start_date, end_date]
    ).aggregate(Sum('Amount'))['Amount__sum'] or 0

    net_savings = total_income - total_expenses

    top_category_qs = expenses.objects.filter(
        user=user, Date__range=[start_date, end_date]
    ).values('Category').annotate(total=Sum('Amount')).order_by('-total').first()
    top_category = top_category_qs['Category'] if top_category_qs else 'N/A'

    expenses_by_category = list(
        expenses.objects.filter(user=user, Date__range=[start_date, end_date])
        .values('Category')
        .annotate(total=Sum('Amount'))
        .order_by('-total')
    )
    pie_labels = [x['Category'] for x in expenses_by_category]
    pie_data = [float(x['total']) for x in expenses_by_category]

    income_by_source = list(
        income.objects.filter(user=user, Date__range=[start_date, end_date])
        .values('Source')
        .annotate(total=Sum('Amount'))
        .order_by('-total')
    )
    donut_labels = [x['Source'] for x in income_by_source]
    donut_data = [float(x['total']) for x in income_by_source]

    bar_labels, bar_income, bar_expenses, line_savings = [], [], [], []

    for i in range(5, -1, -1):
        month_start = (today.replace(day=1) - relativedelta(months=i))
        month_end = (month_start + relativedelta(months=1, days=-1))

        m_income = income.objects.filter(
            user=user, Date__range=[month_start, month_end]
        ).aggregate(Sum('Amount'))['Amount__sum'] or 0

        m_expense = expenses.objects.filter(
            user=user, Date__range=[month_start, month_end]
        ).aggregate(Sum('Amount'))['Amount__sum'] or 0

        bar_labels.append(month_start.strftime('%b %Y'))
        bar_income.append(float(m_income))
        bar_expenses.append(float(m_expense))
        line_savings.append(float(m_income - m_expense))

    current_budgets = Budget.objects.filter(
        user=user,
        Month__year=today.year,
        Month__month=today.month
    )
    budget_performance = []
    for b in current_budgets:
        spent = expenses.objects.filter(
            user=user,
            Category=b.Category,
            Date__year=today.year,
            Date__month=today.month
        ).aggregate(Sum('Amount'))['Amount__sum'] or 0

        percent = (spent / b.Amount_Limit) * 100 if b.Amount_Limit > 0 else 0
        budget_performance.append({
            'category': b.Category,
            'limit': float(b.Amount_Limit),
            'spent': float(spent),
            'remaining': float(b.Amount_Limit - spent),
            'percent': min(round(percent, 1), 100),
            'status': 'Over Budget' if percent >= 100 else ('Warning' if percent >= 80 else 'On Track'),
            'class': 'danger' if percent >= 100 else ('warn' if percent >= 80 else 'safe'),
        })

    context = {
        'total_income': total_income,
        'total_expenses': total_expenses,
        'net_savings': net_savings,
        'top_category': top_category,
        'period': period,
        'custom_from': custom_from or '',
        'custom_to': custom_to or '',
        'pie_labels': json.dumps(pie_labels),
        'pie_data': json.dumps(pie_data),
        'donut_labels': json.dumps(donut_labels),
        'donut_data': json.dumps(donut_data),
        'bar_labels': json.dumps(bar_labels),
        'bar_income': json.dumps(bar_income),
        'bar_expenses': json.dumps(bar_expenses),
        'line_savings': json.dumps(line_savings),
        'budget_performance': budget_performance,
    }

    return render(request, 'reports.html', context)