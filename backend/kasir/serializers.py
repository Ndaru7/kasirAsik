from rest_framework import serializers
from .models import Cart, Product, Category, Transaction, DetailTransaction


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")


class ProductSerializers(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ("id", "name", "price", "stock", "id_category")


class CartSerializers(serializers.ModelSerializer):
    # product = ProductSerializers(read_only=True)

    class Meta:
        model = Cart
        fields = ("id", "product", "qty")


class TransactionSerializers(serializers.ModelSerializer):
    # cart = CartSerializers(read_only=True)

    class Meta:
        model = Transaction
        fields = ("id", "date", "cart", "total_price")


class DetailTransactionSerializers(serializers.ModelSerializer):
    transaction = TransactionSerializers()

    class Meta:
        model = DetailTransaction
        fields = ("id", "transaction")