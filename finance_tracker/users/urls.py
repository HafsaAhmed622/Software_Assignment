from django.urls import path
from . import views

app_name = 'users' 

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('sign-up/', views.register_view, name='sign-up'),
    path('user-profile/', views.profile_view, name='user-profile'),
    path('logout/', views.logout_view, name='logout'),
    path('delete/', views.delete_account_view, name='delete'),
    path('verify/<str:token>/', views.verify_email_view, name='verify-email'),
    path('budget/', views.budget_view, name='budget'),

]
