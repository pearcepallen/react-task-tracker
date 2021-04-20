from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.TextField(blank=True)
    day = models.TextField(blank=True)
    reminder = models.BooleanField(default=False)
    

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "day": self.day,
            "reminder": self.reminder
        }