from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from .models import *
from rest_framework.response import Response

# Create your views here.

class TodoView(ModelViewSet):
    serializer_class=TodoSerial
    queryset=TodoModel.objects.all()
    filter_backends=[DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields=['status']
    ordering_fields=['due_date']
    search_fields=['title']
