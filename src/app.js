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

// finding weather data


let apiKey= "d33b97a34ddb5f2f68fc2d4628e9869a";
let apiUrl="https://api.openweathermap.org/data/2.5/weather?";
let city= 'Madrid'
axios.get(`${apiUrl}q=${city}&APPID=${apiKey}&units=metric`).then(showTemperature);


function showTemperature (response)
{
let temperature = Math.round(response.data.main.temp);
let h3 = document.querySelector("h3");
    h3.innerHTML= (temperature);
let cityElement = document.querySelector("#city");
cityElement.innerHTML= response.data.name;
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.weather[0].description;
console.log(response.data);
let humidElement= document.querySelector("#humid");
humidElement.innerHTML = response.data.main.humidity;
let windElement = document.querySelector("#wind");
windElement.innerHTML = response.data.wind.speed;
};





