from django.urls import path
from api import views



urlpatterns = [
    path('', views.FileView.as_view()),
    path('upload', views.UploadFileView.as_view()),
    path('list', views.ListFiles.as_view()),
    path('columns', views.GetColumns.as_view()),
    path('delete', views.DeleteFile.as_view()),
    path('graph', views.GetUploadedGraph.as_view())

]

