from django.urls import path
from . import views

urlpatterns = [
 
    path('login/', views.login_view, name='login'),
    path('sign-up/', views.register_view, name='sign-up'),
    path('user-profile/', views.profile_view, name='user-profile'),

]
