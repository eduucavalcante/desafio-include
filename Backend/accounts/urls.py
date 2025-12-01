from django.urls import path
from .views import UserView, UserDetailView, UpdatePasswordView

urlpatterns = [
    path('users/', UserView.as_view()),                 
    path('users/<int:id>/', UserDetailView.as_view()),
    path('users/<int:id>/password/', UpdatePasswordView.as_view()),
]
