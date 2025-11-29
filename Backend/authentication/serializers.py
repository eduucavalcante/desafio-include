from rest_framework import serializers

class AuthSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()

class AuthResponseSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()
    permission = serializers.CharField()
    role = serializers.CharField()