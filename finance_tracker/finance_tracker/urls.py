"""
URL configuration for finance_tracker project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Removed 'import transactions' as it is not needed here when using include()

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # It is best to have one main entry point for your transactions app
    # This will handle your dashboard and transaction logic
    path('', include('transactions.urls')), 
    
    path('goals/', include('goals.urls')),
    path('users/', include('users.urls')),
    path('reports/', include('reports.urls')),

] 

# Fixed the syntax error by ensuring the '+' starts after the ']' list closure
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # If you want to be extra safe with your static files in development:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)