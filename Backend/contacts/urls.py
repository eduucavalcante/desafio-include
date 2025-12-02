from django.urls import path
from .views import ContactView, ContactDetailView

urlpatterns = [
    path('contacts/', ContactView.as_view(), name='contacts'),
    path('contacts/<int:id>/', ContactDetailView.as_view(), name='contact-detail'),
]