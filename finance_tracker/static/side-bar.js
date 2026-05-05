function loadSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    const currentPath = window.location.pathname;

    let html = `
        <a href="/dashboard/" class="sidebar-logo">
            <div class="logo-icon">💰</div>
            <span class="logo-text">Fintrack</span>
        </a>

        <div class="nav-section-label">Main</div>

        <a class="nav-item" href="/dashboard/">📊 Dashboard</a>
        <a class="nav-item" href="/income/">💵 Income</a>
        <a class="nav-item" href="/expenses/">🧾 Expenses</a>
        <a class="nav-item" href="/budget/">🏦 Budget</a>

        <div class="nav-section-label">Planning</div>
        <a class="nav-item" href="/goals/">🎯 Goals</a>
        <a class="nav-item" href="/reports/">📈 Reports</a>

        <div class="sidebar-footer">
            <a class="nav-item" href="/users/user-profile/">👤 Profile</a>
            <a class="nav-item logout" href="/login/" id="logout-btn">🚪 Logout</a>
        </div>
    `;

    sidebar.innerHTML = html;

    document.querySelectorAll(".nav-item").forEach(item => {
        const linkPath = item.getAttribute("href");
        if (currentPath === linkPath) {
            item.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", loadSidebar);