const input = document.querySelector('.search-bar');

let fetchWeather = function(city){
    const apiKey = "ab55f1b29ff978bec8fc5ddc10e56d4b";
    let url = "https://api.openweathermap.org/data/2.5/weather?q="
    + city
    + "&units=metric&appid="
    + apiKey;
    
    fetch(url) 
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
       
        return response.json();
    })
    .then(data => {
      
       weatherDetails(data);
    })
    .catch((error) => {
        console.error('Error fetching weather data:', error)
       
        throw error;
});
}

let weatherDetails= function(data) {
    
    try {
        const name = data.name;
        const weatherIcon = data.weather[0].icon;
        const weatherDescription = data.weather[0].description;
        const temp = data.main.temp; 
        const humidity = data.main.humidity;
        const speed = data.wind.speed;
        
        document.querySelector('.city').innerText = 'Weather in ' + name;
        document.querySelector('#icon').src = 'https://openweathermap.org/img/wn/'+ weatherIcon +'.png'
        document.querySelector('#state').innerHTML =  weatherDescription;
        document.querySelector('.temp').innerHTML= temp + `&deg;C`;
        document.querySelector('.humidity').innerHTML = "Humidity : " + humidity + '%';
        document.querySelector('.wind').innerHTML =  'Wind speed : ' + speed + 'km/h';
    } catch (error) {
        console.log(error)
    }
} 


document.querySelector('.search button').addEventListener('click', (e) => {
    e.preventDefault();
    
    fetchWeather(input.value);
});

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter'){
        e.preventDefault();
        fetchWeather(input.value);
    }
});



