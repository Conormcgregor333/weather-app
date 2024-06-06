import { useState, useEffect } from "react";
import "./App.css";

export default function Search() {
  let param = "london";
  let [search, setSearch] = useState("");
  let [loading, setLoading] = useState(true);
  let [weather, setWeather] = useState(null);
  function handleSearch(param) {
    let getData = async () => {
      let d = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=fc4ee17cac3b006d990f26cc1e4feaf9`
      );
      let k = await d.json();
      if (k) {
        setWeather(k);
        console.log(k);
        setLoading(false);
      }
    };
    getData();
  }

  return (
    <div
      className="container"
      style={
        weather.weather[0].main == "Clouds"
          ? { backgroundImage: "url(https://j.gifs.com/vQJxxY.gif)" }
          : weather.weather[0].main == "Rain"
          ? {
              backgroundImage:
                "url(https://th.bing.com/th/id/R.5207680e1eafd7233ab094b5f910e6af?rik=KZhkKFGKm4lhhQ&riu=http%3a%2f%2fbestanimations.com%2fNature%2fWater%2frain%2frain-nature-animated-gif-21.gif&ehk=lBF1ql92mhoIINxp3h%2b18XZodQzsNC5qwcJwiXoS0Jg%3d&risl=&pid=ImgRaw&r=0)",
            }
          : weather.weather[0].main == "Clear"
          ? {
              backgroundImage:
                "url(https://th.bing.com/th/id/R.b4fbb578953d15beee6209f77c9435d8?rik=Ai257dyYkviqYQ&riu=http%3a%2f%2f68.media.tumblr.com%2f4f35ecd44ba9b0921c2b571909a47ae7%2ftumblr_onnkh4jZoK1viiyyio1_500.gif&ehk=DS1ITO7ueFfCUAJ4RG0M%2fL3Gk3k2vKyjStlV9JFUcG8%3d&risl=&pid=ImgRaw&r=0)",
            }
          : null
      }
    >
      <p>Check the Weather</p>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button
        className="btn"
        onClick={() => {
          handleSearch(search);
        }}
      >
        Search
      </button>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div className="weather">
          <div>
            <span>{weather.name + " ,"} </span>
            <span>{weather.sys.country}</span>
          </div>
          <div>
            Feel Like : {Math.round(weather.main.feels_like - 273.15)} °C
          </div>
          <div>{weather.weather[0].description}</div>
          <div>Max Temp : {Math.round(weather.main.temp_max - 273.15)} °C</div>
          <div>Min Temp : {Math.round(weather.main.temp_min - 273.15)} °C</div>
          <div>Humidity : {weather.main.humidity}</div>
          <div>Looks like : {weather.weather[0].main}</div>
        </div>
      )}
    </div>
  );
}
//Clear,Clouds,Rain
