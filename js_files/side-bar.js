function loadSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    const userStatus = document.body.dataset.user || "guest";
    const currentPage = window.location.pathname.split("/").pop();

    let html = `
        <div class="sidebar-logo">
            <div class="logo-icon">💰</div>
            <span class="logo-text">Fintrack</span>
        </div>
    `;

    if (userStatus === "loggedin") {

        html += `
        <div class="nav-section-label">Main</div>

        <a class="nav-item" href="dashboard.html">📊 Dashboard </a>
        <a class="nav-item" href="track-income.html">💵 Income </a>
        <a class="nav-item" href="track-expenses.html">🧾 Expenses </a>
        <a class="nav-item" href="budget.html">🏦 Budget </a>

        <div class="nav-section-label">Planning</div>

        <a class="nav-item" href="goals.html">🎯 Goals </a>
        <a class="nav-item" href="reports.html">📈 Reports </a>

        <div class="sidebar-footer">
            <a class="nav-item" href="user-profile.html">👤 Profile </a>
            <a class="nav-item logout" href="login.html"> 🚪 Logout </a>
        </div>
        `;
    }

    else {

        html += ` <div class="nav-section-label">Guest</div>`;

        if (currentPage !== "login.html") {
            html += `<a class="nav-item" href="login.html">🔐 Login </a>`;
        }

        if (currentPage !== "register.html") {
            html += `<a class="nav-item" href="register.html">📝 Register </a>`;
        }

        html += `
        <a class="nav-item" href="dashboard.html">🏠 Home</a>`;
    }

    sidebar.innerHTML = html;

    document.querySelectorAll(".nav-item").forEach(item => {
        const page = item.getAttribute("href").split("/").pop();

        if (page === currentPage) {
            item.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", loadSidebar);