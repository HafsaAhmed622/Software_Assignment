# Software_Assignment

1. Files & Directory Explanation
You must explain every folder and file included in your directory to meet the "explaining the files included" requirement.  

finance_tracker/: The core Django project directory containing global settings (settings.py) and root URL configurations.  

goals/: The application module responsible for defining and tracking user financial goals.  

reports/: The module that processes financial data to generate visual analytics and summaries using dateutil.  

transactions/: The main module for recording income and expenses. It handles the budget status logic seen in the dashboard.  

users/: Manages user authentication, profile avatars (via Pillow), and registration validation (via dnspython).  

media/: Stores user-uploaded files, such as profile avatars.  

static/ & staticfiles/: Contains CSS, JavaScript, and images used to style the Fintrack dashboard and sidebar.  

db.sqlite3: The local database file containing the relational schema and your project data.  

manage.py: The Django command-line utility used to run the server and perform migrations.  

.venv/: The virtual environment containing the necessary Python interpreters and libraries.

2. Tools Used
The PDF requires a section "explaining the tools used to develop the program".

Programming Language: Python 3.11.  

Web Framework: Django (v5.x).  

Libraries:

Pillow: For processing and validating user avatar images.  

dnspython: For validating email domains during user registration.  

python-dateutil: For managing monthly budget cycles and reporting periods.    

Diagramming: PlantUML for the State and Sequence diagrams.

GitHub Repository: https://github.com/HafsaAhmed622/Software_Assignment