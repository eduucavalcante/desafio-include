from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Portfolio, Project
import cloudinary.uploader

# Signal para deletar a imagem de um Portfolio quando o Portfolio for excluído
@receiver(post_delete, sender=Portfolio)
def delete_image_from_cloudinary(sender, instance, **kwargs):
    if instance.image:
        try:
            image_public_id = instance.image.split('/')[-1].split('.')[0]
            
            response = cloudinary.uploader.destroy(image_public_id, invalidate=True)
            if response.get('result') == 'ok':
                print(f"Imagem {image_public_id} excluída do Cloudinary.")
            else:
                print(f"Imagem {image_public_id} já foi removida ou erro ao excluir.")
        except Exception as e:
            print(f"Erro ao excluir a imagem do Cloudinary: {e}")

# Signal para deletar todas as imagens associadas ao Project quando o Project for excluído
@receiver(post_delete, sender=Project)
def delete_images_from_cloudinary(sender, instance, **kwargs):
    for portfolio in instance.portfolio_set.all():
        try:
            image_public_id = portfolio.image.split('/')[-1].split('.')[0]
            response = cloudinary.uploader.destroy(image_public_id, invalidate=True)
            if response.get('result') == 'ok':
                print(f"Imagem {image_public_id} excluída do Cloudinary.")
            else:
                print(f"Imagem {image_public_id} já foi removida ou erro ao excluir.")
        except Exception as e:
            print(f"Erro ao excluir a imagem do Cloudinary: {e}")
