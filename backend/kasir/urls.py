from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet, CategoryViewSet, TransactionViewSet,
    PaymentViewSet,DetailTransactionViewSet, ProfileViewSet,
    AuthViewSet
)


router = DefaultRouter()
router.register(r"products", ProductViewSet)
router.register(r"category", CategoryViewSet)
router.register(r"transaction", TransactionViewSet)
router.register(r"payment", PaymentViewSet)
router.register(r"detail_transaction", DetailTransactionViewSet)
router.register(r"profile", ProfileViewSet)
router.register(r"auth", AuthViewSet, basename="auth")


urlpatterns = [
    path("", include(router.urls))
]