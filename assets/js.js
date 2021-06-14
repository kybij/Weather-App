// current weather/search
let weather = {
    apiKey: "fd05b85bcfc1b3e8218a8132d1f1dbb5",
    fetchWeather: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=imperial&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => {
                this.displayWeather(data)
                this.fiveDay(city)
            });

    },
    fiveDay: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/forecast?q="
            + city
            + "&units=imperial&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                var fiveDayForecast = data.list
                for (let i = 4; i < fiveDayForecast.length; i = i + 8) {

                    console.log(fiveDayForecast[i])
                    let date = moment(fiveDayForecast[i].dt, "X").format(" MMMM Do YYYY");
                    let icon = "http://openweathermap.org/img/w/" + fiveDayForecast[i].weather[0].icon + ".png"
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
                document.querySelector(".uv").innerText = "UV Index: " + uvData.current.uvi
                document.querySelector(".city").innerText = "Weather in " + name;
                document.querySelector(".icon").setAttribute("src",
                    "http://openweathermap.org/img/w/" + icon + ".png")
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
                currentUVEl.innerHTML = "UV Index: ";
                currentUVEl.append(UVIndex);
                currentUVEl.append(UVIndex)

            })


    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
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
var storedInput = localStorage.getItem("textinput")

if (search) {
    text.textContent = storedInput
}
search.addEventListener("input", letter => {
    text.textContent = letter.target.value
})

const savelocalStorage = () => {
    localStorage.setItem("textinput", text.textContent)
}


btn.addEventListener("click", savelocalStorage)


// search cities
document.querySelector(".btn").addEventListener("click", function () {
    weather.search()
});


