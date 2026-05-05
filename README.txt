========================================
            FinTrack Project
========================================

Project Name:
FinTrack

Project Description:
FinTrack is a web-based personal finance management system that helps users track their financial activities efficiently.
The system allows users to manage income, expenses, budgets, savings goals, and financial reports through an interactive dashboard.

Team Members:
- Adham Mahmoud
- Hafsa Ahmed
- Salma Nour-Eldeen
- Radwa Mohammed

GitHub Repository:
https://github.com/HafsaAhmed622/Software_Assignment.git

========================================
Project Files Included
========================================

1. users/
   Handles:
   - User registration
   - Login/logout
   - Profile management
   - User avatar handling

2. transactions/
   Handles:
   - Adding income
   - Adding expenses
   - Transaction tracking
   - Budget management

3. goals/
   Handles:
   - Creating savings goals
   - Tracking progress toward goals

4. reports/
   Handles:
   - Financial reports
   - Charts and analytics
   - Budget performance insights
   - Export functionality

5. static/
   Contains:
   - CSS files
   - JavaScript files
   - Images/icons

6. templates/
   Contains HTML templates used in the project interface.

7. docs/
   Contains generated project documentation using Sphinx.

8. db.sqlite3
   Database file used to store application data.

9. manage.py
   Main Django management file used to run the project.

========================================
Technologies Used
========================================

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Python
- Django Framework

Database:
- SQLite

Libraries/Tools:
- Chart.js (for reports visualization)
- Sphinx (for documentation generation)
- Django ORM
- collectstatic command for static files management

Version Control:
- Git
- GitHub

========================================
How to Run the Project
========================================

1. Open terminal in project directory

2. Install required dependencies:
   pip install -r requirements.txt

3. Apply migrations:
   python manage.py migrate

4. Collect static files:
   python manage.py collectstatic

5. Run the server:
   python manage.py runserver

6. Open browser and visit:
   http://127.0.0.1:8000/

========================================
Documentation
========================================

Project documentation was generated using Sphinx.

Documentation files can be found in:
docs/build/html/

Open:
index.html

to view the generated documentation.

========================================
Notes
========================================

- The project follows Object-Oriented Programming principles using Django models and application structure.
- Data is stored persistently using SQLite database.
- Previously stored data remains available when the system restarts.