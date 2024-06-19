document.addEventListener('DOMContentLoaded', function () {
    const defaultData = {
        math: [85, 88, 90, 87],
        physics: [78, 79, 82, 85],
        chemistry: [92, 94, 91, 93],
        biology: [88, 85, 89, 90],
        history: [76, 80, 78, 77],
        geography: [89, 90, 87, 88]
    };

    // Load data from local storage or use default data
    const storedData = JSON.parse(localStorage.getItem('studentPerformanceData')) || defaultData;
    const subjects = Object.keys(storedData);
    const charts = {};

    // Initialize charts
    subjects.forEach(subject => {
        const ctx = document.getElementById(`chart-${subject}`).getContext('2d');
        charts[subject] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4'],
                datasets: [{
                    label: subject.charAt(0).toUpperCase() + subject.slice(1),
                    data: storedData[subject],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        suggestedMin: 70,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            }
        });
    });

    // Handle form submission
    document.getElementById('scoreForm').addEventListener('submit', function (event) {
        event.preventDefault();
        
        const subject = event.target.subject.value;
        const test1 = Number(event.target.test1.value);
        const test2 = Number(event.target.test2.value);
        const test3 = Number(event.target.test3.value);
        const test4 = Number(event.target.test4.value);

        storedData[subject] = [test1, test2, test3, test4];

        // Update the chart
        charts[subject].data.datasets[0].data = storedData[subject];
        charts[subject].update();

        // Store the updated data in local storage
        localStorage.setItem('studentPerformanceData', JSON.stringify(storedData));
    });
});
