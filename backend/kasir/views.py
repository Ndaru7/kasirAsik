from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Product, Category, Transaction, DetailTransaction
from .serializers import (ProductSerializer,CategorySerializer,
                          TransactionSerializer, DetailTransactionSerializer)


# Product views
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


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


# Detail Transaction views
class DetailTransactionViewSet(viewsets.ModelViewSet):
    queryset = DetailTransaction.objects.all()
    serializer_class = DetailTransactionSerializer
    permission_classes = [AllowAny]