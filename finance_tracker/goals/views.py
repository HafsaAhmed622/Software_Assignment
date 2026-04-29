from django.shortcuts import redirect, render
from .models import Goal
from django.utils import timezone

def goals_view(request):
    if request.method == 'POST':
        if 'goal_id_quick' in request.POST:
            goal_id = request.POST.get('goal_id_quick')
            try:
                goal = Goal.objects.get(id=goal_id)
                add_val = float(request.POST.get('add_amount', 0))
                
                new_amount = float(goal.currentAmount or 0) + add_val
                goal.currentAmount = max(0, new_amount)
                
                goal.save()
            except (Goal.DoesNotExist, ValueError):
                pass 
            
            return redirect('goals')

        else:
            target = request.POST.get('goalTarget')
            if target and float(target) > 0:
                current = request.POST.get('goalCurrent') or 0
                
                Goal.objects.create(
                    goalTitle=request.POST.get('goalName'),   
                    goalAmount=target,
                    currentAmount=current,
                    goalDeadline=request.POST.get('goalDeadline') or None,
                    goalDescription=request.POST.get('goalDescription'),
                    goalPriority=request.POST.get('goalPriority'),
                )
            return redirect('goals')
    
    goals = Goal.objects.all()
    today = timezone.now().date()
    
    for x in goals:
        if x.goalDeadline:
            days_left = (x.goalDeadline - today).days
            if days_left < 0:
                x.deadline_status = "expired"
            elif days_left <= 3:
                x.deadline_status = "urgent"
            else:
                x.deadline_status = "safe"
        else:
            x.deadline_status = "none"

    return render(request, 'goals/goals.html', {'goals': goals})

def delete_goal(request, goal_id):
    Goal.objects.filter(id=goal_id).delete()
    return redirect('goals')