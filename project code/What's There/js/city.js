/* Weather

*/

var APPID = "c41f983ab41ba45e3da75f49e0bbafc0";
var temp;
var icon;
var description;
var wind;
var direction;

var the_forecast = new Array();

function updateByName(name){
  var url ="http://api.openweathermap.org/data/2.5/weather?" +
            "q=" + name + "&APPID=" + APPID;
            sendRequest(url);
}

function updateByNameForecast(name){
  var url ="http://api.openweathermap.org/data/2.5/forecast?" +
            "q=" + name + "&APPID=" + APPID;
            sendRequestForecast(url);
}

function sendRequest(url){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var data = JSON.parse(xmlhttp.responseText);
        var weather = {};
        weather.icon = data.weather[0].icon;
        weather.description = data.weather[0].description;
        weather.wind = data.wind.speed;
        weather.direction = degreesToDirection(data.wind.deg);
        weather.temp = K2F(data.main.temp);
        update(weather);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function sendRequestForecast(url){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var data = JSON.parse(xmlhttp.responseText);
        var forecast = new Array();

        for (var i = 0; i < 5; i++)
          forecast.push(new Object());

        for(i = 0; i < 5; i++){
          forecast[i].date = data.list[i].dt;
          forecast[i].min = K2F(data.list[i].main.temp_min);
          forecast[i].max = K2F(data.list[i].main.temp_max);
          forecast[i].desc = data.list[i].weather.description;
        }
        updateForecast(forecast);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function degreesToDirection(degrees){
  var range = 360/16;
  var low = 0-range/2;
  var high = (low+range) % 360;
  var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  for(i in angles){
    if(degrees >= low && degrees < high)
      return angles[i];

    low = (low + range) & 360;
    high = (high + range) % 360;

  }
}

function K2C(k){
  return Math.round(k - 273.15);
}

function K2F(k){
  return Math.round(k*(9/5)-459.67);
}
function update(weather){
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
    description.innerHTML = weather.description;
    temp.innerHTML = weather.temp;
    icon.src = "http://openweathermap.org/img/w/" + weather.icon + ".png";
}

function updateForecast(weather){

    for(i = 0; i < 5; i++){

      console.log(i);
      the_forecast[i].date.innerHTML = weather[i].date;
      the_forecast[i].min.innerHTML = weather[i].min;
      the_forecast[i].max.innerHTML = weather[i].max;
      the_forecast[i].desc.innerHTML = weather[i].desc;
    }

}

window.onload = function() {
    // Get elements to be updated
    // Current Weather
    temp = document.getElementById("temperature");
    description = document.getElementById("description");
    icon = document.getElementById("icon");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");

    // Get city name of page and update weather by city name
    var cname = document.getElementById("cityname");
    console.log(cname);
    updateByName(cname.innerHTML); // Updates current weather
}

// Initializes variables when forecast button is pressed
function loadForecast(){
  for (var i = 0; i < 5; i++)
    the_forecast.push(new Object());

    if(document.getElementById("tomorrowdate") != null){


  //5 day forecast
    the_forecast[0].date = document.getElementById("tomorrowdate");
    the_forecast[0].min = document.getElementById("tomorrowmin");
    the_forecast[0].max = document.getElementById("tomorrowmax");
    the_forecast[0].desc = document.getElementById("tomorrowdesc");
    the_forecast[1].date = document.getElementById("2fromnowdate");
    the_forecast[1].min = document.getElementById("2fromnowmin");
    the_forecast[1].max = document.getElementById("2fromnowmax");
    the_forecast[1].desc = document.getElementById("2fromnowdesc");
    the_forecast[2].date = document.getElementById("3fromnowdate");
    the_forecast[2].min = document.getElementById("3fromnowmin");
    the_forecast[2].max = document.getElementById("3fromnowmax");
    the_forecast[2].desc = document.getElementById("3fromnowdesc");
    the_forecast[3].date = document.getElementById("4fromnowdate");
    the_forecast[3].min = document.getElementById("4fromnowmin");
    the_forecast[3].max = document.getElementById("4fromnowmax");
    the_forecast[3].desc = document.getElementById("4fromnowdesc");
    the_forecast[4].date = document.getElementById("5fromnowdate");
    the_forecast[4].min = document.getElementById("5fromnowmin");
    the_forecast[4].max = document.getElementById("5fromnowmax");
    the_forecast[4].desc = document.getElementById("5fromnowdesc");
    console.log(the_forecast[0].date.innerHTML);
    var cname = document.getElementById("cityname");
    console.log(cname.innerHTML);
    updateByNameForecast(cname.innerHTML); // Updates the 5 day forecast
  }
}
