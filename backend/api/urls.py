from django.urls import path
from .views import demo


urlpatterns = [
    path('demo/', demo.as_view()),
]