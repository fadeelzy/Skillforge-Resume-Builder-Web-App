🧩 Resume Builder Web App

A sleek, full-featured Resume Builder platform built with Django and TailwindCSS, designed to help users create, preview, and export professional resumes effortlessly.
It also features a Job Tracker that connects to a live job API to fetch real-time job openings — helping users apply instantly after building their resume.

🚀 Features

✅ Dynamic Resume Builder

Choose from multiple modern CV templates

Auto-saves and previews user data in real time

Export resumes as PDF using WeasyPrint

✅ User Dashboard

View total resumes created

Track resume downloads and profile views

✅ Job Tracker API Integration

Fetches live job postings from an external API

Filter jobs by title, location, or company

Click to apply directly from within the web app

✅ Authentication System

Secure user sign-up, login, and logout

User-specific resume storage and access

✅ Help & Support Page

Built-in support hub for FAQs and assistance

🧱 Tech Stack

Layer	Technology

Frontend	HTML5, TailwindCSS

Backend	Django (Python)

Database	SQLite (default Django DB)

PDF Export	WeasyPrint

API Integration	Job Tracker REST API

Auth System	Django Authentication

🗂️ Folder Structure

resumeproject/

│
├── myapp/

│   ├── templates/

│   │   ├── resumes/  # Individual CV templates (cv1–cv20)

│   │   ├── job_tracker.html   # Job listings page (uses API)

│   │   ├── userboard.html         # User dashboard

│   │   ├── resume_builder.html    # Resume editor/preview

│   │   ├── help_support.html      # Help and support section

│   │   └── homepage.html

│   ├── static/                    # CSS, JS, images

│   ├── models.py

│   ├── views.py

│   ├── urls.py

│   └── admin.py

│
├── resumeproject/

│   ├── settings.py

│   ├── urls.py

│   └── wsgi.py

│
├── db.sqlite3

├── manage.py



⚙️ Installation & Setup


1️⃣ Clone the Repository

git clone https://github.com/yourusername/resume-builder-web.git
cd resume-builder-web


2️⃣ Create a Virtual Environment

python -m venv venv
venv\Scripts\activate      # On Windows
source venv/bin/activate   # On macOS/Linux


3️⃣ Install Dependencies

pip install -r requirements.txt


4️⃣ Run Migrations

python manage.py makemigrations
python manage.py migrate


5️⃣ Start the Development Server

python manage.py runserver


6️⃣ Access the App
👉 Go to http://127.0.0.1:8000/


📦 Exporting Resume as PDF

The app uses WeasyPrint to generate beautiful PDF resumes directly from HTML templates:

python manage.py runserver

Then click Download PDF from your resume preview page.


🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to modify.

🧑‍💻 Author

Fadilah Abdulkadir
💼 Backend Developer | Django Enthusiast
🌐 GitHub
 | ✉️ fadeelzy@gmail.com

🪶 License

This project is licensed under the MIT License – feel free to fork and customize.
