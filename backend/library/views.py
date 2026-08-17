from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Item
from .serializers import ItemSerializer


# =========================
# MEDIA ITEMS
# =========================

@api_view(["GET", "POST"])
def item_list(request):

    if request.method == "GET":

        items = Item.objects.all()

        serializer = ItemSerializer(
            items,
            many=True
        )

        return Response(serializer.data)


    if request.method == "POST":

        serializer = ItemSerializer(
            data=request.data
        )

        if serializer.is_valid():

            item = serializer.save()

            return Response(
                ItemSerializer(item).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# =========================
# REGISTER
# =========================

@api_view(["POST"])
def register(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not password:

        return Response(
            {
                "error": "Username and password are required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(
        username=username
    ).exists():

        return Response(
            {
                "error": "Username already exists."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email or "",
        password=password
    )

    return Response(
        {
            "message": "Account created successfully.",
            "username": user.username
        },
        status=status.HTTP_201_CREATED
    )


# =========================
# LOGIN
# =========================

@api_view(["POST"])
def login_view(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user is None:

        return Response(
            {
                "error": "Invalid username or password."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    return Response(
        {
            "message": "Login successful.",
            "username": user.username
        }
    )