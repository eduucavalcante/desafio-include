from django.urls import path
from .views import TeamView, TeamDetailView

urlpatterns = [
    path('team/', TeamView.as_view()),                 
    path('team/<int:id>/', TeamDetailView.as_view()),  
]
