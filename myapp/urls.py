from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name="login"),   # default page
    path('signup/', views.signup_view, name="signup"),
    path('logout/', views.logout_view, name="logout"),
    path('home', views.homepage, name= 'homepage'),
    path('template/', views.template, name= 'template'),
    path("resumebuilder/<int:template_id>/", views.resumebuilder, name="resume_builder"),
    path("resumes/<str:category>/", views.category_templates, name="category_templates"),
    path("export-pdf/<int:resume_id>/", views.export_pdf, name="export_pdf"),
    path("jobs/", views.job_tracker, name="job_tracker"),
    path('userboard/', views.userboard, name= 'userboard'),
    path('help/', views.help, name= 'help')

]

