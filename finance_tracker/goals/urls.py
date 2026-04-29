from django.urls import path
from . import views

urlpatterns = [
    path('', views.goals_view, name='goals'),
    path('delete/<int:goal_id>/', views.delete_goal, name='delete-goal'),
]