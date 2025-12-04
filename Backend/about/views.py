from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import History, Enterprise
from .serializers import HistorySerializer, EnterpriseSerializer



@extend_schema(tags=['History'])
class HistoryView(APIView):

    @extend_schema(
        tags=['History'],
        summary="Listar registros de história",
        responses={
            200: HistorySerializer(many=True),
            404: {"message": "Ainda não há registros cadastrados"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def get(self, request):
        try:
            histories = History.objects.all()

            if not histories.exists():
                return Response(
                    {"message": "Ainda não há registros cadastrados"},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = HistorySerializer(histories, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao listar: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @extend_schema(
        tags=['History'],
        summary="Criar registro de história",
        request=HistorySerializer,
        responses={
            201: HistorySerializer,
            400: {"message": "Dados inválidos"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def post(self, request):
        try:
            serializer = HistorySerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(
                {"message": "Dados inválidos"},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao criar registro: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@extend_schema(tags=['History'])
class HistoryDetailView(APIView):

    def get_history(self, id):
        try:
            return History.objects.get(id=id)
        except History.DoesNotExist:
            return None

    @extend_schema(
        tags=['History'],
        summary="Atualizar registro de história",
        request=HistorySerializer,
        responses={
            200: HistorySerializer,
            400: {"message": "Dados inválidos"},
            404: {"message": "Registro não encontrado"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def put(self, request, id):
        try:
            history = self.get_history(id)

            if history is None:
                return Response({"message": "Registro não encontrado"}, status=404)

            serializer = HistorySerializer(history, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)

            return Response({"message": "Dados inválidos"}, status=400)

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao atualizar: {str(e)}"},
                status=500
            )

    @extend_schema(
        tags=['History'],
        summary="Excluir registro de história",
        responses={
            204: {"message": "Registro removido com sucesso"},
            404: {"message": "Registro não encontrado"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def delete(self, request, id):
        try:
            history = self.get_history(id)

            if history is None:
                return Response({"message": "Registro não encontrado"}, status=404)

            history.delete()
            return Response({"message": "Registro removido com sucesso"}, status=204)

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao remover: {str(e)}"},
                status=500
            )


# ============================= ENTERPRISE =============================

@extend_schema(tags=['Enterprise'])
class EnterpriseView(APIView):

    @extend_schema(
        tags=['Enterprise'],
        summary="Listar registros de EJ",
        responses={
            200: EnterpriseSerializer(many=True),
            404: {"message": "Ainda não há registros cadastrados"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def get(self, request):
        try:
            enterprises = Enterprise.objects.all()

            if not enterprises.exists():
                return Response(
                    {"message": "Ainda não há registros cadastrados"},
                    status=404
                )

            serializer = EnterpriseSerializer(enterprises, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response(
                {"message": f"Erro ao listar: {str(e)}"},
                status=500
            )

    @extend_schema(
        tags=['Enterprise'],
        summary="Criar registro de EJ",
        request=EnterpriseSerializer,
        responses={
            201: EnterpriseSerializer,
            400: {"message": "Dados inválidos"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def post(self, request):
        try:
            serializer = EnterpriseSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)

            return Response({"message": "Dados inválidos"}, status=400)

        except Exception as e:
            return Response(
                {"message": f"Erro ao criar registro: {str(e)}"},
                status=500
            )


@extend_schema(tags=['Enterprise'])
class EnterpriseDetailView(APIView):

    def get_enterprise(self, id):
        try:
            return Enterprise.objects.get(id=id)
        except Enterprise.DoesNotExist:
            return None

    @extend_schema(
        tags=['Enterprise'],
        summary="Atualizar registro de EJ",
        request=EnterpriseSerializer,
        responses={
            200: EnterpriseSerializer,
            400: {"message": "Dados inválidos"},
            404: {"message": "Registro não encontrado"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def put(self, request, id):
        try:
            enterprise = self.get_enterprise(id)

            if enterprise is None:
                return Response({"message": "Registro não encontrado"}, status=404)

            serializer = EnterpriseSerializer(enterprise, data=request.data, partial=True)

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
        tags=['Enterprise'],
        summary="Excluir registro de EJ",
        responses={
            204: {"message": "Registro removido com sucesso"},
            404: {"message": "Registro não encontrado"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def delete(self, request, id):
        try:
            enterprise = self.get_enterprise(id)

            if enterprise is None:
                return Response({"message": "Registro não encontrado"}, status=404)

            enterprise.delete()
            return Response({"message": "Registro removido com sucesso"}, status=204)

        except Exception as e:
            return Response(
                {"message": f"Erro ao remover: {str(e)}"},
                status=500
            )
