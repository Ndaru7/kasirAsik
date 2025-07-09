from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from kasir.models import Product, Category, Transaction, Payment, User


class CustomUser(UserAdmin):
    model = User
    list_display = UserAdmin.list_display + ("role",)
    fieldsets = UserAdmin.fieldsets + (
        (None, {
            "fields": ("role",),
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {
            "fields": ("role",),
        }),
    )

admin.site.register(User, CustomUser)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Transaction)
admin.site.register(Payment)