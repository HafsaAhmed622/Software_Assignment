from django.shortcuts import render, redirect
from .models import income, expenses

# test the new files directory .
def income_view(request):
    if request.method == 'POST': #get data from the databse
        amount = request.POST.get('amount')
        source = request.POST.get('source')
        payment_method = request.POST.get('payment_method')
        notes = request.POST.get('notes')
        date = request.POST.get('date')
        recurring = request.POST.get('recurring') == 'on'
        income.objects.create(
            amount=amount,
            source=source,
            payment_method=payment_method,
            notes=notes,
            date=date,
            recurring=recurring
        )
        return redirect('track-income')
    incomes = income.objects.all().order_by('-Date')
    return render(request, 'track-income.html', {'incomes': incomes})

def expense_view(request):
    if request.method == 'POST':
        expenses.objects.create(
            amount=request.POST.get('amount'),
            category=request.POST.get('category'),
            payment_method=request.POST.get('payment_method'),
            notes=request.POST.get('notes'),
            date=request.POST.get('date')
        )
        return redirect('track-expenses')
    all_expenses = expenses.objects.all().order_by('-Date')
    return render(request, 'track-expenses.html', {'expenses': all_expenses})