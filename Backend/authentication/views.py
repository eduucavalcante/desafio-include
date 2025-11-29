from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from .serializers import AuthSerializer, AuthResponseSerializer

User = get_user_model()

@extend_schema(tags=['Autenticação'])
class LoginView(APIView):

    @extend_schema(
        tags=['Autenticação'],
        request=AuthSerializer,
        responses={
            200: AuthResponseSerializer,
            400: 'Bad Request - Email ou senha ausentes / Formato de email inválido',
            401: 'Unauthorized - Senha incorreta',
            500: 'Erro interno do servidor'
        }
    )
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"message": "Email ou senha ausentes."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            validate_email(email)
        except ValidationError:
            return Response(
                {"detail": "Formato de email inválido."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"message": "Usuário não cadastrado."},
                status=status.HTTP_404_NOT_FOUND
            )

        if not user.check_password(password):
            return Response(
                {"message": "Senha incorreta"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            return Response(
                {
                    "message": "Login bem-sucedido",
                    "access_token": str(access),
                    "refresh_token": str(refresh),
                    "user": {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email,
                        "permission": user.permission,
                        "role": user.role,
                    }
                },
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"erro": f"Erro interno do servidor: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
