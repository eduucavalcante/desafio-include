from django.urls import path
from .views import EventView, EventDetailView, AchievementView, AchievementDetailView

urlpatterns = [
    path('events/', EventView.as_view()),                 
    path('events/<int:id>/', EventDetailView.as_view()),
    path('achievements/', AchievementView.as_view()),
    path('achievements/<int:id>/', AchievementDetailView.as_view()),
]
