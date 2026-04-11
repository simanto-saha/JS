from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import UserDetails, ReciverBoy, ReciverHistory, OrderHistory, CustomerPayment
from .serializers import (
    UserDetailsSerializer,
    ReciverBoySerializer,
    ReciverHistorySerializer,
    OrderHistorySerializer,
    CustomerPaymentSerializer,
)


class AccountRegistrationView(APIView):
    def post(self, request):
        serializer = UserDetailsSerializer(data=request.data)
        if serializer.is_valid():
            user_details = serializer.save()
            token, _ = Token.objects.get_or_create(user=user_details.user)  # user_details.user
            return Response(
                {
                    "message": "Registration successful.",
                    "token": token.key,
                },
                status=status.HTTP_201_CREATED,
            )
        print("ERRORS:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountLoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(username=username, password=password)

        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "message": "Login successful.",
                    "token": token.key,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    },
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {"error": "Invalid username or password."},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

class UserListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = UserDetails.objects.select_related('user').all()
        data = [
            {
                "id": u.user.id,
                "username": u.user.username,
                "email": u.user.email,
                "name": u.name,
                "phone_number": u.phone_number,
                "address": u.address,
            }
            for u in users
        ]
        return Response(data, status=status.HTTP_200_OK)