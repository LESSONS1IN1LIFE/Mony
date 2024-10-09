# budget/models.py

from django.contrib.auth.models import User
from django.db import models

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets')
    income = models.DecimalField(max_digits=10, decimal_places=2)
    expenses = models.DecimalField(max_digits=10, decimal_places=2)
    savings = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.date}"
