from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Cart, Product, Category, Transaction, DetailTransaction
from .serializers import (CartSerializers, ProductSerializers,
                          CategorySerializers, TransactionSerializers,
                          DetailTransactionSerializers)


# ==== Product views ==== #
class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    permission_classes = [AllowAny]


class ProductRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    lookup_url_kwarg = "product_id"
    permission_classes = [AllowAny]
# ======================= #


# ==== Category views ==== #
class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers
    permission_classes = [AllowAny]


class CategoryRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers
    lookup_url_kwarg = "category_id"
    permission_classes = [AllowAny]
# ======================== #


# ==== Cart views ==== #
class CartListView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializers
    permission_classes = [AllowAny]


class CartRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CartSerializers
    lookup_url_kwarg = "cart_id"
    permission_classes = [AllowAny]
# ==================== #


# ==== Transaction views ==== #
class TransactionListView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializers
    permission_classes = [AllowAny]


class TransactionRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializers
    lookup_url_kwarg = "transaction_id"
    permission_classes = [AllowAny]
# =========================== #


# ==== Detail Transaction views ==== #
class DetailTransactionListView(generics.ListCreateAPIView):
    queryset = DetailTransaction.objects.all()
    serializer_class = DetailTransactionSerializers
    permission_classes = [AllowAny]


class DetailTransactionRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DetailTransaction.objects.all()
    serializer_class = DetailTransactionSerializers
    lookup_url_kwarg = "detail_transaction_id"
    permission_classes = [AllowAny]
# =================================== #