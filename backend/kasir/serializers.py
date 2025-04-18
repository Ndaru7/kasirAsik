from rest_framework import serializers
from .models import Cart, Product, Category, Transaction, DetailTransaction


class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price", "stock", "category"]


class CartSerializers(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["id", "product", "qty", "total_price"]


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class TransactionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["id", "date", "cart"]


class DetailTransactionSerializers(serializers.ModelSerializer):
    class Meta:
        model = DetailTransaction
        fields = ["id", "transaction", "product"]