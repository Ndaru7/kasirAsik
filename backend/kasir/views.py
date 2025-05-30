from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Category, Transaction, Payment, DetailTransaction, Profile
from .serializers import (ProductSerializer,CategorySerializer,
                          TransactionSerializer, PaymentSerializer,
                          DetailTransactionSerializer, ProfileSerializer)
from .filters import TransactionFilter, ProductFilter


# Product views
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter


# Category views
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


# Transaction views
class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_class = TransactionFilter


# Payment Views
class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [AllowAny]


# Detail Transaction views
class DetailTransactionViewSet(viewsets.ModelViewSet):
    queryset = DetailTransaction.objects.all()
    serializer_class = DetailTransactionSerializer
    permission_classes = [AllowAny]


# Detail Transaction views
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]