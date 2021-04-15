import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import *
from base.serializers import *
# Create your views here.

def index(request):
    return HttpResponse("Hello, world!")



@api_view(['GET'])
def tasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)



@csrf_exempt
def task(request, task_id):
    task = Task.objects.get(id=task_id)
    if request.method == "DELETE":
        task.delete()
        # return HttpResponse(status=200)

    if request.method == "PUT":
        data = json.loads(request.body)
        task.reminder = data.get("reminder", "")
        task.save()
        # return HttpResponse(status=204)


    return JsonResponse([task.serialize()], safe=False)



@csrf_exempt
def new_task(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=400)

    data = json.loads(request.body)
    text = data.get("text", "")
    day = data.get("day", "")
    reminder = data.get("reminder", "")

    Task(text=text, day=day, reminder=reminder).save()
    return JsonResponse({"message": "Task was added successfully"}, status=201)


# @csrf_exempt
# def reminder(request, task_id):
#     if request.method != "PUT":
#         return JsonResponse({"error": "PUT request required"}, status=400)
    
#     task = Task.objects.get(id=task_id)
#     data = json.loads(request.body)
#     task.reminder = data.get("reminder", "")
#     task.save()
#     return HttpResponse(status=204)


# @csrf_exempt
# def delete(request, task_id):
#     if request.method != "DELETE":
#         return JsonResponse({"error": "DELETE request required"}, status=400)

#     task = Task.objects.get(id=task_id)
#     task.delete()
#     return HttpResponse(status=200)