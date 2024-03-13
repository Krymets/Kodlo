from rest_framework.generics import (
    RetrieveUpdateAPIView,
)
from rest_framework.parsers import MultiPartParser, FormParser
from drf_spectacular.utils import extend_schema_view, extend_schema

from profiles.permissions import UserIsProfileOwnerOrReadOnly
from profiles.models import Profile
from .serializers import BannerSerializer, LogoSerializer
from utils.completeness_counter import completeness_count


@extend_schema_view(
    put=extend_schema(
        request={
            "multipart/form-data": {
                "type": "object",
                "properties": {
                    "banner_image": {"type": "string", "format": "binary"},
                },
            }
        },
        responses={
            200: BannerSerializer,
        },
    ),
    patch=extend_schema(
        request={
            "multipart/form-data": {
                "type": "object",
                "properties": {
                    "banner_image": {"type": "string", "format": "binary"},
                },
            }
        },
        responses={
            200: BannerSerializer,
        },
    ),
)
class BannerRetrieveUpdate(RetrieveUpdateAPIView):
    permission_classes = (UserIsProfileOwnerOrReadOnly,)
    serializer_class = BannerSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = Profile.objects.active_only()

    def perform_update(self, serializer):
        completeness_count(serializer)


@extend_schema_view(
    put=extend_schema(
        request={
            "multipart/form-data": {
                "type": "object",
                "properties": {
                    "logo_image": {"type": "string", "format": "binary"},
                },
            }
        },
        responses={
            200: LogoSerializer,
        },
    ),
    patch=extend_schema(
        request={
            "multipart/form-data": {
                "type": "object",
                "properties": {
                    "logo_image": {"type": "string", "format": "binary"},
                },
            }
        },
        responses={
            200: LogoSerializer,
        },
    ),
)
class LogoRetrieveUpdate(RetrieveUpdateAPIView):
    permission_classes = (UserIsProfileOwnerOrReadOnly,)
    serializer_class = LogoSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = Profile.objects.active_only()

    def perform_update(self, serializer):
        completeness_count(serializer)
