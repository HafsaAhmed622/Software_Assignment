from django.db import models

class Goal(models.Model):
    goalTitle=models.CharField(max_length=100)
    goalAmount=models.DecimalField(max_digits=10,decimal_places=2)
    currentAmount=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    goalDeadline=models.DateField()
    goalDescription=models.TextField(blank=True)
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    goalPriority=models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium') 

    @property
    def progress_percentage(self):
        if self.goalAmount and self.goalAmount > 0:
            percent = (self.currentAmount / self.goalAmount) * 100
            return min(percent, 100)
        return 0


# Create your models here.
