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
        summary="Listar todos os serviços",
        responses={
            200: ServiceSerializer(many=True),
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Ainda não há serviços cadastrados"},
            500: {"message": "Erro interno no servidor"}
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
        summary="Cadastrar serviço",
        request=ServiceSerializer,
        responses={
            200: ServiceSerializer,
            400: {"message": "Bad Request - Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            500: {"message": "Erro interno do servidor"},
        }
    )
    def post(self, request):
        try:
            data = request.POST.dict()
            image_file = request.FILES.get("image")
            if image_file:
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

@extend_schema(tags=['Serviços'])
class ServiceDetailView(APIView):
    permission_classes = [IsAdmin]

    def get_service_by_id(self, id):
        try:
            return Service.objects.get(id=id)
        except Service.DoesNotExist:
            return None
    
    @extend_schema(
        summary="Atualizar um serviço",
        request=ServiceSerializer,
        responses={
            200: ServiceSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Serviço não encontrado"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def put(self, request, id):
        try:
            data = request.POST.dict()
            service = self.get_service_by_id(id)

            if service == None:
                return Response(
                    {"message": "Serviço não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            new_image = request.FILES.get("image", None)
            old_public_id = service.image.split("/")[-1].split(".")[0] if service.image else None

            if new_image and old_public_id:
                cloudinary.uploader.destroy(old_public_id)
                upload_result = cloudinary.uploader.upload(request.FILES['image'])
                data['image'] = upload_result['secure_url']

            serializer = ServiceSerializer(service, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()

                return Response(
                    {
                        "message": "Serviço editado com sucesso.",
                        "service": serializer.data,
                    },
                    status=status.HTTP_200_OK
                )
            
            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        except Exception as e:
            return Response(
                {"message:": f"Ocorreu um erro ao salvar alterações: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    @extend_schema(
        summary="Deletar um serviço",
        responses={
            204: {"message": "Serviço removido com sucesso."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Serviço não encontrado"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    
    def delete(self, request, id):
        try:
            service = self.get_service_by_id(id)

            if service == None:
                return Response(
                    {"message": "Serviço não encontrado"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            if service.image:
                public_id = service.image.split("/")[-1].split(".")[0]
                cloudinary.uploader.destroy(public_id)
            
            service.delete()

            return Response(
                {"message": "Serviço removido com sucesso."},
                status=status.HTTP_204_NO_CONTENT
            )
            
        except Exception as e:
            return Response(
                {"message:": f"Ocorreu um erro ao remover o serviço: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )