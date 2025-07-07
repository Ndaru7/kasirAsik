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
    product = models.ManyToManyField(Product)
    qty = models.PositiveIntegerField()
    total_price = models.PositiveIntegerField()

    def __str__(self):
        return f"Transaction #{self.id} - {self.date}"
    

class Payment(models.Model):
    transaction = models.OneToOneField(Transaction, on_delete=models.CASCADE, related_name="payment")
    amount = models.PositiveIntegerField()
    change = models.PositiveIntegerField()

    def save(self, *args, **kwargs):
        self.change = self.amount - self.transaction.total_price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Payment for transaction {self.transaction.pk}"