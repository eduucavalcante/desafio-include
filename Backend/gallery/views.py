from drf_spectacular.utils import extend_schema
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Event, Achievement
from .serializers import EventSerializer, AchievementSerializer
from .permissions import HasPermission
import cloudinary.uploader

@extend_schema(tags=['Galeria'])
class EventView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        
        return [HasPermission()]
    
    @extend_schema(
        tags=['Galeria'],
        summary="Listar eventos",
        responses={
            200: EventSerializer(many=True),
            404: {"message": "Ainda não há eventos cadastrados"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def get(self, request):
        try:
            events = Event.objects.all()

            if not events.exists():
                return Response(
                    {"message": "Ainda não há eventos cadastrados"},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = EventSerializer(events, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao listar eventos: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
    @extend_schema(
        tags=['Galeria'],
        summary="Cadastrar evento",
        request=EventSerializer,
        responses={
            200: EventSerializer,
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

            serializer = EventSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Evento cadastrado com successo.",
                        "event": serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )
            
            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao criar evento: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@extend_schema(tags=['Galeria'])
class EventDetailView(APIView):
    permission_classes = [HasPermission]

    def get_event_by_id(self, id):
        try:
            return Event.objects.get(id=id)
        except Event.DoesNotExist:
            return None
    
    @extend_schema(
        summary="Atualizar um evento",
        request=EventSerializer,
        responses={
            200: EventSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Evento não encontrado"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def put(self, request, id):
        try:
            data = request.POST.dict()
            event = self.get_event_by_id(id)

            if event == None:
                return Response(
                    {"message": "Evento não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            new_image = request.FILES.get("image", None)
            old_public_id = event.image.split("/")[-1].split(".")[0] if event.image else None

            if new_image and old_public_id:
                cloudinary.uploader.destroy(old_public_id)
                upload_result = cloudinary.uploader.upload(request.FILES['image'])
                data['image'] = upload_result['secure_url']

            serializer = EventSerializer(event, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()

                return Response(
                    {
                        "message": "Evento editado com sucesso.",
                        "event": serializer.data,
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
        summary="Deletar um evento",
        responses={
            204: {"message": "Evento removido com sucesso."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Evento não encontrado"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def delete(self, request, id):
        try:
            event = self.get_event_by_id(id)

            if event == None:
                return Response(
                    {"message": "Evento não encontrado"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            if event.image:
                public_id = event.image.split("/")[-1].split(".")[0]
                cloudinary.uploader.destroy(public_id)
            
            event.delete()

            return Response(
                {"message": "Evento removido com sucesso."},
                status=status.HTTP_204_NO_CONTENT
            )
            
        except Exception as e:
            return Response(
                {"message:": f"Ocorreu um erro ao remover o evento: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@extend_schema(tags=['Galeria'])
class AchievementView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        
        return [HasPermission()]
    
    @extend_schema(
        tags=['Galeria'],
        summary="Listar reconhecimentos",
        responses={
            200: AchievementSerializer(many=True),
            404: {"message": "Ainda não há reconhecimentos cadastrados"},
            500: {"message": "Erro interno no servidor"},
        }
    )
    def get(self, request):
        try:
            achievements = Achievement.objects.all()

            if not achievements.exists():
                return Response(
                    {"message": "Ainda não há reconhecimentos cadastrados"},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = AchievementSerializer(achievements, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao listar reconhecimentos: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @extend_schema(
        tags=['Galeria'],
        summary="Cadastrar reconhecimento",
        request=AchievementSerializer,
        responses={
            200: AchievementSerializer,
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

            serializer = AchievementSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Reconhecimento cadastrado com successo.",
                        "achievement": serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )
            
            return Response(
                {"message": "Erro ao salvar. Dados inválidos ou campo obrigatório não preenchido."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        except Exception as e:
            return Response(
                {"message": f"Ocorreu um erro ao criar reconhecimento: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@extend_schema(tags=['Galeria'])
class AchievementDetailView(APIView):
    permission_classes = [HasPermission]

    def get_achievement_by_id(self, id):
        try:
            return Achievement.objects.get(id=id)
        except Achievement.DoesNotExist:
            return None
        
    @extend_schema(
        summary="Atualizar um reconhecimento",
        request=AchievementSerializer,
        responses={
            200: AchievementSerializer,
            400: {"message": "Dados inválidos ou campo obrigatório não preenchido."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Reconhecimento não encontrado"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def put(self, request, id):
        try:
            data = request.POST.dict()
            achievement = self.get_achievement_by_id(id)

            if achievement == None:
                return Response(
                    {"message": "Reconhecimento não encontrado."},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            new_image = request.FILES.get("image", None)
            old_public_id = achievement.image.split("/")[-1].split(".")[0] if achievement.image else None

            if new_image and old_public_id:
                cloudinary.uploader.destroy(old_public_id)
                upload_result = cloudinary.uploader.upload(request.FILES['image'])
                data['image'] = upload_result['secure_url']

            serializer = AchievementSerializer(achievement, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()

                return Response(
                    {
                        "message": "Reconhecimento editado com sucesso.",
                        "achievement": serializer.data,
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
        summary="Deletar um reconhecimento",
        responses={
            204: {"message": "Reconhecimento removido com sucesso."},
            401: {"message": "Unauthorized - Usuário não autenticado"},
            403: {"message": "Forbidden - Usuário não possui permissão"},
            404: {"message": "Reconhecimento não encontrado"},
            500: {"message": "Erro interno no servidor"}
        }
    )
    def delete(self, request, id):
        try:
            achievement = self.get_achievement_by_id(id)

            if achievement == None:
                return Response(
                    {"message": "Reconhecimento não encontrado"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            if achievement.image:
                public_id = achievement.image.split("/")[-1].split(".")[0]
                cloudinary.uploader.destroy(public_id)
            
            achievement.delete()

            return Response(
                {"message": "Reconhecimento removido com sucesso."},
                status=status.HTTP_204_NO_CONTENT
            )
            
        except Exception as e:
            return Response(
                {"message:": f"Ocorreu um erro ao remover o reconhecimento: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )