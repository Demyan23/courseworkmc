$(document).ready(function() {
    $('#getDataBtn').click(function() {
      $.ajax({
        url: 'http://localhost:3000/data',
        method: 'GET',
        success: function(data) {
          const temperature = data.temperature;
          const humidity = data.humidity;
          const dataContainer = $('#dataContainer');
          dataContainer.html('Temperature: ' + temperature + '°C<br>Humidity: ' + humidity + '%');
        },
        error: function(xhr, status, error) {
          console.log('Error:', error);
        }
      });
    });
  });