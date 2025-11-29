from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404

class LoginView(APIView):
    def post(self, request):
        try:
            # Exemplo: pegando o campo "email"
            email = request.data.get("email")
            senha = request.data.get("senha")

            if not email or not senha:
                # Erro inválido → 400
                return Response(
                    {"erro": "Email ou senha ausentes."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Simulação de erro interno:
            if email == "quebrar@erro.com":
                raise Exception("Erro inesperado no servidor")

            return Response({"mensagem": "Login bem-sucedido!"}, status=200)

        except Http404:
            # ERRO 404
            return Response(
                {"erro": "Rota não encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            # ERRO 500
            return Response(
                {"erro": f"Erro interno do servidor: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
