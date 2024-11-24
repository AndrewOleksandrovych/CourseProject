// Функція для отримання статистики за станом
function getStatusStatistics(vehicles) {
    const stats = {};
    vehicles.forEach(vehicle => {
        stats[vehicle.status] = (stats[vehicle.status] || 0) + 1;
    });
    return stats;
}

// Функція для отримання статистики за типом
function getTypeStatistics(vehicles) {
    const stats = {};
    vehicles.forEach(vehicle => {
        stats[vehicle.type] = (stats[vehicle.type] || 0) + 1;
    });
    return stats;
}

// Функція для побудови графіків
function renderCharts() {
    const vehicles = getVehicles();

    // Дані для графіка стану
    const statusStats = getStatusStatistics(vehicles);
    const statusLabels = Object.keys(statusStats);
    const statusData = Object.values(statusStats);

    // Дані для графіка типу
    const typeStats = getTypeStatistics(vehicles);
    const typeLabels = Object.keys(typeStats);
    const typeData = Object.values(typeStats);

    // Графік стану
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: statusLabels,
            datasets: [{
                label: 'Розподіл за станом',
                data: statusData,
                backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#17a2b8'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        }
    });

    // Графік типу
    const typeCtx = document.getElementById('typeChart').getContext('2d');
    new Chart(typeCtx, {
        type: 'bar',
        data: {
            labels: typeLabels,
            datasets: [{
                label: 'Кількість автомобілів',
                data: typeData,
                backgroundColor: '#6a11cb'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw || 0;
                            return `Кількість: ${value}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Тип автомобіля'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Кількість'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Запустити рендер графіків
renderCharts();
