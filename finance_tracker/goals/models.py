from django.db import models

class Goal(models.Model):
    goalTitle=models.CharField(max_length=100)
    goalAmount=models.DecimalField(max_digits=10,decimal_places=2)
    currentAmount=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    goalDeadline=models.DateField()


# Create your models here.
