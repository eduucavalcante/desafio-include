from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer, ContactResponseSerializer
from .permissions import IsAdmin


@extend_schema(tags=['Contatos'])
class ContactView(APIView):
    permission_classes = [IsAdmin]

    @extend_schema(
        tags=['Contatos'],
        summary="Listar contatos",
        responses={
            200: ContactResponseSerializer(many=True),
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Ainda não há contatos cadastrados"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def get(self, request):
        try:
            contacts = Contact.objects.all()

            if not contacts.exists():
                return Response(
                    {"message": "Ainda não há contatos cadastrados"},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = ContactResponseSerializer(contacts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao listar contatos: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @extend_schema(
        tags=['Contatos'],
        summary="Cadastrar contato",
        request=ContactSerializer,
        responses={
            201: ContactResponseSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def post(self, request):
        try:
            serializer = ContactSerializer(data=request.data)

            if serializer.is_valid():
                contact = serializer.save()
                return Response(
                    {
                        "message": "Contato cadastrado com sucesso.",
                        "contact": ContactResponseSerializer(contact).data
                    },
                    status=status.HTTP_201_CREATED
                )

            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao cadastrar contato: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@extend_schema(tags=['Contatos'])
class ContactDetailView(APIView):
    permission_classes = [IsAdmin]

    def get_contact_by_id(self, id):
        try:
            return Contact.objects.get(id=id)
        except Contact.DoesNotExist:
            return None

    @extend_schema(
        tags=['Contatos'],
        summary="Editar um contato",
        request=ContactSerializer,
        responses={
            200: ContactResponseSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Contato não encontrado."},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def put(self, request, id):
        try:
            contact = self.get_contact_by_id(id)

            if contact is None:
                return Response(
                    {"message": "Contato não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = ContactSerializer(contact, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Contato atualizado com sucesso.",
                        "contact": ContactResponseSerializer(contact).data
                    },
                    status=status.HTTP_200_OK
                )

            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao atualizar contato: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @extend_schema(
        tags=['Contatos'],
        summary="Remover um contato",
        responses={
            204: {"message": "Contato removido com sucesso."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Contato não encontrado"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def delete(self, request, id):
        try:
            contact = self.get_contact_by_id(id)

            if contact is None:
                return Response(
                    {"message": "Contato não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )

            contact.delete()
            return Response(
                {"message": "Contato removido com sucesso."},
                status=status.HTTP_204_NO_CONTENT
            )

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao remover contato: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
