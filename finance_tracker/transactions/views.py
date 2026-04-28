from django.shortcuts import render, redirect, get_object_or_404
from .models import income, expenses


# test the new files directory .
def income_view(request):
    if request.method == 'POST':
        income.objects.create(
            Amount=request.POST.get('amount'),
            Source=request.POST.get('source'),
            Payment_Method=request.POST.get('payment_method'),
            Notes=request.POST.get('notes'),
            Date=request.POST.get('date'),
            Recurring_income=request.POST.get('recurring') == 'on'
        )
        return redirect('track-income')
    
    incomes = income.objects.all().order_by('-Date')
    return render(request, 'track-income.html', {'incomes': incomes})

def expense_view(request):
    if request.method == 'POST':
        expenses.objects.create(
            Amount=request.POST.get('amount'),
            Category=request.POST.get('category'),
            Payment_Method=request.POST.get('payment_method'),
            Notes=request.POST.get('notes'),
            Date=request.POST.get('date')
        )
        return redirect('track-expenses')
        
    all_expenses = expenses.objects.all().order_by('-Date')
    return render(request, 'track-expenses.html', {'expenses': all_expenses})


def delete_income(request, pk):
    item = get_object_or_404(income, id=pk)
    item.delete()
    return redirect('track-income')

def delete_expense(request, pk):
    item = get_object_or_404(expenses, id=pk)
    item.delete()
    return redirect('track-expenses')