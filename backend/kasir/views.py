from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from django.contrib.auth.mixins import LoginRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import authenticate, login, logout
from .models import Product, Category, Transaction, Payment, DetailTransaction, Profile
from .serializers import (ProductSerializer,CategorySerializer,
                          TransactionSerializer, PaymentSerializer,
                          DetailTransactionSerializer, ProfileSerializer)
from .filters import TransactionFilter, ProductFilter


# Product views
class ProductViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter
    pagination_class = LimitOffsetPagination


# Category views
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]
    pagination_class = None


# Transaction views
class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = TransactionFilter
    pagination_class = None


# Payment Views
class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None


# Detail Transaction views
class DetailTransactionViewSet(viewsets.ModelViewSet):
    queryset = DetailTransaction.objects.all()
    serializer_class = DetailTransactionSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None


# Detail Transaction views
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

# Authentication view
class AuthViewSet(viewsets.ViewSet):

    @action(detail=False, methods=["post"])
    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        login(request=request, user=user)
        return Response({"message": "Login berhasil!"},
                        status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["post"])
    def logout(self, request):
        logout(request=request)
        return Response({"message": "Logout berhasil!"},
                        status=status.HTTP_200_OK)