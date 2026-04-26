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
                <a class="nav-item logout" href="login.html" id="logout-btn">🚪 Logout</a>
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

    // Handle Logout logic
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            // Optional: You could clear the whole storage or just a session key
            // localStorage.removeItem("fintrack_user"); 
        });
    }
}


function updateTopbarAvatar() {
    const userData = JSON.parse(localStorage.getItem("fintrack_user"));
    const navAvatar = document.querySelector(".topbar .avatar");

    if (navAvatar && userData && userData.avatar) {
        navAvatar.innerHTML = `<img src="${userData.avatar}" alt="User" 
            style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        navAvatar.style.backgroundColor = "transparent";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    loadSidebar();
    updateTopbarAvatar();
});