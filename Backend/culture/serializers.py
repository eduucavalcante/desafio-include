from rest_framework import serializers
from .models import culture

class CultureSerializers(serializers.ModelSerializers):
    class Meta:
        model = culture
        fields = '__all__'