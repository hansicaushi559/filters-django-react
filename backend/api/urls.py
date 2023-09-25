from .views import EmployeeView
from django.urls import path


urlpatterns = [
    path("", EmployeeView.as_view(), name='employeelist')
]

