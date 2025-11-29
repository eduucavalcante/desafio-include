from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Service
from .serializers import ServiceSerializer
from .permissions import IsAdmin
import cloudinary.uploader

@extend_schema(tags=['Serviços'])
class ServiceView(APIView):
    permission_classes = [IsAdmin]

    @extend_schema(
        tags=['Serviços'],
        responses={
            200: ServiceSerializer(many=True),
            404: 'Ainda não há serviços cadastrados'
        }
    )
    def get(self, request):
        try:
            services = Service.objects.all()
            if not services.exists():
                return Response(
                    {"message": "Ainda não há serviços cadastrados."},
                    status=status.HTTP_404_NOT_FOUND
                )
            serializer = ServiceSerializer(services, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao listar os serviços: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @extend_schema(
        tags=['Serviços'],
        request=ServiceSerializer,
        responses={
            200: ServiceSerializer,
            400: 'Bad Request - Dados inválidos ou campo obrigatório não preenchido.',
            401: 'Unauthorized - Usuário não autenticado',
            403: 'Forbidden - Usuário não possui permissão',
            500: 'Erro interno do servidor',
        }
    )
    def post(self, request):
        try:
            data = request.data.copy()
            if 'image' in request.FILES:
                upload_result = cloudinary.uploader.upload(request.FILES['image'])
                data['image'] = upload_result['secure_url']
            serializer = ServiceSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Serviço cadastrado com successo.",
                        "service": serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )
            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao criar serviço: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
