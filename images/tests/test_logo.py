from rest_framework.test import APITestCase

import os
from io import BytesIO
from PIL import Image

from authentication.factories import UserFactory
from profiles.factories import (
    ProfileStartupFactory,
    ProfileCompanyFactory,
)

from utils.dump_response import dump  # noqa


class TestLogoChange(APITestCase):
    @staticmethod
    def _generate_image(ext, size=(100, 100)):
        """for mocking png and jpeg files"""
        file = BytesIO()
        image = Image.new("RGB", size=size)
        formatext = ext.upper()
        image.save(file, formatext)
        file.name = f"test.{formatext}"
        file.seek(0)
        return file

    def setUp(self) -> None:
        self.right_image = self._generate_image("jpeg", (100, 100))
        self.wrong_image = self._generate_image("png", (8000, 10000))

        self.user = UserFactory(email="test1@test.com")
        self.company_dnipro = ProfileStartupFactory.create(
            person=self.user,
            name="Dnipro",
            logo_image=f"logos/{self.right_image.name}",
        )

        self.company_kyiv = ProfileCompanyFactory(name="Kyivbud")

    def tearDown(self) -> None:
        if os.path.exists(self.right_image.name):
            os.remove(self.right_image.name)
        if os.path.exists(self.wrong_image.name):
            os.remove(self.wrong_image.name)

    def test_get_empty_logo_unauthorized(self):
        response = self.client.get(path=f"/api/logo/{self.company_kyiv.id}/")
        self.assertEqual(200, response.status_code)
        self.assertEqual({"logo_image": None}, response.json())

    def test_get_logo_unauthorized(self):
        response = self.client.get(path=f"/api/logo/{self.company_dnipro.id}/")
        self.assertEqual(200, response.status_code)
        self.assertEqual(
            {
                "logo_image": f"http://testserver/media/logos/{self.right_image.name}"
            },
            response.json(),
        )

    def test_get_logo_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path=f"/api/logo/{self.company_dnipro.id}/")
        self.assertEqual(200, response.status_code)
        self.assertEqual(
            {
                "logo_image": f"http://testserver/media/logos/{self.right_image.name}"
            },
            response.json(),
        )

    def test_get_empty_logo_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path=f"/api/logo/{self.company_kyiv.id}/")
        self.assertEqual(200, response.status_code)
        self.assertEqual({"logo_image": None}, response.json())

    def test_put_logo_unauthorized(self):
        response = self.client.put(
            path=f"/api/logo/{self.company_dnipro.id}/",
            data={"logo_image": self.right_image},
        )
        self.assertEqual(401, response.status_code)
        self.assertEqual(
            {"detail": "Authentication credentials were not provided."},
            response.json(),
        )

    def test_put_logo_authorized_not_owner(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(
            path=f"/api/logo/{self.company_kyiv.id}/",
            data={"logo_image": self.right_image},
        )
        self.assertEqual(403, response.status_code)
        self.assertEqual(
            {"detail": "You do not have permission to perform this action."},
            response.json(),
        )

    def test_put_logo_authorized_owner_right_image(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(
            path=f"/api/logo/{self.company_dnipro.id}/",
            data={"logo_image": self.right_image},
        )
        self.assertEqual(200, response.status_code)

    def test_put_logo_authorized_owner_wrong_image(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(
            path=f"/api/logo/{self.company_dnipro.id}/",
            data={"logo_image": self.wrong_image},
        )
        self.assertEqual(400, response.status_code)
        self.assertEqual(
            {"logo_image": ["Image size exceeds the maximum allowed (10MB)."]},
            response.json(),
        )
