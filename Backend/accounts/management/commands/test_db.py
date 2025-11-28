from django.core.management.base import BaseCommand
from django.db import connection
from django.db.utils import OperationalError

class Command(BaseCommand):
    help = "Testa a conexão com o banco de dados"

    def handle(self, *args, **kwargs):
        self.stdout.write("Testando conexão com o banco...")

        try:
            connection.ensure_connection()
            self.stdout.write(self.style.SUCCESS("✓ Conexão OK!"))
        except OperationalError as e:
            self.stdout.write(self.style.ERROR(f"✗ Erro de conexão: {e}"))
