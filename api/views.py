from django.shortcuts import render

from django.db.models import query
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import generics, status

from .models import File
from .serializers import FileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
# Create your views here.


class FileView(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer


class UploadFileView(APIView):
    serializer_class = FileSerializer
    

    def post(self, request, format=None):
        img = request.data['file']
        nam = request.data['name']

       
        plik = File(file=img,name=nam)
        plik.save()
        return Response('yup', status=status.HTTP_201_CREATED)
        


class DeleteFile(generics.DestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer