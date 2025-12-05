from django.urls import path
from .views import HistoryView, HistoryDetailView, EnterpriseView, EnterpriseDetailView

urlpatterns = [
    path('history/', HistoryView.as_view()),                 
    path('history/<int:id>/', HistoryDetailView.as_view()),
    path('enterprise/', EnterpriseView.as_view()),
    path('enterprise/<int:id>/', EnterpriseDetailView.as_view()),
]
