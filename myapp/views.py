from django.shortcuts import render,  get_object_or_404, redirect
from django.http import HttpResponse
from .models import ResumeTemplate, UserResume
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
import requests
from requests.adapters import HTTPAdapter, Retry
from django.shortcuts import render
from django.core.cache import cache
from django.template.loader import get_template
import weasyprint
from xhtml2pdf import pisa
import io
from django.db.models import F  
from django.urls import reverse
# Create your views here.


def signup_view(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()  
            login(request, user)  
            return redirect("homepage")  
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = UserCreationForm()
    return render(request, "signup.html", {"form": form})

def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("homepage")
        else:
            messages.error(request, "Invalid username or password.")
    else:
        form = AuthenticationForm()
    return render(request, "login.html", {"form": form})

def logout_view(request):
    logout(request)
    return redirect("login")

@login_required
def homepage(request): 
    # Resume Templates by Category
    categories = ["executive", "creative", "technical", "academic"]
    templates = {
        category: ResumeTemplate.objects.filter(category=category).order_by('-created_at').first()
        for category in categories
    }

    # Fetch 3 Featured Jobs from Remotive API
    session = requests.Session()
    retries = Retry(total=3, backoff_factor=1, status_forcelist=[502, 503, 504])
    session.mount("https://", HTTPAdapter(max_retries=retries))

    jobs = []
    try:
        response = session.get("https://remotive.com/api/remote-jobs", timeout=15)
        response.raise_for_status()
        data = response.json()
        jobs = data.get("jobs", [])
    except requests.exceptions.RequestException as e:
        print("Error fetching jobs:", e)

    featured_jobs = jobs[:3]  # Only take 3 jobs

    context = {
        "templates": templates,
        "featured_jobs": featured_jobs,
    }

    return render(request, "homepage.html", context)

def category_templates(request, category):
    templates = ResumeTemplate.objects.filter(category=category)
    return render(request, "category_templates.html", {
        "category": category.capitalize(),
        "templates": templates
    })


def template(request): 
    category = request.GET.get("category")  
    
    templates = ResumeTemplate.objects.all()

    if category and category != "all":
        templates = templates.filter(category__iexact=category)

    return render(request, "template.html", {
        "templates": templates,
        "category": category,
    })

@login_required 
def resumebuilder(request, template_id): 
    template = get_object_or_404(ResumeTemplate, id=template_id)
    resume, created = UserResume.objects.get_or_create(user=request.user, template=template)

    if request.method == "POST":
        fields = [
            "name", "job_title", "email", "phone", "summary", "address",
            "projects", "tech_stack", "certifications", "highlights", "publication",
            "awards", "conference", "skills", "experience", "education",
            "linkedin", "github"
        ]
        for field in fields:
            setattr(resume, field, request.POST.get(field))
        resume.save()

        action = request.POST.get("action")
        if action == "preview":
            # Redirect to show preview with ?preview=1
            return redirect(f"{reverse('resume_builder', args=[template.id])}?preview=1")
        else:
            return redirect("resume_builder", template_id=template.id)

    # If preview mode is active, increment view count
    if request.GET.get("preview"):
        resume.view_count = F("view_count") + 1
        resume.save(update_fields=["view_count"])
        resume.refresh_from_db()  

    return render(request, "resume_builder.html", {
        "resume": resume,
        "template": template,
        "preview": request.GET.get("preview"),
    })

@login_required 
def export_pdf(request, resume_id):
    # Fetch the user’s resume (with data filled in)
    resume = get_object_or_404(UserResume, id=resume_id, user=request.user)

    # Increment download count
    resume.download_count += 1
    resume.save()

    # Get the linked template (e.g. cv19.html)
    template = resume.template
    template_file = template.template_file  

    # Render the template with resume data
    html_template = get_template(template_file)
    html = html_template.render({"resume": resume})

    # Convert to PDF
    response = HttpResponse(content_type="application/pdf")
    response["Content-Disposition"] = f'attachment; filename="resume_{resume.id}.pdf"'
    weasyprint.HTML(string=html).write_pdf(response)

    return response

def job_tracker(request):
    job_type = request.GET.get("type")  # Get filter type from query param
    
    session = requests.Session()
    retries = Retry(total=3, backoff_factor=1, status_forcelist=[502, 503, 504])
    session.mount("https://", HTTPAdapter(max_retries=retries))

    try:
        # Fetch jobs from Remotive
        response = session.get("https://remotive.com/api/remote-jobs", timeout=30)
        response.raise_for_status()
        data = response.json()
        jobs = data.get("jobs", [])

        # Apply filter (if any)
        if job_type:
            jobs = [job for job in jobs if job.get("job_type", "").lower() == job_type.lower()]

        # Limit to 20 jobs
        jobs = jobs[:20]

    except requests.exceptions.RequestException as e:
        print("Error fetching jobs:", e)
        jobs = []

    return render(request, "job_tracker.html", {"jobs": jobs})

@login_required
def userboard(request):
    user = request.user
    resumes = UserResume.objects.filter(user=user).order_by('-created_at')

    context = {
        "user": user,
        "resumes": resumes,
        "total_resumes": resumes.count(),
        "downloads": sum(r.download_count for r in resumes),
        "views": sum(r.view_count for r in resumes),
    }
    return render(request, "userboard.html", context)

def help(request):
    return render(request, "help_support.html")
