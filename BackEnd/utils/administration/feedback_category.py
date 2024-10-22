from enum import Enum


class FeedbackCategory(Enum):
    TECHNICAL = "Технічне питання"
    RECOMMENDATION = "Рекомендації"
    QUESTION = "Питання"
    OTHER = "Інше"

    @classmethod
    def choices(cls):
        return [(category.value, category.value) for category in cls]
