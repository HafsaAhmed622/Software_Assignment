from django.shortcuts import redirect, render
from .models import Goal

def goals_view(request):
    if request.method == 'POST':
        target = request.POST.get('goalTarget')
        if not target or float(target) <= 0:
            return redirect('goals') 
            
        current = request.POST.get('goalCurrent') or 0
        
        Goal.objects.create(
            goalTitle=request.POST.get('goalName'),   
            goalAmount=target,
            currentAmount=current,
            goalDeadline=request.POST.get('goalDeadline'),
            goalDescription=request.POST.get('goalDescription'),
            goalPriority=request.POST.get('goalPriority'),
        )
        return redirect('goals')
    goals = Goal.objects.all()

    for x in goals:
        if x.goalAmount and float(x.goalAmount) > 0:
            x.progress_percentage = round((float(x.currentAmount) / float(x.goalAmount)) * 100, 1)
        else:
            x.progress_percentage = 0

    return render(request, 'goals/goals.html', {'goals': goals})

def delete_goal(request, goal_id):
    Goal.objects.filter(id=goal_id).delete()
    return redirect('goals')
