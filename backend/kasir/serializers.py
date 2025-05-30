from rest_framework import serializers
from .models import Cart, Product, Category, Transaction, Payment, DetailTransaction, Profile


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
    total_price = serializers.IntegerField(read_only=True)

    class Meta:
        model = Cart
        fields = ("id", "product", "id_product", "qty", "total_price")


class TransactionSerializer(serializers.ModelSerializer):
    items = CartSerializer(many=True)
    total = serializers.IntegerField(read_only=True)

    class Meta:
        model = Transaction
        fields = ("id", "date", "total", "items")

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        total_transaction = 0

        # Validasi ketersediaan stok
        for item in items_data:
            product = item["product"]
            qty = item["qty"]

            if qty > product.stock:
                raise serializers.ValidationError(
                    f"Stok '{product.name}' tidak cukup gan. Jumlah produk {product.stock}, diminta {qty}. Ampun dahh"
                )

        # Setelah stock tersedia lanjutkan transaksi
        transaction = Transaction.objects.create(total=0)

        for item in items_data:
            product = item["product"]
            qty = item["qty"]
            total_price = product.price * qty
            total_transaction += total_price

            product.stock -= qty
            product.save()

            Cart.objects.create(
                transaction=transaction,
                product=product,
                qty=qty,
                total_price=total_price
            )
        
        transaction.total = total_transaction
        transaction.save()

        return transaction


class PaymentSerializer(serializers.ModelSerializer):
    id_transaction = serializers.PrimaryKeyRelatedField(
        queryset = Transaction.objects.all(),
        source = "transaction"
    )

    class Meta:
        model = Payment
        fields = ("id", "id_transaction", "amount", "total", "change")
        read_only_fields = ("total", "change")
    
    def create(self, validated_data):
        transaction = validated_data["transaction"]

        if validated_data["amount"] < transaction.total:
            raise serializers.ValidationError("Uang bayar kurang dari total")

        if hasattr(transaction, "payment"):
            raise serializers.ValidationError("Transaksi sudah pernah dilakukan.")

        return super().create(validated_data)


class DetailTransactionSerializer(serializers.ModelSerializer):
    transaction = CartSerializer(read_only=True)

    class Meta:
        model = DetailTransaction
        fields = ("id", "transaction")


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("id", "name", "nim", "role", "foto")