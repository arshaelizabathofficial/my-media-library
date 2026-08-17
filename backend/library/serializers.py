from rest_framework import serializers
from .models import Item
from django.contrib.auth.models import User
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = [
        "id",
        "title",
        "creator",
        "type",
        "status",
        "rating",
        "favorite",
        "image",
        "owner",
        "created_at",
    ]

        read_only_fields = [
            "id",
            "owner",
            "created_at",
        ]
class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:
        model = User

        fields = [
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )

        return user