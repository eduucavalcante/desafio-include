from django.db import models
from cloudinary.models import CloudinaryField

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    bio = models.TextField()
    image = CloudinaryField('image', null=True, blank=True)
    social_links = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.name
