from django.db import models

class Culture(models.Model):
    mission = models.CharField(max_length=150, blank=True, null=True)
    vision = models.CharField(max_length=150, blank=True, null=True)
    values = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.mission or "Sem missão"
