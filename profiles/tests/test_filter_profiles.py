from rest_framework import status
from rest_framework.test import APITestCase

from profiles.factories import ProfileStartupFactory, ProfileCompanyFactory, ActivityFactory
from utils.dump_response import dump  # noqa


class TestProfileListAPIView(APITestCase):
    def setUp(self) -> None:

        self.producer_activity = ActivityFactory(name="producer")
        self.importer_activity = ActivityFactory(name="importer")
        self.retail_activity = ActivityFactory(name="retail")
        self.horeca_activity = ActivityFactory(name="horeca")

        self.company = ProfileCompanyFactory(
            comp_activity=(self.importer_activity, self.retail_activity, self.horeca_activity))
        self.startups = ProfileStartupFactory.create_batch(2,
                                                           comp_activity=(self.producer_activity, self.horeca_activity))

        self.importers = ProfileCompanyFactory.create_batch(3, comp_activity=(self.importer_activity,))
        self.producers = ProfileStartupFactory.create_batch(2, comp_activity=(self.producer_activity,))
        self.retailers = ProfileCompanyFactory.create_batch(2, comp_activity=(self.retail_activity,))
        self.horecas = ProfileStartupFactory.create_batch(1, comp_activity=(self.horeca_activity,))

    def test_get_all_profiles_no_filters(self):
        response = self.client.get(path="/api/profiles/?page=1&page_size=12")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(11, response.data["total_items"])

    def test_get_all_profiles_filter_companies(self):
        response = self.client.get(
            path="/api/profiles/?company_type={company_type}&page=1&page_size=12".format(company_type="company"))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(6, response.data["total_items"])
        self.assertTrue(all(
            response.data["results"][i]["comp_is_startup"] is False and response.data["results"][i][
                "comp_registered"] is True
            for i in range(len(response.data["results"]))))

    def test_get_all_profiles_filter_startups(self):
        response = self.client.get(
            path="/api/profiles/?company_type={company_type}&page=1&page_size=12".format(company_type="startup"))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(5, response.data["total_items"])
        self.assertTrue(all(
            response.data["results"][i]["comp_is_startup"] is True and response.data["results"][i]["comp_registered"] is False
            for i in range(len(response.data["results"]))))

    def test_get_all_profiles_authorized_filter_activity_producer(self):
        response = self.client.get(
            path="/api/profiles/?activity_type={activity}&page=1&page_size=12".format(activity="producer"))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(4, response.data["total_items"])
        self.assertTrue(all(
            [self.producer_activity.activity_id in response.data["results"][i]["comp_activity"]
             for i in range(len(response.data["results"]))]
        ))

    def test_get_all_profiles_authorized_filter_activity_importer(self):
        response = self.client.get(
            path="/api/profiles/?activity_type={activity}&page=1&page_size=12".format(activity="importer"))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(4, response.data["total_items"])
        self.assertTrue(all(
            [self.importer_activity.activity_id in response.data["results"][i]["comp_activity"]
             for i in range(len(response.data["results"]))]
        ))

    def test_get_all_profiles_authorized_filter_activity_retail(self):
        response = self.client.get(
            path="/api/profiles/?activity_type={activity}&page=1&page_size=12".format(activity="retail"))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(3, response.data["total_items"])
        self.assertTrue(all(
            [self.retail_activity.activity_id in response.data["results"][i]["comp_activity"]
             for i in range(len(response.data["results"]))]
        ))

    def test_get_all_profiles_authorized_filter_activity_horeca(self):
        response = self.client.get(
            path="/api/profiles/?activity_type={activity}&page=1&page_size=12".format(activity="horeca"))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(4, response.data["total_items"])
        self.assertTrue(all(
            [self.horeca_activity.activity_id in response.data["results"][i]["comp_activity"]
             for i in range(len(response.data["results"]))]
        ))
