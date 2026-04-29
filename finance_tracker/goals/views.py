from django.shortcuts import redirect, render
from .models import Goal

def goals_view(request):
    if request.method == 'POST':
        Goal.objects.create(
            goalTitle=request.POST.get('goalName'),   
            goalAmount=request.POST.get('goalTarget'),
            currentAmount=request.POST.get('goalCurrent'),
            goalDeadline=request.POST.get('goalDeadline'),
            goalDescription=request.POST.get('goalDescription'),
            goalPriority=request.POST.get('goalPriority'),
        )
        return redirect('goals')

    g= {'goals': Goal.objects.all()}
    return render(request,'goals/goals.html', g)

def delete_goal(request, goal_id):
    Goal.objects.filter(id=goal_id).delete()
    return redirect('goals')

