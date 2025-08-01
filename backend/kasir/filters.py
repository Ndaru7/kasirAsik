from kasir.models import Product, Transaction
from django_filters import rest_framework as filters

class TransactionFilter(filters.FilterSet):
    date = filters.DateFilter(field_name="date", lookup_expr="date")
    start = filters.DateFilter(field_name="date", lookup_expr="gte")
    end = filters.DateFilter(field_name="date", lookup_expr="lte")

    class Meta:
        model = Transaction
        fields = ("date", "start", "end")

class ProductFilter(filters.FilterSet):
    category = filters.CharFilter(field_name="category__name", lookup_expr="icontains")
    search = filters.CharFilter(field_name="name", lookup_expr="icontains")

    class Meta:
        model = Product
        fields = ("category", "search")
