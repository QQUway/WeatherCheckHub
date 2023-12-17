import React, { useState, useEffect } from "react";
import { key, base } from "./ApiKeys";
import { useNavigate, useLocation } from "react-router-dom";
import users from "./Users";

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = key;
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultCityWeatherData, setDefaultCityWeatherData] = useState(null);

  // Fetch weather data by city
  const fetchWeatherDataByCity = async (cityName) => {
    try {
      const response = await fetch(
        `${base}weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `${base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
            );
            if (response.ok) {
              const data = await response.json();
              setWeatherData(data);
              setLoading(false);
            } else {
              throw new Error("Failed to fetch data");
            }
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        },
        (error) => {
          console.error(error);
          setLoading(false);
        },
      );
    } else {
      console.error("Geolocation not available");
      setLoading(false);
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    if (city !== "") {
      setLoading(true);
      fetchWeatherDataByCity(city);
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    navigate("/"); // Redirect to login page after logout
  };

  // Get user information from location state passed by Login component
  const currentUser = location.state?.user;

  // Fetch default city weather for the logged-in user
  const fetchCurrentUserDefaultCityWeather = async () => {
    if (currentUser) {
      try {
        const response = await fetch(
          `${base}weather?q=${currentUser.defaultCity}&units=metric&appid=${API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          setDefaultCityWeatherData(data); // Set weather data for the default city
        } else {
          throw new Error("Failed to fetch default city data");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getCurrentLocationWeather(); // Fetch current location weather on component mount
    fetchCurrentUserDefaultCityWeather(); // Fetch current user's default city weather
  }, [currentUser]); // Run useEffect when currentUser changes

  useEffect(() => {
    getCurrentLocationWeather(); // Fetch current location weather on component mount
    fetchCurrentUserDefaultCityWeather(); // Fetch current user's default city weather
  }, []);

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
              <div className="details">
                <p>{`Description: ${weatherData.weather[0].description}`}</p>
                <p>{`Humidity: ${weatherData.main.humidity}%`}</p>
                <p>{`Wind Speed: ${weatherData.wind.speed} m/s`}</p>
                {/* You can display more weather details here */}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Second card for the current user's default city weather */}
      <div className="card">
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
                  {/* You can display more weather details here */}
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
