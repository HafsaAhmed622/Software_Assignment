from django.db import models
from django.core.validators import MinValueValidator

from django.conf import settings

# income model.
class income(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    Amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(0.0)] 
    )
    Source = models.CharField(max_length=200)
    Payment_Method = models.CharField(max_length=100)
    Date = models.DateField()
    Recurring_income = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.Source} - {self.Amount}"

# expenses model.
class expenses(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    Amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(0.0)] 
    )
    Category = models.CharField(max_length=200)
    Payment_Method = models.CharField(max_length=100)
    Notes = models.TextField(blank=True, null=True)
    Date = models.DateField()
    def __str__(self):
        return f"{self.Category} - {self.Amount}"
    

class Budget(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    Category = models.CharField(max_length=100)
    Amount_Limit = models.DecimalField(max_digits=10, decimal_places=2)
    Month = models.DateField() # We will store the first day of the month (e.g., 2026-05-01)

    def __str__(self):
        return f"{self.Category} - {self.Month.strftime('%B %Y')}"



