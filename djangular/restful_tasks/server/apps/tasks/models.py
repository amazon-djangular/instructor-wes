from django.db import models

# Create your models here.
class TaskManager(models.Manager):
    pass

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(default='')
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)