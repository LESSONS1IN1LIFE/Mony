# budget/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Budget

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['id', 'income', 'expenses', 'savings', 'date']
