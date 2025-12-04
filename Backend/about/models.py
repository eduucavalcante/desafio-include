from django.db import models

class History(models.Model):
    history_text = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "História"
        verbose_name_plural = "História"
    
    def __str__(self):
        return (self.history_text)

class Enterprise(models.Model):
    ej_text = models.TextField()

    class Meta:
        verbose_name = "Empresa"
        verbose_name_plural = "Empresa"
    
    def __str__(self):
        return (self.ej_text)

    