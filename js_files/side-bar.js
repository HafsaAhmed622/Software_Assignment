function loadSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    const currentPage = window.location.pathname.split("/").pop() || "home-page.html";

    // Header Logo (Always visible)
    let html = `
        <div class="sidebar-logo">
            <div class="logo-icon">💰</div>
            <span class="logo-text">Fintrack</span>
        </div>
    `;

    // CASE 1: Login or Sign-up pages (Special Sidebar)
    if (currentPage === "login.html" || currentPage === "sign-up.html") {
        html += `
            <div class="nav-section-label">Welcome</div>
            <a class="nav-item" href="home-page.html">🏠 Home</a>
            ${currentPage === "login.html" 
                ? '<a class="nav-item" href="sign-up.html">📝 Register</a>' 
                : '<a class="nav-item" href="login.html">🔐 Login</a>'
            }
        `;
    } 
    // CASE 2: All other pages (Full Logged-In Sidebar)
    else {
        html += `
            <div class="nav-section-label">Main</div>
            <a class="nav-item" href="user-dashboard.html">📊 Dashboard</a>
            <a class="nav-item" href="track-income.html">💵 Income</a>
            <a class="nav-item" href="track-expenses.html">🧾 Expenses</a>
            <a class="nav-item" href="budget.html">🏦 Budget</a>

            <div class="nav-section-label">Planning</div>
            <a class="nav-item" href="goals.html">🎯 Goals</a>
            <a class="nav-item" href="reports.html">📈 Reports</a>

            <div class="sidebar-footer">
                <a class="nav-item" href="user-profile.html">👤 Profile</a>
                <a class="nav-item logout" href="login.html">🚪 Logout</a>
            </div>
        `;
    }

    sidebar.innerHTML = html;

    // Apply the "Active" class to highlight the current page
    document.querySelectorAll(".nav-item").forEach(item => {
        const linkPath = item.getAttribute("href");
        if (linkPath === currentPage) {
            item.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", loadSidebar);