from rest_framework import serializers
from .models import *

class TodoSerial(serializers.ModelSerializer):
    class Meta:
        model=TodoModel
        fields="__all__"

