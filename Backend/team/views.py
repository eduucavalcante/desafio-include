from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TeamMember
from .serializers import TeamSerializer
from .permissions import HasPermission
import cloudinary.uploader

@extend_schema(tags=['Equipe'])
class TeamView(APIView):
    permission_classes = [HasPermission]

    @extend_schema(
        tags=['Equipe'],
        summary="Listar membros da equipe",
        responses={
            200: TeamSerializer(many=True),
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Ainda não há membros cadastrados."},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def get(self, request):
        try:
            members = TeamMember.objects.all()

            if not members.exists():
                return Response(
                    {"message": "Ainda não há membros cadastrados."},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = TeamSerializer(members, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao listar os membros: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @extend_schema(
        tags=['Equipe'],
        summary="Adicionar membro",
        request=TeamSerializer,
        responses={
            201: TeamSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def post(self, request):
        try:
            data = request.POST.dict()
            image_file = request.FILES.get("image")

            if image_file:
                upload_result = cloudinary.uploader.upload(request.FILES['image'])
                data['image'] = upload_result['secure_url']

            serializer = TeamSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Membro criado com sucesso.",
                        "member": serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )

            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"message": f"Erro ao criar membro: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@extend_schema(tags=['Equipe'])
class TeamDetailView(APIView):
    permission_classes = [HasPermission]

    def get_member_by_id(self, id):
        try:
            return TeamMember.objects.get(id=id)
        except TeamMember.DoesNotExist:
            return None

    @extend_schema(
        tags=['Equipe'],
        summary="Editar um membro",
        request=TeamSerializer,
        responses={
            200: TeamSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Membro não encontrado."},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def put(self, request, id):
        try:
            data = request.POST.dict()
            member = self.get_member_by_id(id)

            if member == None:
                return Response(
                    {"message": "Membro não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )

            new_image = request.FILES.get("image", None)
            old_public_id = member.image.split("/")[-1].split(".")[0] if member.image else None

            if new_image and old_public_id:
                cloudinary.uploader.destroy(old_public_id)
                upload_result = cloudinary.uploader.upload(request.FILES['image'])
                data['image'] = upload_result['secure_url']

            serializer = TeamSerializer(member, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Membro atualizado com sucesso.",
                        "member": serializer.data
                    },
                    status=status.HTTP_200_OK
                )

            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao atualizar: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @extend_schema(
        tags=['Equipe'],
        summary="Remover um membro",
        responses={
            204: {"message": "Membro removido com sucesso."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Membro não encontrado"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def delete(self, request, id):
        try:
            member = self.get_member_by_id(id)

            if member == None:
                return Response(
                    {"message": "Membro não encontrado"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            if member.image:
                public_id = member.image.split("/")[-1].split(".")[0]
                cloudinary.uploader.destroy(public_id)

            member.delete()
            return Response(
                {"message": "Membro removido com sucesso."},
                status=status.HTTP_204_NO_CONTENT
            )

        except Exception as e:
            return Response(
                {"message": f"Erro ao deletar membro: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
