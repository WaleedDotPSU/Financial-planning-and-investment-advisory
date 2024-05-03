document.addEventListener('DOMContentLoaded', function () {
  var analyticsGraph = document.getElementById('analytics-graph');

  // Chart.js code
  var ctx = document.getElementById('analyticsChart').getContext('2d');
  var chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
              label: 'Wallet Balance',
              data: [50, 100, 150, 200, 250, 300, 350], // Example data
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  // Show the graph by default
  analyticsGraph.style.display = 'block';
});
