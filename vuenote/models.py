from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Note(models.Model):
    title = models.CharField(max_length=255, unique=True)
    content = models.TextField()
    owner = models.ForeignKey(
        User, related_name="notes", on_delete=models.CASCADE, null=True)
    created = models.DateTimeField(auto_created=True, auto_now_add=True)

    def __str__(self):
        return self.title
