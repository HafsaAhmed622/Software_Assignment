from django.contrib import admin
from .models import income,expenses

#testing models in admin panel
# Register your models here.
admin.site.register(income)
admin.site.register(expenses)