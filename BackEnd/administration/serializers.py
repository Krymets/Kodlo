from django.contrib.auth import get_user_model
from rest_framework import serializers
from utils.administration.feedback_category import FeedbackCategory
from authentication.models import CustomUser
from profiles.models import (
    Profile,
    Region,
)
from utils.administration.create_password import generate_password
from utils.administration.send_email import send_email_about_admin_registration
from .models import AutoModeration, ModerationEmail, ContactInformation
from BackEnd.validation.validate_phone_number import (
    validate_phone_number_len,
    validate_phone_number_is_digit,
)
from BackEnd.validation.validate_adress import validate_address
from BackEnd.validation.validate_company import validate_company_name

User = get_user_model()


class AdminRegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = (
            "id",
            "name_ukr",
        )


class AdminRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(
        write_only=True,
    )

    def validate(self, value):
        email = value.get("email").lower()

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {"email": "Email is already registered"}
            )

        return value

    def create(self, validated_data):
        email = validated_data.get("email")
        password = generate_password()
        admin = User.objects.create(
            email=email,
            is_staff=True,
            is_active=True,
        )
        admin.set_password(password)
        admin.save()
        send_email_about_admin_registration(email, password)
        return admin


class AdminUserListSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()
    registration_date = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "email",
            "name",
            "surname",
            "status",
            "company_name",
            "registration_date",
        )

    def get_company_name(self, obj) -> str:
        return obj.profile.name if hasattr(obj, "profile") else None

    def get_registration_date(self, obj) -> str:
        return obj.profile.created_at if hasattr(obj, "profile") else None

    def get_status(self, obj) -> dict:
        data = {
            "is_active": obj.is_active,
            "is_staff": obj.is_staff,
            "is_superuser": obj.is_superuser,
            "is_deleted": obj.email.startswith("is_deleted_"),
        }
        return data


class AdminUserDetailSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = (
            "name",
            "surname",
            "email",
            "is_active",
            "is_staff",
            "is_superuser",
            "company_name",
        )

    def get_company_name(self, obj) -> bool:
        return True if hasattr(obj, "profile") else False


class AdminCompanyListSerializer(serializers.ModelSerializer):
    person = AdminUserDetailSerializer(read_only=True)
    regions = AdminRegionSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = (
            "id",
            "name",
            "is_registered",
            "is_startup",
            "person",
            "person_position",
            "regions",
            "official_name",
            "phone",
            "edrpou",
            "address",
            "is_deleted",
        )


class AdminCompanyDetailSerializer(serializers.ModelSerializer):
    person = AdminUserDetailSerializer(read_only=True)
    categories = serializers.SlugRelatedField(
        many=True, slug_field="name", read_only=True
    )
    activities = serializers.SlugRelatedField(
        many=True, slug_field="name", read_only=True
    )
    regions = AdminRegionSerializer(many=True, read_only=True)
    banner_image = serializers.ImageField(
        source="banner.image_path", required=False
    )
    logo_image = serializers.ImageField(
        source="logo.image_path", required=False
    )
    banner_approved_image = serializers.ImageField(
        source="banner_approved.image_path", required=False
    )
    logo_approved_image = serializers.ImageField(
        source="logo_approved.image_path", required=False
    )

    class Meta:
        model = Profile
        fields = (
            "name",
            "is_registered",
            "is_startup",
            "categories",
            "activities",
            "person",
            "person_position",
            "official_name",
            "regions",
            "common_info",
            "phone",
            "edrpou",
            "founded",
            "service_info",
            "product_info",
            "address",
            "startup_idea",
            "banner",
            "logo",
            "banner_approved",
            "logo_approved",
            "banner_image",
            "banner_approved_image",
            "logo_image",
            "logo_approved_image",
            "is_deleted",
        )


class AutoModerationHoursSerializer(serializers.ModelSerializer):
    auto_moderation_hours = serializers.IntegerField(min_value=1, max_value=48)

    class Meta:
        model = AutoModeration
        fields = ("auto_moderation_hours",)


class ModerationEmailSerializer(serializers.ModelSerializer):
    email_moderation = serializers.EmailField()

    class Meta:
        model = ModerationEmail
        fields = ["email_moderation"]


class FeedbackSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True,
        error_messages={"required": "Please provide a valid email address."},
    )
    message = serializers.CharField(
        min_length=10,
        required=True,
        error_messages={
            "required": "Message cannot be empty.",
            "min_length": "Message must be at least 10 characters long.",
        },
    )
    category = serializers.ChoiceField(
        choices=FeedbackCategory.choices(),
        required=True,
        error_messages={"required": "Please select a category."},
    )


class StatisticsSerializer(serializers.Serializer):
    companies_count = serializers.IntegerField()
    investors_count = serializers.IntegerField()
    startups_count = serializers.IntegerField()
    blocked_companies_count = serializers.IntegerField()


class ContactInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInformation
        fields = ['company_name', 'address', 'email', 'phone', 'updated_at', 'admin_user']
        read_only_fields = ['updated_at', 'admin_user']

    def validate_phone(self, value):
        """
        Validate phone field using imported validators.
        """
        validate_phone_number_len(value)
        validate_phone_number_is_digit(value)
        return value

    def validate_address(self, value):
        """
        Validate address field.
        """
        validate_address(value)
        return value

    def validate_company_name(self, value):
        """
        Validate company name field.
        """
        validate_company_name(value)
        return value