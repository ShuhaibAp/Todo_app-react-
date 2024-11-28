from django.db import models

# Create your models here.
class TodoModel(models.Model):
    title=models.CharField(max_length=100)
    desc=models.TextField()
    due_date=models.DateField()
    STATUS_OPTIONS = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]
    status=models.CharField(max_length=30,choices=STATUS_OPTIONS,default="Pending")