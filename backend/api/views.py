from django.shortcuts import render
from .serializers import EmployeeSerializer
from rest_framework import generics
from .models import Employee
from rest_framework import filters
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination

# Create your views here.
class CustomPageNumberPagination(PageNumberPagination):
    page_size = 5 



class EmployeeView(generics.ListCreateAPIView):
    #queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name']
    pagination_class = CustomPageNumberPagination
    
    def get_queryset(self):
        category = self.request.query_params.get('category')
        age_range = self.request.query_params.get('age_range')
        if category:
            return Employee.objects.filter(skills__icontains=category)
        
        if age_range:
            min_age = int(age_range)
            return Employee.objects.filter(age__gte=min_age)

        return Employee.objects.all()

    