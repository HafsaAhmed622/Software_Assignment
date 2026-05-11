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
            
            <form id="logout-form-sidebar" action="/users/logout/" method="POST" style="display: none;">
                <input type="hidden" name="csrfmiddlewaretoken" value="${getCookie('csrftoken')}">
            </form>
            
            <a class="nav-item logout" href="javascript:void(0)" onclick="handleLogoutSidebar(event)">
                🚪 Logout
            </a>
        </div>
    `;

    sidebar.innerHTML = html;

    // ... كود الـ active class زي ما هو ...
}

// الوظائف دي خليها بره الـ loadSidebar عشان تكون Global
function handleLogoutSidebar(e) {
    e.preventDefault();
    const form = document.getElementById('logout-form-sidebar');
    if (form) {
        form.submit();
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.addEventListener("DOMContentLoaded", loadSidebar);