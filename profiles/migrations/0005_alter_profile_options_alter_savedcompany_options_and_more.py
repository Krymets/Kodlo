# Generated by Django 4.2.3 on 2023-09-06 19:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0004_viewedcompany'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='profile',
            options={'ordering': ['profile_id']},
        ),
        migrations.AlterModelOptions(
            name='savedcompany',
            options={'ordering': ['company_id']},
        ),
        migrations.AlterModelOptions(
            name='viewedcompany',
            options={'ordering': ['company_id']},
        ),
    ]
