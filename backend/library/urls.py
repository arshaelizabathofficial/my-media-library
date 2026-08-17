from django.urls import path
from . import views


urlpatterns = [

    # Media items
    path(
        "items/",
        views.item_list,
        name="item-list"
    ),

    # Authentication
    path(
        "login/",
        views.login_view,
        name="login"
    ),

    path(
        "register/",
        views.register,
        name="register"
    ),

]
