from rest_framework import viewsets, status
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from django.contrib.auth.mixins import LoginRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import authenticate
from django.contrib.auth import logout as logout_view
from .models import Product, Category, Transaction, Payment
from .serializers import (ProductSerializer,CategorySerializer,
                          TransactionSerializer, PaymentSerializer)
from .filters import TransactionFilter, ProductFilter


# Product views
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [DjangoModelPermissions]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter
    pagination_class = LimitOffsetPagination


# Category views
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [DjangoModelPermissions]
    pagination_class = None


# Transaction views
class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [DjangoModelPermissions]
    filter_backends = [DjangoFilterBackend]
    filterset_class = TransactionFilter
    pagination_class = None


# Payment Views
class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [DjangoModelPermissions]
    pagination_class = None


# Authentication view
class AuthViewSet(viewsets.ViewSet):

    @action(detail=False, methods=["post"])
    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "Login Berhasil",
                             "token": token.key})
        
        return Response({"error": "Ada yang salah!"},
                        status=status.HTTP_401_UNAUTHORIZED)
    
    @action(detail=False, methods=["post"])
    def logout(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Logout berhasil!"},
                        status=status.HTTP_200_OK)