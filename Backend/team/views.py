from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import TeamMember
from .serializers import TeamSerializer
from .permissions import IsAdmin
import cloudinary.uploader


@extend_schema(tags=['Equipe'])
class TeamView(APIView):
    permission_classes = [IsAdmin]

    @extend_schema(
        tags=['Equipe'],
        responses={
            200: TeamSerializer(many=True),
            404: "Nenhum membro encontrado"
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
        request=TeamSerializer,
        responses={
            201: TeamSerializer,
            400: "Dados inválidos",
            500: "Erro interno"
        }
    )
    def post(self, request):
        try:
            data = request.data.copy()
            photo = request.FILES.get("photo")

            if not photo:
                return Response(
                    {"message": "Envie uma foto."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            upload = cloudinary.uploader.upload(photo)
            data["photo_url"] = upload["secure_url"]
            data["photo_public_id"] = upload["public_id"]

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
                {"message": "Dados inválidos.", "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"message": f"Erro ao criar membro: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@extend_schema(tags=['Equipe'])
class TeamDetailView(APIView):
    permission_classes = [IsAdmin]

    # Utilitário solicitado
    def get_member_by_id(self, id):
        return get_object_or_404(TeamMember, id=id)

    @extend_schema(
        tags=['Equipe'],
        responses={200: TeamSerializer, 404: "Não encontrado"}
    )
    def get(self, request, id):
        member = self.get_member_by_id(id)
        serializer = TeamSerializer(member)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        tags=['Equipe'],
        request=TeamSerializer,
        responses={
            200: TeamSerializer,
            400: "Erro ao atualizar",
            404: "Não encontrado"
        }
    )
    def put(self, request, id):
        member = self.get_member_by_id(id)

        try:
            data = request.data.copy()
            new_photo = request.FILES.get("photo")

            # Se vier foto nova, apagar a antiga
            if new_photo:
                if member.photo_public_id:
                    cloudinary.uploader.destroy(member.photo_public_id)

                upload = cloudinary.uploader.upload(new_photo)
                data["photo_url"] = upload["secure_url"]
                data["photo_public_id"] = upload["public_id"]
            else:
                # preservar valores antigos
                data["photo_url"] = member.photo_url
                data["photo_public_id"] = member.photo_public_id

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
                {"message": "Erro ao atualizar.", "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao atualizar: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @extend_schema(
        tags=['Equipe'],
        responses={
            204: "Membro removido",
            404: "Não encontrado"
        }
    )
    def delete(self, request, id):
        member = self.get_member_by_id(id)

        try:
            # remove imagem no Cloudinary
            if member.photo_public_id:
                cloudinary.uploader.destroy(member.photo_public_id)

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
