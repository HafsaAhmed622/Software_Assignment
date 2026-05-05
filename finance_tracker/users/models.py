from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings  
import uuid   


class User(AbstractUser):
    total_balance = models.FloatField(default=0.0)
    job_title     = models.CharField(max_length=100, blank=True, default="")
    phone_number  = models.CharField(max_length=20,  blank=True, default="")
    country       = models.CharField(max_length=100, blank=True, default="")
    city          = models.CharField(max_length=100, blank=True, default="")
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    def __str__(self):
        return self.username
    
class EmailVerificationToken(models.Model):
    user       = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    token      = models.UUIDField(default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        from django.utils import timezone
        return (timezone.now() - self.created_at).total_seconds() > 86400 