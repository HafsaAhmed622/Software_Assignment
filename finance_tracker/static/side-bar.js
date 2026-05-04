function loadSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    const currentPath = window.location.pathname;

    let html = `
        <div class="sidebar-logo">
            <div class="logo-icon">💰</div>
            <span class="logo-text">Fintrack</span>
        </div>

        <div class="nav-section-label">Main</div>
        <!-- Matches path('dashboard/', ...) -->
        <a class="nav-item" href="/dashboard/">📊 Dashboard</a>
        <!-- Matches path('/income/', ...) -->
        <a class="nav-item" href="/income/">💵 Income</a>
        <!-- Matches path('expenses/', ...) -->
        <a class="nav-item" href="/expenses/">🧾 Expenses</a>
        <!-- Ensure you have a budget path in urls.py -->
        <a class="nav-item" href="/budget/">🏦 Budget</a>

        <div class="nav-section-label">Planning</div>
        <a class="nav-item" href="/goals/">🎯 Goals</a>
        <a class="nav-item" href="/reports/">📈 Reports</a>

        <div class="sidebar-footer">
           <a class="nav-item" href="/profile/">👤 Profile</a>
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