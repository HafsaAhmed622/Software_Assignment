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
        <a class="nav-item" href="/finance/dashboard/">📊 Dashboard</a>
        <a class="nav-item" href="/finance/income/">💵 Income</a>
        <a class="nav-item" href="/finance/expenses/">🧾 Expenses</a>
        <a class="nav-item" href="/finance/budget/">🏦 Budget</a>

        <div class="nav-section-label">Planning</div>
        <a class="nav-item" href="/goals/">🎯 Goals</a>
        <a class="nav-item" href="/finance/reports/">📈 Reports</a>

        <div class="sidebar-footer">
           <a class="nav-item" href="/users/user-profile/">👤 Profile</a>
           <a class="nav-item logout" href="/users/login/" id="logout-btn">🚪 Logout</a>
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