from rest_framework import serializers
from .models import Advantage

class AdvantageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advantage
        fields = '__all__'