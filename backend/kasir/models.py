from django.db import models


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
    

class DetailTransaction(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name="transaction")

    def __str__(self):
        return f"Transaction at {self.transaction.date}"