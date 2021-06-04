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
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        // document.querySelector(".icon").src =
        // "http://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innerText = description
        document.querySelector(".temp").innerText = temp + " °F"
        document.querySelector(".humidity").innerText = "humidity: " + humidity + "%"
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " MPH"
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

if(search) {
    text.textContent = storedInput
}
search.addEventListener("input", letter => {
    text.textContent = letter.target.value
})

const savelocalStorage = () => {
    localStorage.setItem ("textinput", text.textContent)
}


 btn.addEventListener("click", savelocalStorage)


// search cities
document.querySelector(".btn").addEventListener("click", function () {
    weather.search()
});

// document.querySelector(".search-bar").addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         weather.search()
//     }
// });
