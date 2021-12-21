from django.db import models

# Create your models here.

class File(models.Model):
    file = models.FileField(blank=False, null=False)
    name = models.CharField(max_length=50, default='kot')
    date = models.DateTimeField(auto_now_add=True)
