from django.shortcuts import render
import pandas as pd
import json
import os
import csv

from django.db.models import query
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import generics, status

from .data import main
from .models import File
from .serializers import FileSerializer, DataSerializer, ListSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
# Create your views here.

def head(file):
    
    
    with open(file,'r') as data:
        line = data.readline()
        while line == '\n':
            line = data.readline()

    sniffer = csv.Sniffer()
    dialect = sniffer.sniff(line)

    df = pd.read_table(file,sep=dialect.delimiter)
    
    lst = []

    for col in df.columns:
        lst.append(col)

    lst = json.dumps(lst)

    return lst

class FileView(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

class GetColumns(APIView):

    def post(self,request, format=None):
        
        img = request.data['file']
        nam = request.data['name']
        nam = nam.replace(' ', '_')
        plik = File(file=img,name=nam)
        plik.save()

        columns = head(nam)

        File.objects.filter(name=nam).delete()

        if os.path.exists(nam):
            os.remove(nam)
            print('deleted')
        else:
            print("The file does not exist")

        return Response(columns)



class UploadFileView(APIView):
    serializer_class = DataSerializer
    

    def post(self, request, format=None):
        img = request.data['file']
        nam = request.data['name']
        col = request.data['column']

        nam = nam.replace(' ', '_')
       
        plik = File(file=img,name=nam,column=col)
        plik.save()


        data = main(nam,col)

        json_data = json.dumps(data)

        file = File.objects.get(name=nam)
        file.percentages = json_data
        file.save()

        print(json_data)
        print(nam)
        print(col)

        if os.path.exists(nam):
            os.remove(nam)
        else:
            print("The file does not exist")


        return Response(json_data, status=status.HTTP_201_CREATED)
        


class DeleteFile(generics.DestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer


class GetUploadedGraph(APIView):
    def get(self, request,format=None):
        # name = request.data['name']

        model = File.objects.filter(name='census_2009b.dms')

        serializer = ListSerializer(model,many=True)

        return Response(serializer.data,status.HTTP_200_OK)

class ListFiles(APIView):
    
    def get(self, request, format=None):

        queryset = File.objects.all()
        serializer = ListSerializer(queryset,many=True)

          


        return Response(serializer.data, status=status.HTTP_200_OK)