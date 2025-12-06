from django.urls import path
from .views import AdvantageView, AdvantageDetailView

urlpatterns = [
    path('advantages/', AdvantageView.as_view()),                 
    path('advantages/<int:id>/', AdvantageDetailView.as_view()),
]
