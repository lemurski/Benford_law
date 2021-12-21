from django.db.models import fields
from rest_framework import serializers
from api import models


class FileSerializer(serializers.ModelSerializer):
    class Meta():
        model = models.File
        fields = ('id','file','name','date')


class UploadSerializer(serializers.ModelSerializer):
    class Meta():
        model = models.File
        fields = ('file')