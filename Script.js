const api = {
  key: "ee2982961a0b11e8a30609f25559e891",
  base: "https://api.openweathermap.org/data/2.5/",
};

const fiveDaysApi = {
  key: "ee2982961a0b11e8a30609f25559e891",
  base: "https://api.openweathermap.org/data/2.5/forecast",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    getFiveDaysResults(searchbox.value);
    console.log(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function getFiveDaysResults(query) {
  fetch(`${fiveDaysApi.base}?q=${query}&units=metric&appid=${fiveDaysApi.key}`)
    .then((response) => {
      return response.json();
    })
    .then(displayFiveDaysResults);
}

function displayFiveDaysResults(weather) {
  console.log("fivedaysresults", weather);
  var forCastList = weather.list;
  forCastList.forEach(function (forCast) {
    if (forCast.dt_txt.indexOf("09:00:00") !== -1) {
        var colEl = document.createElement("div")
        colEl.classList.add("col")
        var cardEl = document.createElement("div")
        cardEl.classList.add("card") 
        var tempEl = document.createElement("p")
        tempEl.textContent = "Temp: " + forCast.main.temp
        cardEl.appendChild(tempEl)

        //step 1 make new el
         // look at line 47
        var imgEl = document.createElement("cards")
        //give that new el content
         //which is what we did on line 48
        imgEl.src = "cards: " + 
        //add that new el to the card(line 49)


        colEl.appendChild(cardEl)
        document.querySelector("#forcast-row").appendChild(colEl)
       
    }
  });
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = moment();
  let today = moment(now).format("LLLL");
  let date = document.querySelector(".date");
  date.innerText = today;

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C<span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
