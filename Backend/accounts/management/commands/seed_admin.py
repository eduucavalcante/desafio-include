from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

class Command(BaseCommand):
    help = "Cria superusuário admin automaticamente"

    def handle(self, *args, **kwargs):
        User = get_user_model()

        if not User.objects.filter(permission="ADMIN").exists():
            User.objects.create_user(
                name=os.getenv("ADMIN_NAME"),
                email=os.getenv("ADMIN_EMAIL"),
                password=os.getenv("ADMIN_PASSWORD"),
                role=os.getenv("ADMIN_ROLE"),
                permission=os.getenv("ADMIN_PERMISSION"),
            )
            self.stdout.write(self.style.SUCCESS("Admin criado!"))
