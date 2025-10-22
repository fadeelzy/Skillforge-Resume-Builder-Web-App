from django.contrib import admin
from .models import ResumeTemplate, UserResume

# Register your models here.
admin.site.register(ResumeTemplate)
class ResumeTemplateAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "created_at")
    search_fields = ("name", "category")
    list_filter = ("category",)

admin.site.register(UserResume)
class UserResumeAdmin(admin.ModelAdmin):
    list_display = ("user", "title", "template", "created_at")
    search_fields = ("title", "user__username")
    list_filter = ("template__category",)
