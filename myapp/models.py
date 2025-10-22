from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ResumeTemplate(models.Model):
    CATEGORY_CHOICES = [
        ('executive', 'Executive'),
        ('creative', 'Creative'),
        ('technical', 'Technical'),
        ('academic', 'Academic'),
    ]
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # ✅ Point to actual HTML file (resumes/cv1.html, cv2.html, etc.)
    template_file = models.CharField(
        max_length=255,
        default="resumes/default.html",
        help_text="Path to the HTML file for this resume template"
    )

    def __str__(self):
        return f"{self.category} - {self.name}"


class UserResume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    template = models.ForeignKey(ResumeTemplate, on_delete=models.SET_NULL, null=True)
    job_title = models.CharField(max_length=255,  blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    skills = models.TextField(blank=True, null=True)  # store as comma-separated or JSON
    experience = models.TextField(blank=True, null=True)
    education = models.TextField(blank=True, null=True )
    education = models.TextField(blank=True,  null=True )
    education = models.TextField(blank=True,  null=True )
    education = models.TextField(blank=True, null=True )
    education = models.TextField(blank=True,  null=True )
    created_at = models.DateTimeField(auto_now_add=True,  null=True)
    linkedin = models.URLField(blank=True,  null=True)
    github = models.URLField(blank=True,  null=True)
    portfolio = models.URLField(blank=True,  null=True)
    projects = models.TextField(blank=True,  null=True)
    address = models.TextField(blank=True,  null=True)
    tech_stack = models.TextField(blank=True,  null=True)
    certifications = models.TextField(blank=True,  null=True)
    highlights = models.TextField(blank=True, null=True)
    publication = models.TextField(blank=True,  null=True)
    awards = models.TextField(blank=True,  null=True)
    conference = models.TextField(blank=True,  null=True)
    download_count = models.PositiveIntegerField(default=0)  
    view_count = models.PositiveIntegerField(default=0)
   


    def skills_list(self):
        return [s.strip() for s in self.skills.split(",")] if self.skills else []

    def __str__(self):
        return f"{self.user.username} - {self.title}"
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', default='default-avatar.jpg')
    views = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username
    
class ResumeVersion(models.Model):
    resume = models.ForeignKey(UserResume, on_delete=models.CASCADE, related_name='versions')
    content = models.TextField() 
    version_number = models.PositiveIntegerField()  
    created_at = models.DateTimeField(auto_now_add=True)