from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, name, role, permission, password=None):
        if not email:
            raise ValueError("Usuário precisa de um email")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, role=role, permission=permission)

        user.set_password(password) # Criptografa senha usando hash padrão do Django
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, role, permission, password=None):
        user = self.create_user(email=email, name=name, role=role, permission=permission, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('presex', 'Presex'),
        ('marketing', 'Marketing'),
        ('projetista', 'Projetista'),
        ('gestao', 'Gestão de Pessoas'),
    ]

    PERMISSION_CHOICES = [
        ('Admin', 'Admin'),
        ('Membro', 'Membro'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    permission = models.CharField(max_length=20, choices=PERMISSION_CHOICES)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'role', 'permission']

    objects = UserManager()

    def __str__(self):
        return self.email
    
    class Meta:
        db_table = "usuarios"
        verbose_name = "Usuário"
        verbose_name_plural = "Usuários"
