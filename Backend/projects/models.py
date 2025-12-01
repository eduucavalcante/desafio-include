from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=150)
    area = models.CharField(max_length=150)
    project_type = models.CharField(max_length=150)
    description = models.TextField()
    challenges = models.TextField(blank=True, null=True)
    results = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = "projetos"
        verbose_name = "Projeto"
        verbose_name_plural = "Projetos"

class Portfolio(models.Model):
    image = models.URLField(max_length=300, blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return super().__str__()
    
    class Meta:
        db_table = "portfolios"
        verbose_name = "Portfolio"
        verbose_name_plural = "Portfolios"
