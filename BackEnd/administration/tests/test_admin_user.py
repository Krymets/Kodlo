from rest_framework import status
from rest_framework.test import APITestCase

from administration.factories import (
    AdminUserFactory,
    AdminProfileFactory,
    SuperUserFactory,
)
from utils.dump_response import dump  # noqa


class TestAdminUsersAPITestsNotStaff(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory(
            is_staff=False,
            is_active=True,
        )

    def test_get_users_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/users/?page=1&page_size=1")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_get_user_id_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path=f"/api/admin/users/{self.user.id}/")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)


class TestAdminUsersOrderingFilterAPITests(APITestCase):
    def setUp(self):
        self.users = AdminUserFactory.create_batch(2)
        AdminUserFactory.reset_sequence(1)
        self.user = self.users[0]

    def test_get_users_ordering_default(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/users/")
        data = [
            {
                "id": 2,
                "email": "test2@test.com",
                "name": "Test person 2",
                "surname": "Test person 2 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                    "is_inactive": False,
                },
                "company_name": None,
                "registration_date": None,
            },
            {
                "id": 3,
                "email": "test3@test.com",
                "name": "Test person 3",
                "surname": "Test person 3 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                    "is_inactive": False,
                },
                "company_name": None,
                "registration_date": None,
            },
        ]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.data["results"])

    def test_get_users_filter_id_surname(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/users/?id=5&surname=5")
        data = [
            {
                "id": 5,
                "email": "test5@test.com",
                "name": "Test person 5",
                "surname": "Test person 5 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                    "is_inactive": False,
                },
                "company_name": None,
                "registration_date": None,
            },
        ]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.data["results"])


class TestAdminUsersStatusAPITests(APITestCase):
    def setUp(self):
        self.users = AdminUserFactory.create_batch(2)
        AdminUserFactory.reset_sequence(1)
        self.user = self.users[0]

    def test_get_users_filter_status_active_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path="/api/admin/users/?is_active=True&is_staff=True"
        )
        data = [
            {
                "id": 2,
                "email": "test2@test.com",
                "name": "Test person 2",
                "surname": "Test person 2 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                    "is_inactive": False,
                },
                "company_name": None,
                "registration_date": None,
            },
            {
                "id": 3,
                "email": "test3@test.com",
                "name": "Test person 3",
                "surname": "Test person 3 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                    "is_inactive": False,
                },
                "company_name": None,
                "registration_date": None,
            },
        ]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.data["results"])

    def test_get_users_filter_status_superuser_staff_active(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path="/api/admin/users/?is_superuser=True&is_deleted=True&is_active=False"
        )
        data = []
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.data["results"])


class TestAdminUsersAPITests(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()
        AdminUserFactory.reset_sequence(1)

    def test_get_users_not_authorized(self):
        response = self.client.get(path="/api/admin/users/?page=1&page_size=1")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_user_id_not_authorized(self):
        response = self.client.get(path=f"/api/admin/users/{self.user.id}/")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_users_authenticated(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/users/")
        data = [
            {
                "id": 2,
                "email": "test2@test.com",
                "name": "Test person 2",
                "surname": "Test person 2 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                    "is_inactive": False,
                },
                "company_name": None,
                "registration_date": None,
            }
        ]
        print(response.data["results"])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.data["results"])

    def test_get_users(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/users/")
        data = [
            {
                "id": 2,
                "email": "test2@test.com",
                "name": "Test person 2",
                "surname": "Test person 2 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                    "is_inactive": False,
                },
                "company_name": None,
                "registration_date": None,
            }
        ]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.data["results"])


class TestPatchUser(APITestCase):
    def setUp(self):
        self.user = SuperUserFactory()

    def test_patch_user(self):
        self.client.force_authenticate(self.user)
        data = {
            "is_active": True,
            "is_staff": True,
        }
        response = self.client.patch(
            path=f"/api/admin/users/{self.user.id}/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_user_not_authorized(self):
        data = {"name": "Test string"}
        response = self.client.patch(
            path=f"/api/admin/users/{self.user.id}/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_patch_user_not_exist(self):
        data = {"name": "Test string"}
        self.client.force_authenticate(self.user)
        response = self.client.patch(
            path=f"/api/admin/users/0/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class TestPostUser(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()

    def test_create_user_authorized_full_data(self):
        new_user_data = {
            "name": "string",
            "surname": "string",
            "email": "user@example.com",
            "is_active": False,
            "is_staff": False,
            "is_superuser": False,
        }

        self.client.force_authenticate(self.user)
        response = self.client.post(
            path=f"/api/admin/users/", data=new_user_data
        )
        self.assertEqual(
            status.HTTP_405_METHOD_NOT_ALLOWED, response.status_code
        )

    def test_create_user_not_authorized_full_data(self):
        new_user_data = {
            "name": "string",
            "surname": "string",
            "email": "user@example.com",
            "is_active": False,
            "is_staff": False,
            "is_superuser": False,
        }
        response = self.client.post(
            path=f"/api/admin/users/", data=new_user_data
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)
