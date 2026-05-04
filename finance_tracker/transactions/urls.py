from django.urls import path
from . import views
from users import views as user_views

urlpatterns = [
    
    path('', views.home, name='home'),
    
    
    path('dashboard/', views.dashboard_view, name='dashboard'),
    
    
    path('income/', views.income_view, name='track-income'),
    path('delete-income/<int:pk>/', views.delete_income, name='delete-income'),
    
    
    path('expenses/', views.expense_view, name='track-expenses'),
    path('delete-expense/<int:pk>/', views.delete_expense, name='delete-expense'),

    path('budget/', user_views.budget_view, name='budget'),
]