from django.urls import include, path
from . import views

urlpatterns = [
    path('income/', views.income_view, name='track-income'),
    path('expenses/', views.expense_view, name='track-expenses'),
    path('delete-income/<int:pk>/', views.delete_income, name='delete-income'),
    path('delete-expense/<int:pk>/', views.delete_expense, name='delete-expense'),
    path('', views.home, name='home'),
]

