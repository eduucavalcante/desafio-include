from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .models import Culture
from .serializers import CultureSerializer
from .permissions import HasPermission

@extend_schema(tags=["Cultura"])
class CultureView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        
        return [HasPermission()]

    @extend_schema(
        tags=["Cultura"],
        summary="Listar registros de cultura organizacional",
        responses={
            200: CultureSerializer(many=True),
            404: {"message": "Ainda não há registros cadastrados"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def get(self, request):
        try:
            cultures = Culture.objects.all()

            if not cultures.exists():
                return Response(
                    {"message": "Ainda não há registros cadastrados"},
                    status=404
                )

            serializer = CultureSerializer(cultures, many=True)
            return Response(serializer.data, status=200)

        except Exception as e:
            return Response(
                {"message": f"Erro ao listar: {str(e)}"},
                status=500
            )

    @extend_schema(
        tags=["Cultura"],
        summary="Criar registro de cultura organizacional",
        request=CultureSerializer,
        responses={
            201: CultureSerializer,
            400: {"message": "Dados inválidos"},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def post(self, request):
        try:
            culture = Culture.objects.all()

            if culture.count() != 0:
                return Response(
                    {"message": "Já existe uma história cadastrada. Tente editá-la."},
                    status=status.HTTP_204_NO_CONTENT
                )
            
            serializer = CultureSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)

            return Response({"message": "Dados inválidos"}, status=400)

        except Exception as e:
            return Response(
                {"message": f"Erro ao criar registro: {str(e)}"},
                status=500
            )


@extend_schema(tags=["Cultura"])
class CultureDetailView(APIView):
    permission_classes = [HasPermission]

    def get_culture(self, id):
        try:
            return Culture.objects.get(id=id)
        except Culture.DoesNotExist:
            return None

    @extend_schema(
        tags=["Cultura"],
        summary="Atualizar registro de cultura organizacional",
        request=CultureSerializer,
        responses={
            200: CultureSerializer,
            400: {"message": "Dados inválidos"},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Registro não encontrado"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def put(self, request, id):
        try:
            culture = self.get_culture(id)

            if culture is None:
                return Response({"message": "Registro não encontrado"}, status=404)

            serializer = CultureSerializer(culture, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)

            return Response({"message": "Dados inválidos"}, status=400)

        except Exception as e:
            return Response(
                {"message": f"Erro ao atualizar: {str(e)}"},
                status=500
            )

    @extend_schema(
        tags=["Cultura"],
        summary="Excluir registro de cultura organizacional",
        responses={
            204: {"message": "Registro removido com sucesso"},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Registro não encontrado"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def delete(self, request, id):
        try:
            culture = self.get_culture(id)

            if culture is None:
                return Response({"message": "Registro não encontrado"}, status=404)

            culture.delete()
            return Response({"message": "Registro removido com sucesso"}, status=204)

        except Exception as e:
            return Response(
                {"message": f"Erro ao remover: {str(e)}"},
                status=500
            )

