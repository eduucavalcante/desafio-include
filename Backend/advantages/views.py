from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .models import Advantage
from .serializers import AdvantageSerializer


@extend_schema(tags=["Advantages"])
class AdvantageView(APIView):

    @extend_schema(
        tags=["Advantages"],
        summary="Listar registros de diferenciais",
        responses={
            200: AdvantageSerializer(many=True),
            404: {"message": "Ainda não há registros cadastrados"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def get(self, request):
        try:
            advantages = Advantage.objects.all()

            if not advantages.exists():
                return Response(
                    {"message": "Ainda não há registros cadastrados"},
                    status=404
                )

            serializer = AdvantageSerializer(advantages, many=True)
            return Response(serializer.data, status=200)

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao listar: {str(e)}"},
                status=500
            )

    @extend_schema(
        tags=["Advantages"],
        summary="Criar registro de diferencial",
        request=AdvantageSerializer,
        responses={
            201: AdvantageSerializer,
            400: {"message": "Dados inválidos"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def post(self, request):
        try:
            serializer = AdvantageSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)

            return Response({"message": "Dados inválidos"}, status=400)

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao criar registro: {str(e)}"},
                status=500
            )


@extend_schema(tags=["Advantages"])
class AdvantageDetailView(APIView):

    def get_advantage(self, id):
        try:
            return Advantage.objects.get(id=id)
        except Advantage.DoesNotExist:
            return None

    @extend_schema(
        tags=["Advantages"],
        summary="Atualizar registro de diferencial",
        request=AdvantageSerializer,
        responses={
            200: AdvantageSerializer,
            400: {"message": "Dados inválidos"},
            404: {"message": "Registro não encontrado"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def put(self, request, id):
        try:
            advantage = self.get_advantage(id)

            if advantage is None:
                return Response({"message": "Registro não encontrado"}, status=404)

            serializer = AdvantageSerializer(advantage, data=request.data, partial=True)

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
        tags=["Advantages"],
        summary="Excluir registro de diferencial",
        responses={
            204: {"message": "Registro removido com sucesso"},
            404: {"message": "Registro não encontrado"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def delete(self, request, id):
        try:
            advantage = self.get_advantage(id)

            if advantage is None:
                return Response({"message": "Registro não encontrado"}, status=404)

            advantage.delete()
            return Response({"message": "Registro removido com sucesso"}, status=204)

        except Exception as e:
            return Response(
                {"message": f"Erro ao remover: {str(e)}"},
                status=500
            )

