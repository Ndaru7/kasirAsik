from rest_framework import serializers
from .models import Cart, Product, Category, Transaction, DetailTransaction


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    id_category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True
    )

    class Meta:
        model = Product
        fields = ("id", "name", "price", "stock", "category", "id_category")


class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    id_product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product",
        write_only=True
    )

    class Meta:
        model = Cart
        fields = ("id", "product", "id_product", "qty", "total_price")


class TransactionSerializer(serializers.ModelSerializer):
    items = CartSerializer(many=True)

    class Meta:
        model = Transaction
        fields = ("id", "date", "total", "items")

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        transaction = Transaction.objects.create(**validated_data)

        for item in items_data:
            Cart.objects.create(transaction=transaction, **item)

        return transaction


class DetailTransactionSerializer(serializers.ModelSerializer):
    transaction = CartSerializer(read_only=True)

    class Meta:
        model = DetailTransaction
        fields = ("id", "transaction")