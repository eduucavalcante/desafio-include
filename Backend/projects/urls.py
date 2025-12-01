from django.urls import path
from .views import ProjectView, ProjectDetailView, PortfolioImageView, PortfolioImageDetailView

urlpatterns = [
    path('portfolio/', ProjectView.as_view()),                 
    path('portfolio/<int:id>/', ProjectDetailView.as_view()),
    path('portfolio/<int:project_id>/images/', PortfolioImageView.as_view()),
    path('portfolio/<int:project_id>/images/<int:image_id>/', PortfolioImageDetailView.as_view()),
]
