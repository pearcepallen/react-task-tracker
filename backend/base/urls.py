from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("tasks", views.tasks, name="tasks"),
    path("tasks/<str:task_id>", views.task, name="task"),
    path("new", views.new_task, name="new"),
    # path("reminder/<str:task_id>", views.reminder, name="reminder"),
    # path("delete/<str:task_id>", views.delete, name="delete")
]