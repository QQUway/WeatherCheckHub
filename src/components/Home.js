import React, { useState, useEffect } from "react";
import { key, base } from "./ApiKeys";
import { useNavigate, useLocation } from "react-router-dom";
import users from "./Users";

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [defaultCityWeatherData, setDefaultCityWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null); // State to store weather icon URL
  const API_KEY = key;
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const currentUser = location.state?.user;
  const [currentBackground, setCurrentBackground] = useState(null);

  const isAuthenticated = () => {
    return localStorage.getItem("currentUser") !== null;
  };

  
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
      setError("Unauthorized Access");
    } else {
      fetchCurrentUserDefaultCityWeather();
    }
  }, [navigate]);

  const fetchWeatherIcon = async (iconCode) => {
    try {
      const iconResponse = await fetch(
        `http://openweathermap.org/img/wn/${iconCode}.png`
      );
      if (iconResponse.ok) {
        setWeatherIcon(iconResponse.url);
      } else {
        throw new Error("Failed to fetch weather icon");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeatherDataByCity = async (cityName) => {
    try {
      const response = await fetch(
        `${base}weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
        localStorage.setItem("weatherData", JSON.stringify(data));

        // Set background image based on weather
        setCurrentBackground(
          `url('https://source.unsplash.com/1600x900/?${data.name}+city')`
        );

        // Fetch weather icon
        fetchWeatherIcon(data.weather[0].icon); // Assuming weather icon code is in the response data
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `${base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );

          if (response.ok) {
            const data = await response.json();
            setWeatherData(data);
            setLoading(false);
            localStorage.setItem("weatherData", JSON.stringify(data));

            // Fetch weather icon
            fetchWeatherIcon(data.weather[0].icon);
          } else {
            throw new Error("Failed to fetch data");
          }
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      console.error("Geolocation not available");
      setLoading(false);
    }
  };

 
  const handleSearch = (e) => {
    e.preventDefault();
    if (city !== "") {
      setLoading(true);
      fetchWeatherDataByCity(city);
    }
  };

 
  const handleLogout = () => {
    navigate("/"); 
  };

  

  const fetchCurrentUserDefaultCityWeather = async () => {
    if (currentUser) {
      try {
        const response = await fetch(
          `${base}weather?q=${currentUser.defaultCity}&units=metric&appid=${API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          setDefaultCityWeatherData(data);
        } else {
          throw new Error("Failed to fetch default city data");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    // Fetch current location weather and set as initial data
    getCurrentLocationWeather();
  }, []);



 

  useEffect(() => {
    // Update background when weatherData changes
    if (weatherData && weatherData.name) {
      setCurrentBackground(`url('https://source.unsplash.com/1600x900/?${weatherData.name}')`);
    }
  }, [weatherData]);

  // Update background when currentBackground changes
  useEffect(() => {
    if (currentBackground) {
      document.body.style.backgroundImage = currentBackground;
    }
  }, [currentBackground]);

  return (
    <>
      <div className="card">
      <div className="search">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (city !== "") {
                setLoading(true);
                fetchWeatherDataByCity(city);
              }
            }}
          >
            <input
              type="text"
              className="searchbar"
              placeholder="Search for a city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className={`weather ${loading ? "loading" : ""}`}>
          {weatherData && (
            <>
              <h2 className="city">{`Weather in ${weatherData.name}`}</h2>
              <h1 className="temp">{`${weatherData.main.temp}°C`}</h1>
              {weatherIcon && <img src={weatherIcon} alt="Weather Icon" />}
              <div className="details">
                <p>{`Description: ${weatherData.weather[0].description}`}</p>
                <p>{`Humidity: ${weatherData.main.humidity}%`}</p>
                <p>{`Wind Speed: ${weatherData.wind.speed} m/s`}</p>
                {/* Display more weather details here */}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card">
        {/* Default city weather details */}
        {currentUser && (
          <>
            <h2>{`Welcome Back ${currentUser.username}`}</h2>
            <h2>{`Weather in ${currentUser.defaultCity}`}</h2>
            {defaultCityWeatherData && (
              <>
                <h1>{`${defaultCityWeatherData.main.temp}°C`}</h1>
                <div className="details">
                  <p>{`Description: ${defaultCityWeatherData.weather[0].description}`}</p>
                  <p>{`Humidity: ${defaultCityWeatherData.main.humidity}%`}</p>
                  <p>{`Wind Speed: ${defaultCityWeatherData.wind.speed} m/s`}</p>
                  {/* Display more weather details here */}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
