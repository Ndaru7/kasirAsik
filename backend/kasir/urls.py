from django.urls import path, include
from rest_framework.routers import DefaultRouter
from kasir.views import (
    ProductViewSet, CategoryViewSet, TransactionViewSet,
    PaymentViewSet, AuthViewSet, UserViewSet
)


router = DefaultRouter()
router.register(r"products", ProductViewSet)
router.register(r"category", CategoryViewSet)
router.register(r"transaction", TransactionViewSet)
router.register(r"payment", PaymentViewSet)
router.register(r"auth", AuthViewSet, basename="auth")
router.register(r"", UserViewSet, basename="me")


urlpatterns = [
    path("", include(router.urls))
]