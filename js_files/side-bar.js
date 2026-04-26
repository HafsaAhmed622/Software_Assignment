function loadSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    const currentPage = window.location.pathname.split("/").pop() || "home-page.html";

    // 1. Generate Sidebar HTML
    let html = `
        <div class="sidebar-logo">
            <div class="logo-icon">💰</div>
            <span class="logo-text">Fintrack</span>
        </div>
    `;

    if (currentPage === "login.html" || currentPage === "sign-up.html") {
        html += `
            <div class="nav-section-label">Welcome</div>
            <a class="nav-item" href="home-page.html">🏠 Home</a>
            ${currentPage === "login.html" 
                ? '<a class="nav-item" href="sign-up.html">📝 Register</a>' 
                : '<a class="nav-item" href="login.html">🔐 Login</a>'
            }
        `;
    } else {
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

    // 2. Highlighting Active Page
    document.querySelectorAll(".nav-item").forEach(item => {
        const linkPath = item.getAttribute("href");
        if (linkPath === currentPage) {
            item.classList.add("active");
        }
    });

    // 3. LOGOUT LOGIC (Placed inside the function)
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            // Data Access: Clear user session
            localStorage.removeItem("fintrack_user");
            // The link href="login.html" will handle the redirect automatically
        });
    }
}

/**
 * Update Topbar Avatar
 */
function updateTopbarAvatar() {
    const userData = JSON.parse(localStorage.getItem("fintrack_user"));
    const navAvatar = document.querySelector(".topbar .avatar");

    if (navAvatar) {
        if (userData && userData.avatar) {
            navAvatar.innerHTML = `<img src="${userData.avatar}" alt="User" 
                style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            navAvatar.style.backgroundColor = "transparent";
        } else {
            // Reset to default if logged out
            navAvatar.innerHTML = "👤";
            navAvatar.style.backgroundColor = "#10b981";
            navAvatar.style.fontSize = "20px";
        }
    }
}

// Run functions when page loads
document.addEventListener("DOMContentLoaded", () => {
    loadSidebar();
    updateTopbarAvatar();
});