from django.contrib import admin
from .models import Product, Category, Transaction, Payment


admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Transaction)
admin.site.register(Payment)