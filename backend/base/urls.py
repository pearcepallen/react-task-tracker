from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("tasks", views.tasks, name="tasks"),

    path("tasks/reminder/<str:task_id>", views.task_reminder, name="task-reminder"),
    path("tasks/delete/<str:task_id>", views.delete_task, name="task-delete"),

    path("tasks/new", views.new_task, name="new"),

    path("tasks/<str:task_id>", views.task, name="task"),

]