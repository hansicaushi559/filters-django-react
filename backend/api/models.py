from django.db import models

# Create your models here.

class Employee(models.Model):
    CATEGORY = [
        ('Java', 'Java'),
        ('Python', 'Python'),
        ('.NET', '.NET'),
        ('Testing', 'Testing'),
        ('Salesforce', 'Salesforce'),
        ('Deployment', 'Deployment'),
        ('DevOps', 'DevOps'),
        ('Cybersecurity', 'Cybersecurity'),
        ('DataScience', 'DataScience')
    ]

    name = models.CharField(max_length=50)
    age = models.IntegerField()
    skills = models.CharField(max_length=20, choices=CATEGORY)


    def __str__(self):
        return self.name