from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField()
    benefits = models.TextField()
    image = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = "servicos"
        verbose_name = "Serviço"
        verbose_name_plural = "Serviços"
