# budget/views.py

from rest_framework import viewsets, permissions
from .models import Budget
from .serializers import BudgetSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response

class BudgetViewSet(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
