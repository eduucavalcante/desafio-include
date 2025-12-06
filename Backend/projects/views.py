from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import Project, Portfolio
from .serializers import ProjectSerializer, PortfolioSerializer
from .permissions import HasPermission
import cloudinary.uploader

@extend_schema(tags=['Portfólio'])
class ProjectView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        
        return [HasPermission()]
    
    @extend_schema(
        tags=['Portfólio'],
        summary="Listar projetos do portfolio",
        responses={
            200: ProjectSerializer(many=True),
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Ainda não há projetos cadastrados"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def get(self, request):
        try:
            projects = Project.objects.all()

            if not projects.exists():
                return Response(
                    {"message": "Ainda não há projetos cadastrados"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            serializer = ProjectSerializer(projects, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao listar projetos: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @extend_schema(
        tags=['Portfólio'],
        summary="Adicionar projeto",
        request=ProjectSerializer,
        responses={
            201: ProjectSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def post(self, request):
        try:
            data = request.data.copy()

            serializer = ProjectSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Projeto cadastrado com sucesso.",
                        "project": serializer.data,
                    },
                    status=status.HTTP_201_CREATED
                )
            
            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao cadastrar projeto: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@extend_schema(tags=['Portfólio'])
class ProjectDetailView(APIView):
    permission_classes = [HasPermission]

    def get_project_by_id(self, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None
    
    @extend_schema(
        tags=['Portfólio'],
        summary="Editar um projeto",
        request=ProjectSerializer,
        responses={
            200: ProjectSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Projeto não encontrado."},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def put(self, request, id):
        try:
            data = request.data.copy()
            project = self.get_project_by_id(id)

            if project == None:
                return Response(
                    {"message": "Projeto não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            serializer = ProjectSerializer(project, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Projeto atualizado com sucesso.",
                        "project": serializer.data
                    },
                    status=status.HTTP_200_OK
                )
            
            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao atualizar projeto: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @extend_schema(
        tags=['Portfólio'],
        summary="Remover um projeto",
        description="Ao remover um projeto, o sistema automaticamente remove (do banco de dados e do storage) todas as imagens associadas a ele.",
        responses={
            204: {"message": "Projeto removido com sucesso."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Projeto não encontrado"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def delete(self, request, id):
        try:
            project = self.get_project_by_id(id)

            if project == None:
                return Response(
                    {"message": "Projeto não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            project.delete()
            return Response(
                {"message": "Projeto removido com sucesso."},
                status=status.HTTP_204_NO_CONTENT
            )
        
        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao remover projeto: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@extend_schema(tags=['Portfólio'])
class PortfolioImageView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        
        return [HasPermission()]

    @extend_schema(
        tags=['Portfólio'],
        summary="Listar imagens de um projeto do portfolio",
        responses={
            200: PortfolioSerializer(many=True),
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Nenhuma imagem encontrada para o projeto"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def get(self, request, project_id):
        try:
            project = ProjectDetailView.get_project_by_id(ProjectDetailView, project_id)

            if project == None:
                return Response(
                    {"message": "Projeto não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )

            project_images = Portfolio.objects.filter(project_id=project_id)

            if not project_images.exists():
                return Response(
                    {"message": f"Nenhuma imagem encontrada para o projeto {str(project_id)}."},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = PortfolioSerializer(project_images, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao listar imagens do portfolio: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @extend_schema(
        tags=['Portfólio'],
        summary="Adicionar imagem ao projeto do portfolio",
        request=PortfolioSerializer,
        responses={
            201: PortfolioSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def post(self, request, project_id):
        try:
            data = request.POST.dict()

            project = ProjectDetailView.get_project_by_id(ProjectDetailView, project_id)

            if project == None:
                return Response(
                    {"message": "Projeto não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )

            data['project'] = project_id
            image_file = request.FILES.get("image")

            if image_file:
                upload_result = cloudinary.uploader.upload(request.FILES['image'])
                data['image'] = upload_result['secure_url']
            
            serializer = PortfolioSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Portfolio salvo com sucesso.",
                        "project_id": project_id,
                        "portfolio": serializer.data
                    },
                    status=status.HTTP_200_OK
                )
            
            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao enviar a imagem: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@extend_schema(tags=['Portfólio'])
class PortfolioImageDetailView(APIView):
    permission_classes = [HasPermission]

    def get_image_by_id(self, image_id):
        try:
            return Portfolio.objects.get(id=image_id)
        except Portfolio.DoesNotExist:
            return None
    
    @extend_schema(
        tags=['Portfólio'],
        summary="Editar uma imagem de um projeto",
        description="Substituir imagem ou atribuí-la a outro projeto",
        request=PortfolioSerializer,
        responses={
            200: PortfolioSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Imagem não encontrada."},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def put(self, request, project_id, image_id):
        try:
            data = request.POST.dict()

            project = ProjectDetailView.get_project_by_id(ProjectDetailView, project_id)

            if project == None:
                return Response(
                    {"message": "Projeto não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )

            image = self.get_image_by_id(image_id)

            if image == None:
                return Response(
                    {"message": "Imagem não encontrada."},
                    status=status.HTTP_404_NOT_FOUND
                )

            new_image = request.FILES.get("image", None)
            old_public_id = image.image.split("/")[-1].split(".")[0] if image.image else None

            if new_image and old_public_id:
                cloudinary.uploader.destroy(old_public_id)
                upload_result = cloudinary.uploader.upload(request.FILES['image'])
                data['image'] = upload_result['secure_url']
            
            serializer = PortfolioSerializer(image, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Imagem atualizada com sucesso.",
                        "image": serializer.data
                    },
                    status=status.HTTP_200_OK
                )
            
            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao atualizar a imagem: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @extend_schema(
        tags=['Portfólio'],
        summary="Remover uma imagem de um projeto",
        responses={
            204: {"message": "Imagem removida com sucesso."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Imagem não encontrada."},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def delete(self, request, project_id, image_id):
        try:
            image = self.get_image_by_id(image_id)

            project = ProjectDetailView.get_project_by_id(ProjectDetailView, project_id)

            if project == None:
                return Response(
                    {"message": "Projeto não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )

            if image == None:
                return Response(
                    {"message": "Imagem não encontrada."},
                    status=status.HTTP_404_NOT_FOUND
                )

            image.delete()
            return Response(
                {"message": "Imagem removida com sucesso."},
                status=status.HTTP_204_NO_CONTENT
            )

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao remover a imagem: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )