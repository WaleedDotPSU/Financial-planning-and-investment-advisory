// JavaScript code
document.addEventListener('DOMContentLoaded', function () {
    // Analytics Chart
    var analyticsCtx = document.getElementById('analyticsChart').getContext('2d');
    var analyticsChart = new Chart(analyticsCtx, {
      type: 'line', // Choose appropriate chart type (line, bar, pie, etc.)
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Website Traffic',
          data: [500, 700, 850, 900, 1000, 1200], // Example data, replace with your analytics data
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  
    // Stock Market Chart
    var stockMarketCtx = document.getElementById('stockMarketChart').getContext('2d');
    var stockMarketChart = new Chart(stockMarketCtx, {
      type: 'line', // Choose appropriate chart type
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Stock Price',
          data: [100, 120, 110, 130, 140, 150], // Example data, replace with your stock market data
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  });
  