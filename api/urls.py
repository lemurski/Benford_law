from django.urls import path
from api import views

urlpatterns = [
    path('', views.FileView.as_view()),
    path('upload', views.UploadFileView.as_view()),
    path('delete', views.DeleteFile.as_view())

]

