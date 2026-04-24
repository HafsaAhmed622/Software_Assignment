function loadSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    sidebar.innerHTML = `
        <div class="sidebar-logo">
            <div class="logo-icon">
                <svg viewBox="0 0 16 16">
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm1 10H7V7h2v4zm0-6H7V3h2v2z"/>
                </svg>
            </div>
            <span class="logo-text">Fintrack</span>
        </div>

        <div class="nav-section-label">Main</div>

        <a class="nav-item" href="dashboard.html">
            <svg viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="6" height="6" rx="1"/>
                <rect x="9" y="1" width="6" height="6" rx="1"/>
                <rect x="1" y="9" width="6" height="6" rx="1"/>
                <rect x="9" y="9" width="6" height="6" rx="1"/>
            </svg>
            Dashboard
        </a>

        <a class="nav-item" href="html_files/track-income.html">
            <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 4a.75.75 0 00-1.5 0v3.25l-1.72 1.72a.75.75 0 001.06 1.06l2-2A.75.75 0 008.75 8.5V5z"/>
            </svg>
            Income
        </a>

        <a class="nav-item" href="html_files/track-expenses.html">
            <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v9a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 12.5v-9zM5 8.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5H5zm0-3a.75.75 0 000 1.5h6a.75.75 0 000-1.5H5z"/>
            </svg>
            Expenses
        </a>

        <a class="nav-item" href="html_files/budget.html">
            <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M1 3a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V3zm0 5a1 1 0 011-1h5a1 1 0 010 2H2a1 1 0 01-1-1zm0 4a1 1 0 011-1h3a1 1 0 010 2H2a1 1 0 01-1-１z"/>
            </svg>
            Budget
        </a>

        <div class="nav-section-label">Planning</div>

        <a class="nav-item" href="html_files/goals.html">
            <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/>
            </svg>
            Goals
        </a>

        <a class="nav-item" href="html_files/reports.html">
            <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2h12v2H2V2zm0 3h8v2H2V5zm0 3h12v2H2V8zm0 3h5v2H2v-2z"/>
            </svg>
            Reports
        </a>

        <div class="sidebar-footer">
            <a class="nav-item" href="html_files/user-profile.html">
                <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5 6a5 5 0 0110 0H3z"/>
                </svg>
                Profile
            </a>
            <a class="nav-item logout" href="login.html" id="logout-btn">
                <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6 2h4a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-1h2v1h4V4H6v1H4V4a2 2 0 012-2zm-.5 5.5l-2 2 2 2 1-1-1-1h5v-2H5.5l1-1-1-1z"/>
                </svg>
                Logout
            </a>
        </div>
    `;

    const currentPage = window.location.pathname.split("/").pop() || "html_files/dashboard.html";
    document.querySelectorAll(".nav-item").forEach(item => {
        if (item.getAttribute("href") === currentPage) {
            item.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", loadSidebar);