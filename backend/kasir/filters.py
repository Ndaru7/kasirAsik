from .models import Product, Transaction
from django_filters import rest_framework as filters

class TransactionFilter(filters.FilterSet):
    date = filters.DateFilter(field_name="date", lookup_expr="date")
    start = filters.DateFilter(field_name="start", lookup_expr="gte")
    end = filters.DateFilter(field_name="end", lookup_expr="lte")
    product_name = filters.CharFilter(field_name="items__product__name", lookup_expr="icontains")

    class Meta:
        model = Transaction
        fields = ("date", "start", "end", "product_name")