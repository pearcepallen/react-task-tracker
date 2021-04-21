import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import *
from base.serializers import *
# Create your views here.

def index(request):
    return HttpResponse("Hello, world!")

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@csrf_exempt
def tasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)



@api_view(['GET'])
@csrf_exempt
def task(request, task_id):
    task = Task.objects.get(id=task_id)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
@csrf_exempt
def delete_task(request, task_id):
    task = Task.objects.get(id=task_id)
    task.delete()
    return HttpResponse(status=200)



@api_view(['PUT'])
@csrf_exempt
def task_reminder(request, task_id):
    task = Task.objects.get(id=task_id)
    task.reminder = not task.reminder
    task.save()
    return HttpResponse(status=204)



@api_view(['POST'])
def new_task(request):
    data = request.data
    
    text = data['text']
    day = data['day']
    reminder = data['reminder']

    Task(text=text, day=day, reminder=reminder).save()
    return JsonResponse({"message": "Task was added successfully"}, status=201)




