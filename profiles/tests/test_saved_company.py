from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from profiles.factories import ProfileCompanyFactory, SavedCompanyFactory
from utils.dump_response import dump  # noqa


class SavedCompaniesListCreateDestroyAPITest(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.profile = ProfileCompanyFactory()

    def test_add_company_to_saved_unauthenticated(self):
        response = self.client.post(
            path="/api/saved-list/",
            data={
                "company": "{profile_id}".format(
                    profile_id=self.profile.id),
            },
            format="json",
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_add_company_to_saved_authenticated(self):
        self.client.force_authenticate(self.user)
        response = self.client.post(
            path="/api/saved-list/",
            data={
                "company": "{profile_id}".format(
                    profile_id=self.profile.id
                )
            },
            format="json",
        )
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_add_own_company_to_saved_authenticated(self):
        own_profile = ProfileCompanyFactory(person_id=self.user.id)
        self.client.force_authenticate(self.user)
        response = self.client.post(
            path="/api/saved-list/",
            data={
                "company": "{profile_id}".format(profile_id=own_profile.id),
            },
            format="json",
        )
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_add_non_existent_company_to_saved_authenticated(self):
        self.client.force_authenticate(self.user)

        response = self.client.post(
            path="/api/saved-list/",
            data={
                "company": 0,
            },
            format="json",
        )
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_delete_company_from_saved_authenticated(self):
        self.client.force_authenticate(self.user)

        saved_company = SavedCompanyFactory(user=self.user)
        response = self.client.delete(
            path="/api/saved-list/del/{profile_pk}/".format(
                profile_pk=saved_company.id
            ),
            data={},
            format="json",
        )
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)

        # check that deleted
        response = self.client.get(path="/api/profiles/?is_saved=True")
        self.assertEqual(0, response.data["total_items"])
