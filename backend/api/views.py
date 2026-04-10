from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response






class demo(APIView):
    def get(self, request):

        data = {
            "name": "John Doe"
        }

        return Response(data)
