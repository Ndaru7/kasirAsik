from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    USER_ROLE = (
        ("Admin", "admin"),
        ("Kasir", "kasir"),
    )
    role = models.CharField(max_length=20, choices=USER_ROLE)

class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.PositiveIntegerField()
    stock = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="category")

    def __str__(self):
        return self.name
    
    
class Transaction(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    total = models.PositiveIntegerField()

    def __str__(self):
        return f"Transaction #{self.id} - {self.date}"
    

class Cart(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product")
    qty = models.PositiveIntegerField(default=0)
    total_price = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.product.name} x {self.qty}"
    

class Payment(models.Model):
    transaction = models.OneToOneField(Transaction, on_delete=models.CASCADE, related_name="payment")
    amount = models.PositiveIntegerField()
    total = models.PositiveIntegerField()
    change = models.PositiveIntegerField()

    def save(self, *args, **kwargs):
        if not self.total:
            self.total = self.transaction.total
        self.change = self.amount - self.total
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Payment for transaction {self.transaction.id}"
    

class DetailTransaction(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name="transaction")

    def __str__(self):
        return f"Transaction at {self.transaction.date}"
    

class Profile(models.Model):
    name = models.CharField(max_length=200)
    nim = models.PositiveIntegerField()
    role = models.CharField(max_length=200)
    foto = models.ImageField(upload_to="images")

    def __str__(self):
        return f"{self.name}({self.nim})"