from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    USER_ROLE = (
        ("admin", "Admin"),
        ("kasir", "Kasir"),
    )
    role = models.CharField(max_length=20, choices=USER_ROLE)

    def get_role(self):
        return self.role

class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.PositiveIntegerField()
    stock = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    
class Transaction(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    product = models.ManyToManyField(Product, through="Cart")
    total = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Transaction #{self.id} - {self.date}"

    def update_total(self):
        self.total = sum(
            item.product.price * item.qty for item in self.cart_items.all()
        )
        self.save(update_fields=["total"])
    
class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name="cart_items")
    qty = models.PositiveIntegerField()


class Payment(models.Model):
    transaction = models.OneToOneField(Transaction, on_delete=models.CASCADE, related_name="payment")
    amount = models.PositiveIntegerField()
    change = models.PositiveIntegerField()

    def save(self, *args, **kwargs):
        self.change = self.amount - self.transaction.total
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Payment for transaction {self.transaction.pk}"