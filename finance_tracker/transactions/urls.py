from django.urls import path
from . import views

urlpatterns = [
    path('income/', views.income_view, name='track-income'),
    path('expenses/', views.expense_view, name='track-expenses'),
]

