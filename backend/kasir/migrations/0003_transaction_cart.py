# Generated by Django 5.1.7 on 2025-04-13 14:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kasir', '0002_remove_cart_amount_remove_detailtransaction_amount_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='cart',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='kasir.cart'),
            preserve_default=False,
        ),
    ]
