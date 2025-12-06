from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer, UserResponseSerializer
from .permissions import IsAdmin

@extend_schema(tags=['Usuários'])
class UserView(APIView):
    permission_classes = [IsAdmin]

    @extend_schema(
        tags=['Usuários'],
        summary="Listar usuários",
        responses={
            200: UserResponseSerializer(many=True),
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Ainda não há usuários cadastrados"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def get(self, request):
        try:
            users = User.objects.all()

            if not users.exists():
                return Response(
                    {"message": "Ainda não há usuários cadastrados"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            serializer = UserResponseSerializer(users, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao listar usuários: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @extend_schema(
        tags=['Usuários'],
        summary="Cadastrar usuário",
        request=UserSerializer,
        responses={
            201: UserResponseSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def post(self, request):
        try:
            data = request.data.copy()
            serializer = UserSerializer(data=data)

            if serializer.is_valid():
                user = User.objects.create_user(
                    name=serializer.validated_data.get("name", None),
                    email=serializer.validated_data["email"],
                    password=serializer.validated_data["password"],
                    role=serializer.validated_data.get("role", None),
                    permission=serializer.validated_data.get("permission", None)
                )
                return Response(
                    {
                        "message": "Usuário cadastrado com sucesso.",
                        "user": UserResponseSerializer(user).data,
                    },
                    status=status.HTTP_201_CREATED
                )
            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao cadastrar usuário: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@extend_schema(tags=['Usuários'])
class UserDetailView(APIView):
    permission_classes = [IsAdmin]

    def get_user_by_id(self, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None
    
    @extend_schema(
        tags=['Usuários'],
        summary="Editar um usuário",
        request=UserSerializer,
        responses={
            200: UserResponseSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Usuário não encontrado."},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def put(self, request, id):
        try:
            data = request.data.copy()
            user = self.get_user_by_id(id)

            if user == None:
                return Response(
                    {"message": "Usuário não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            serializer = UserResponseSerializer(user, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Usuário atualizado com sucesso.",
                        "user": UserResponseSerializer(user).data
                    },
                    status=status.HTTP_200_OK
                )
            
            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao atualizar usuário: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @extend_schema(
        tags=['Usuários'],
        summary="Remover um usuário",
        responses={
            204: {"message": "Usuário removido com sucesso."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Usuário não encontrado"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def delete(self, request, id):
        try:
            user = self.get_user_by_id(id)

            if user == None:
                return Response(
                    {"message": "Usuário não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            user.delete()
            return Response(
                {"message": "Usuário removido com sucesso."},
                status=status.HTTP_204_NO_CONTENT
            )
        
        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao remover usuário: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UpdatePasswordView(APIView):
    permission_classes = [IsAdmin]

    @extend_schema(
        tags=['Usuários'],
        summary="Editar senha de um usuário",
        request=UserSerializer,
        responses={
            200: UserResponseSerializer,
            400: {"message": "Dados inválidos ou campo senha não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Usuário não encontrado."},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def put(self, request, id):
        try:
            data = request.data.copy()
            user = UserDetailView.get_user_by_id(UserDetailView, id)

            if user == None:
                return Response(
                    {"message": "Usuário não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )

            if "password" in data and data["password"]:
                user.set_password(data["password"])
                user.save()
                return Response(
                    {
                        "message": "Usuário atualizado com sucesso.",
                        "user": UserResponseSerializer(user).data
                    },
                    status=status.HTTP_200_OK
                )
            
            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo senha não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao atualizar usuário: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )