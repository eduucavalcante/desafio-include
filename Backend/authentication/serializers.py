from rest_framework import serializers

class AuthSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class AuthResponseSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    permission = serializers.CharField()
    role = serializers.CharField()