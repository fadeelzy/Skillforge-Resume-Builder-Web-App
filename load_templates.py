import os
import django
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "resumeproject.settings")
django.setup()

from myapp.models import ResumeTemplate

def run():
    templates_path = os.path.join(settings.BASE_DIR, "myapp", "templates", "resumes")

    categories = {
        range(1, 6): "executive",
        range(6, 11): "creative",
        range(11, 16): "technical",
        range(16, 21): "academic",
    }

    created = 0

    for i in range(1, 21):
        filename = f"cv{i}.html"
        filepath = os.path.join(templates_path, filename)

        if not os.path.exists(filepath):
            print(f"⚠️ Missing: {filename}, skipping.")
            continue

        with open(filepath, "r", encoding="utf-8") as f:
            html_content = f.read()

        category = next(cat for r, cat in categories.items() if i in r)

        obj, was_created = ResumeTemplate.objects.get_or_create(
            name=f"Template {i}",
            defaults={
                "category": category,
                "html_content": html_content,
                "css_content": "",
            },
        )

        if was_created:
            created += 1

    print(f"✅ Done! Inserted {created} templates.")

run()