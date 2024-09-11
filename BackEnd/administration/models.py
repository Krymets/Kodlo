from django.db import models
from django.core.exceptions import ValidationError
from authentication.models import CustomUser
from profiles.models import Profile


def validate_auto_moderation_hours(value: int):
    if value < 1 or value > 48:
        raise ValidationError(
            "Кількість годин має бути в діапазоні 1-48 години"
        )


class AutoModeration(models.Model):
    auto_moderation_hours = models.PositiveSmallIntegerField(
        default=12, validators=[validate_auto_moderation_hours]
    )

    def save(
        self, *args, **kwargs
    ):  # we want to ensure, that there is only one db record for this
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def get_auto_moderation_hours(cls):
        obj, created = cls.objects.get_or_create(
            pk=1, defaults={"auto_moderation_hours": 12}
        )
        return obj


class AutoapproveTask(models.Model):
    celery_task_id = models.CharField()
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)


class ModerationEmail(models.Model):
    email_moderation = models.EmailField(unique=True)

    def __str__(self):
        return self.email_moderation
