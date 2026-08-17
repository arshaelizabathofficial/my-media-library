from django.db import models
from django.contrib.auth.models import User


class Item(models.Model):

    TYPE_CHOICES = [
        ("Movie", "Movie"),
        ("TV show", "TV show"),
        ("Book", "Book"),
    ]

    STATUS_CHOICES = [
        ("Unfinished", "Unfinished"),
        ("Finished", "Finished"),
    ]

    title = models.CharField(max_length=255)

    creator = models.CharField(
        max_length=255,
        blank=True
    )

    type = models.CharField(
        max_length=10,
        choices=TYPE_CHOICES
    )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="Unfinished"
    )

    rating = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    favorite = models.BooleanField(
        default=False
    )

    owner = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    null=True,
    blank=True
)
    image = models.URLField(
    blank=True,
    null=True
)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title