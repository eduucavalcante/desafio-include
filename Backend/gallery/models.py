from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    image = models.URLField(max_length=300, blank=True, null=True)

    def __str__(self):
        return (self.title)
    
    class Meta:
        db_table = "eventos"
        verbose_name = "Evento"
        verbose_name_plural = "Eventos"

class Achievement(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    image = models.URLField(max_length=300, blank=True, null=True)

    def __str__(self):
        return (self.title)
    
    class Meta:
        db_table = "reconhecimentos"
        verbose_name = "Reconhecimento"
        verbose_name_plural = "Reconhecimentos"