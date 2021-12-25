from django.db.models import fields
from rest_framework import serializers
from api import models



class FileSerializer(serializers.ModelSerializer):
    class Meta():
        model = models.File
        fields = ('id','file','name','date','percentages','column')


class UploadSerializer(serializers.ModelSerializer):
    class Meta():
        model = models.File
        fields = ('file')

class DataSerializer(serializers.Serializer):
    data = serializers.ListField()

class ListSerializer(serializers.ModelSerializer):
    class Meta():
        model = models.File
        fields = ('name','percentages','column')