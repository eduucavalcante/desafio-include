from django.db import models

class TeamMember(models.Model):
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    bio = models.TextField()
    image = models.CharField(max_length=300, null=True, blank=True)
    social_links = models.JSONField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = "equipe"
        verbose_name = "Equipe"
        verbose_name_plural = "Membros"
