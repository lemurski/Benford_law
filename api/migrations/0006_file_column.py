# Generated by Django 4.0 on 2021-12-24 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_file_percentages'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='column',
            field=models.CharField(default='', max_length=50),
        ),
    ]
