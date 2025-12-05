from django.db import models

class Advantage(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title
