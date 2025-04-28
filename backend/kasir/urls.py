from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet, CategoryViewSet, TransactionViewSet,
    PaymentViewSet,DetailTransactionViewSet
)


router = DefaultRouter()
router.register(r"products", ProductViewSet)
router.register(r"category", CategoryViewSet)
router.register(r"transaction", TransactionViewSet)
router.register(r"payment", PaymentViewSet)
router.register(r"detail_transaction", DetailTransactionViewSet)


urlpatterns = [
    path("", include(router.urls))
]