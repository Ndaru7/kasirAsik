from rest_framework import serializers
from .models import Product, Category, Transaction, Payment, Cart


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
        fields = ("id", "product", "id_product", "qty")


class TransactionSerializer(serializers.ModelSerializer):
    items = CartSerializer(source="cart_items", many=True)
    total = serializers.IntegerField(read_only=True)

    class Meta:
        model = Transaction
        fields = ("id", "date", "items", "total")

    def create(self, validated_data):
        item_data = validated_data.pop("cart_items", [])
        transaction = Transaction.objects.create(**validated_data)

        # Validasi ketersediaan stok
        for item in item_data:
            product = item["product"]
            qty = item["qty"]

            if qty > product.stock:
                raise serializers.ValidationError(
                    f"Stok '{product.name}' tidak cukup gan. Jumlah produk {product.stock}, diminta {qty}. Ampun dahh"
                )

        # Setelah stock tersedia lanjutkan transaksi

        for item in item_data:
            product = item["product"]
            qty = item["qty"]

            Cart.objects.create(
                transaction=transaction,
                product=product,
                qty=qty
            )

            product.stock -= qty
            product.save()
        
        transaction.update_total()

        return transaction


class PaymentSerializer(serializers.ModelSerializer):
    transaction = TransactionSerializer(read_only=True)
    id_transaction = serializers.PrimaryKeyRelatedField(
        queryset = Transaction.objects.all(),
        source = "transaction",
        write_only=True,
    )

    class Meta:
        model = Payment
        fields = ("id", "transaction", "id_transaction", "amount", "change")
        read_only_fields = ("change",)