from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    total_balance = models.FloatField(default=0.0)
    job_title     = models.CharField(max_length=100, blank=True, default="")
    phone_number  = models.CharField(max_length=20,  blank=True, default="")
    country       = models.CharField(max_length=100, blank=True, default="")
    city          = models.CharField(max_length=100, blank=True, default="")
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    def __str__(self):
        return self.username