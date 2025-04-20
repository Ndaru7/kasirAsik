from rest_framework import serializers
from .models import Cart, Product, Category, Transaction, DetailTransaction


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")


class ProductSerializers(serializers.ModelSerializer):
    category = CategorySerializers()

    class Meta:
        model = Product
        fields = ("id", "name", "price", "stock", "category")


class CartSerializers(serializers.ModelSerializer):
    product = ProductSerializers()

    class Meta:
        model = Cart
        fields = ("id", "product", "qty", "total_price")


class TransactionSerializers(serializers.ModelSerializer):
    cart = CartSerializers()

    class Meta:
        model = Transaction
        fields = ("id", "date", "cart")


class DetailTransactionSerializers(serializers.ModelSerializer):
    class Meta:
        model = DetailTransaction
        fields = ["id", "transaction", "product"]