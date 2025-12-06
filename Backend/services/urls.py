from django.urls import path
from .views import ServiceView, ServiceDetailView

urlpatterns = [
    path('services/', ServiceView.as_view(), name='service-list-create'),
    path('services/<int:id>/', ServiceDetailView.as_view(), name='service-detail'),
]
