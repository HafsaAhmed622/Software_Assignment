
const barLabels = JSON.parse(
    document.getElementById("bar-labels").textContent
);

const barIncome = JSON.parse(
    document.getElementById("bar-income").textContent
);

const barExpenses = JSON.parse(
    document.getElementById("bar-expenses").textContent
);

const lineSavings = JSON.parse(
    document.getElementById("line-savings").textContent
);

const pieLabels = JSON.parse(
    document.getElementById("pie-labels").textContent
);

const pieData = JSON.parse(
    document.getElementById("pie-data").textContent
);

const donutLabels = JSON.parse(
    document.getElementById("donut-labels").textContent
);

const donutData = JSON.parse(
    document.getElementById("donut-data").textContent
);

const GRID   = 'rgba(255,255,255,0.05)';
const MUTED  = '#94a3b8';
const GREEN  = '#10b981';
const RED    = '#f43f5e';
const BLUE   = '#3b82f6';
const YELLOW = '#f59e0b';
const PURPLE = '#8b5cf6';
const ORANGE = '#f97316';

Chart.defaults.color = MUTED;
Chart.defaults.font.family = "'Segoe UI', sans-serif";

const scales = {
    x: { grid: { color: GRID }, ticks: { color: MUTED } },
    y: { grid: { color: GRID }, ticks: { color: MUTED } }
};

// ── Bar Chart ──
new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: barLabels,
        datasets: [
            {
                label: 'Income',
                data: barIncome,
                backgroundColor: 'rgba(16,185,129,0.75)'
            },
            {
                label: 'Expenses',
                data: barExpenses,
                backgroundColor: 'rgba(244,63,94,0.75)'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // This makes the chart fill the container
        scales: scales
    }
});

// ── Line Chart ──
new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
        labels: barLabels,
        datasets: [{
            label: 'Net Savings',
            data: lineSavings,
            borderColor: BLUE,
            backgroundColor: 'rgba(59,130,246,0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: BLUE,
            pointRadius: 4,
        }]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: MUTED } } },
        scales
    }
});

// ── Pie Chart ──
new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
        labels: pieLabels,
        datasets: [{
            data: pieData,
            backgroundColor: [GREEN, RED, BLUE, YELLOW, PURPLE, ORANGE, '#ec4899', '#14b8a6'],
            borderColor: '#1a1d26',
            borderWidth: 2,
        }]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: { color: MUTED, padding: 12, font: { size: 11 } }
            }
        }
    }
});

// ── Donut Chart ──
new Chart(document.getElementById('donutChart'), {
    type: 'doughnut',
    data: {
        labels: donutLabels,
        datasets: [{
            data: donutData,
            backgroundColor: [GREEN, BLUE, YELLOW, PURPLE, ORANGE],
            borderColor: '#1a1d26',
            borderWidth: 2,
            hoverOffset: 8,
        }]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: MUTED, padding: 10, font: { size: 11 } }
            }
        }
    }
});