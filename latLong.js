document.getElementById('getWeather').addEventListener('click', function() {
    const lat = document.getElementById('lat').value;
    const long = document.getElementById('long').value;
    const resultDiv = document.getElementById('result-container');
    const tempDisplay = document.getElementById('temp-display');

    // Basic validation to make sure fields aren't empty
    if (!lat || !long) {
        alert("Please enter both latitude and longitude.");
        return;
    }

    // Construct the URL with dynamic parameters
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;

    // Perform the API call
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            // Extract the temperature from the JSON structure
            const temperature = data.current_weather.temperature;
            
            // Display the data
            tempDisplay.innerText = `${temperature}°C`;
            resultDiv.classList.remove('hidden');
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Could not retrieve weather. Please check your coordinates.");
        });
});