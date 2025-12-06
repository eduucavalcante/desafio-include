from django.urls import path
from .views import CultureView, CultureDetailView

urlpatterns = [
    path('culture/', CultureView.as_view()),                 
    path('culture/<int:id>/', CultureDetailView.as_view()),
]
