var cities = localStorage.getItem("textinput")? JSON.parse(localStorage.getItem("textinput")) : []

// current weather/search
let weather = {
    apiKey: "fd05b85bcfc1b3e8218a8132d1f1dbb5",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=imperial&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => {
                this.displayWeather(data)
                console.log(city)
                if (cities.includes(city)=== false){
                    cities.push(city)
                    console.log(cities)
                    localStorage.setItem("textinput", JSON.stringify(cities))
                 
                }
                displayBtns(cities);
                this.fiveDay(city)
               
            });

    },
    fiveDay: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q="
            + city
            + "&units=imperial&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                var fiveDayForecast = data.list
                $(".card-deck").empty()
                for (let i = 4; i < fiveDayForecast.length; i = i + 8) {

                    console.log(fiveDayForecast[i])
                    let date = moment(fiveDayForecast[i].dt, "X").format(" MMMM Do YYYY");
                    let icon = "https://openweathermap.org/img/w/" + fiveDayForecast[i].weather[0].icon + ".png"
                    let temp = fiveDayForecast[i].main.temp
                    let humidity = fiveDayForecast[i].main.humidity
                    console.log(date, icon, temp, humidity)
                    document.querySelector(".card-deck")
                        .innerHTML += `
                      <div class="card">
                      <h5 class="card-title"> ${date}</h5>
                  <div class="card-body">
                  <img class="card-img-top" src="${icon}" alt="Card image cap">
                    <p class="card-text">temp:${temp}</p>
                    <p class="card-text">humidity:${humidity}</p>
                  </div>
                </div>
                      
                      `
                }
            })
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var apiKey = "fd05b85bcfc1b3e8218a8132d1f1dbb5"
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat="
            + lat
            + "&lon="
            + lon
            + "&appid="
            + apiKey
        ).then(function (response) {
            return response.json()
        })
            .then(function (uvData) {
                console.log(uvData)
                console.log(name, icon, description, temp, humidity, speed)
                
                document.querySelector(".city").innerText = "Weather in " + name;
                document.querySelector(".icon").setAttribute("src",
                    "https://openweathermap.org/img/w/" + icon + ".png")
                document.querySelector(".description").innerText = description
                document.querySelector(".temp").innerText = temp + " °F"
                document.querySelector(".humidity").innerText = "humidity: " + humidity + "%"
                document.querySelector(".wind").innerText = "Wind speed: " + speed + " MPH"

                var UVIndex = uvData.current.uvi
                var UVHtml = document.querySelector(".uv")
                if (UVIndex < 4) {
                    UVHtml.setAttribute("class", "badge badge-success");
                } else if (UVIndex < 8) {
                    UVHtml.setAttribute("class", "badge badge-warning");
                } else {
                    UVHtml.setAttribute("class", "badge badge-danger");
                }
                UVHtml.innerHTML = "UV Index: ";
                UVHtml.append(UVIndex);

 
            })


    },
    search: function (cityName) {
        this.fetchWeather(cityName);
    }
};

// date
const m = moment()
const getCurrentHour = moment().hour()
let output = (m.format(" MMMM Do YYYY"));
$(".date").text(output)

// recent searches
var search = document.querySelector(".search-bar")
var btn = document.querySelector(".btn")
var text = document.querySelector(".one")

function displayBtns (cities) {
    var cityList = $(".list");
    console.log(cityList)
    cityList.empty() 
    
    for (let index = 0; index < cities.length; index++) {
        var list = $("<li>").addClass("listItem").text(cities[index]);
        list.on("click", function () {
            weather.search(this.textContent)
        })
        cityList.append(list)
        }

        
}


// search cities
document.querySelector(".btn").addEventListener("click", function () {
    weather.search(document.querySelector(".search-bar").value)
    
});

 
    
    displayBtns(cities);
    if ( cities.length != 0) {
        weather.search(cities[cities.length-1])
    }
 


// c