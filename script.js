document.addEventListener('DOMContentLoaded', function () {
    const defaultData = {
        math: [85, 88, 90, 87],
        physics: [78, 79, 82, 85],
        chemistry: [92, 94, 91, 93],
        biology: [88, 85, 89, 90],
        history: [76, 80, 78, 77],
        geography: [89, 90, 87, 88],
        sanskrit: [82, 84, 86, 83], // Added Sanskrit
        it: [79, 81, 80, 78] // Added IT
    };

    // Load data from local storage or use default data
    const storedData = JSON.parse(localStorage.getItem('studentPerformanceData')) || defaultData;
    const subjects = Object.keys(storedData);
    const charts = {};

    // Initialize charts and update summary statistics
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
                        min: 1,
                        max: 100 // Adjusted max value for y-axis
                    }
                }
            }
        });
    });

    // Update summary statistics
    updateSummary();

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

        // Update summary statistics
        updateSummary();

        // Store the updated data in local storage
        localStorage.setItem('studentPerformanceData', JSON.stringify(storedData));
    });

    // Function to update summary statistics
    function updateSummary() {
        const scores = subjects.map(subject => storedData[subject]).flat();
        const average = calculateAverage(scores);
        const highest = Math.max(...scores);
        const lowest = Math.min(...scores);

        document.getElementById('average-score').textContent = average.toFixed(2);
        document.getElementById('highest-score').textContent = highest;
        document.getElementById('lowest-score').textContent = lowest;
    }

    // Function to calculate average
    function calculateAverage(arr) {
        if (arr.length === 0) return 0;
        const sum = arr.reduce((acc, val) => acc + val, 0);
        return sum / arr.length;
    }
});
