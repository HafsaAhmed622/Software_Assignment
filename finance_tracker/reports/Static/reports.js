document.addEventListener('DOMContentLoaded', function() {
    // 1. وظيفة لجلب البيانات بأمان لمنع الـ Uncaught TypeError
    const safeParse = (id) => {
        const element = document.getElementById(id);
        if (element && element.textContent.trim() !== "" && element.textContent.trim() !== "null") {
            try {
                return JSON.parse(element.textContent);
            } catch (e) {
                console.warn("Could not parse JSON for: " + id);
                return [];
            }
        }
        return [];
    };

    // جلب كل البيانات
    const barLabels   = safeParse("bar-labels");
    const barIncome   = safeParse("bar-income");
    const barExpenses = safeParse("bar-expenses");
    const lineSavings = safeParse("line-savings");
    const pieLabels   = safeParse("pie-labels");
    const pieData     = safeParse("pie-data");
    const donutLabels = safeParse("donut-labels");
    const donutData   = safeParse("donut-data");

    // إعدادات الألوان والثيم
    const GRID= 'rgba(255,255,255,0.05)';
    const MUTED= '#94a3b8';
    const GREEN= '#10b981';
    const RED= '#f43f5e';
    const BLUE= '#3b82f6';
    const YELLOW='#f59e0b';
    const PURPLE='#8b5cf6';
    const ORANGE='#f97316';

    Chart.defaults.color = MUTED;
    Chart.defaults.font.family = "'Segoe UI', sans-serif";

    const scales = {
        x: { grid: { display: false }, ticks: { color: MUTED, font: { size: 10 } } },
        y: { grid: { color: GRID }, ticks: { color: MUTED } }
    };

    // 2. رسم الـ Bar Chart (Income vs Expenses)
    if (document.getElementById('barChart') && barLabels.length > 0) {
        new Chart(document.getElementById('barChart'), {
            type: 'bar',
            data: {
                labels: barLabels,
                datasets: [
                    { label: 'Income', data: barIncome, backgroundColor: 'rgba(16,185,129,0.75)' },
                    { label: 'Expenses', data: barExpenses, backgroundColor: 'rgba(244,63,94,0.75)' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales }
        });
    }

    // 3. رسم الـ Line Chart (Savings Trend)
    if (document.getElementById('lineChart') && barLabels.length > 0) {
        new Chart(document.getElementById('lineChart'), {
            type: 'line',
            data: {
                labels: barLabels,
                datasets: [{
                    label: 'Net Savings',
                    data: lineSavings,
                    borderColor: BLUE,
                    backgroundColor: 'rgba(59,130,246,0.1)',
                    borderWidth: 2, tension: 0.4, fill: true,
                    pointBackgroundColor: BLUE, pointRadius: 4,
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales }
        });
    }

    // 4. رسم الـ Pie Chart (Expenses by Category)
    if (document.getElementById('pieChart') && pieData.length > 0) {
        new Chart(document.getElementById('pieChart'), {
            type: 'pie',
            data: {
                labels: pieLabels,
                datasets: [{
                    data: pieData,
                    backgroundColor: [GREEN, RED, BLUE, YELLOW, PURPLE, ORANGE, '#ec4899', '#14b8a6'],
                    borderColor: '#1a1d26', borderWidth: 2,
                    hoverOffset: 8, 
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'right', labels: { color: MUTED, font: { size: 11 } } } }
            }
        });
    }

    // 5. رسم الـ Donut Chart (Income by Source)
    if (document.getElementById('donutChart') && donutData.length > 0) {
        new Chart(document.getElementById('donutChart'), {
            type: 'doughnut',
            data: {
                labels: donutLabels,
                datasets: [{
                data: donutData,
                backgroundColor: [ORANGE, RED, BLUE, YELLOW, PURPLE, GREEN , '#ec4899', '#f97316'],
                borderColor: '#1a1d26', 
                borderWidth: 2,
                hoverOffset: 8, 
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '65%',
                plugins: { legend: { position: 'bottom', labels: { color: MUTED, font: { size: 11 } } } }
            }
        });
    }
});