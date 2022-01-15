let now = new Date();

let days=[
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
let day = days[now.getDay()];

let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

let month = months[now.getMonth()];
let date = now.getUTCDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let h2 = document.querySelector("h2");
h2.innerHTML= `Today, ${day}, ${month} ${date}, ${hour}:${minutes}`;

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }



function search(event)
{event.preventDefault();
let apiKey= "d33b97a34ddb5f2f68fc2d4628e9869a";
let apiUrl="https://api.openweathermap.org/data/2.5/weather?";
let stadt= document.querySelector("#city-input").value;
axios.get(`${apiUrl}q=${stadt}&APPID=${apiKey}&units=metric`).then(showTemperature);

};
let celsiusTemperature= null;


  let form = document.querySelector("#form-input");
form.addEventListener("submit", search);

  function displayForecast(response) {
    let prediction = response.data.daily;
let forecastElement = document.querySelector("#forecast");
let forecastHTML= "";
prediction.forEach(function(predictionDay, index) {
    if(index<6) {
    forecastHTML=forecastHTML + `<div class="row align-items-start Box">
<div class="col">
    <p>${formatDay(predictionDay.dt)}</p>
  </div>
<div class="col">
    <p>Nov, 14th</p>
</div>
<div class="col">
   <img src="http://openweathermap.org/img/wn/${predictionDay.weather[0].icon}@2x.png" alt=""/>
</div>
<div class="col">
    <p>Min <span class="temperature"> ${Math.round(predictionDay.temp.max)}°</span></p>
  </div>
<div class="col">
    <p>Max <span class="temperature"> ${Math.round(predictionDay.temp.max)}°</span></p>
</div>
<div class="col">
    <p><span class="avgtemp">${predictionDay.temp.max}°</span></p>
</div>
</div>
</br>`;
    }
});
forecastElement.innerHTML= forecastHTML;
} 

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "d33b97a34ddb5f2f68fc2d4628e9869a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  } 

function showTemperature (response)
{
let searchInput = document.querySelector("#city-input");
let h1 = document.querySelector("h1");
    h1.innerHTML = `${searchInput.value}`;
let temperature = Math.round(response.data.main.temp);
let h3 = document.querySelector("#temperature");
    h3.innerHTML= (temperature);
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.weather[0].description;
console.log(response.data);
let humidElement= document.querySelector("#humid");
humidElement.innerHTML = response.data.main.humidity;
let windElement = document.querySelector("#wind");
windElement.innerHTML = response.data.wind.speed;
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
celsiusTemperature = Math.round(response.data.main.temp);
getForecast(response.data.coord);

}



//converting Celsius to Fahrenheit and vice versa

function showFahrenheit(event)
{event.preventDefault();
    celsiuslink.classList.remove("active");
    fahrenheitlink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = celsiusTemperature * 9/5 +32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitlink = document.querySelector("#fahrenheitLink");
fahrenheitlink.addEventListener("click",showFahrenheit);

function showCelsius(event)
{event.preventDefault();
    celsiuslink.classList.add("active");
    fahrenheitlink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiuslink = document.querySelector("#celsiusLink");
celsiuslink.addEventListener("click",showCelsius);


    
