from django.urls import path
from .views import AccountRegistrationView, AccountLoginView, UserListView


urlpatterns = [
    path("auth/register/", AccountRegistrationView.as_view(), name="register"),
    path("auth/login/", AccountLoginView.as_view(), name="login"),
    path("auth/users/", UserListView.as_view(), name="user-list"),
]