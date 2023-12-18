import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { key, base } from "./ApiKeys";

const Notes = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const initialTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser?.id}`)) || [];
  const API_KEY = "e8c8e57a1b40a82b1510a59e46c1275a";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/";

  const [tasks, setTasks] = useState(initialTasks);
  const [taskInput, setTaskInput] = useState("");
  const [developerId, setDeveloperId] = useState(currentUser?.id || 1);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);


  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/"); 
    }
  }, [navigate]);


   useEffect(() => {
    const storedWeatherData = JSON.parse(localStorage.getItem("weatherData"));
    if (storedWeatherData) {
      setCurrentWeather(storedWeatherData);
      setSuggestions(generateSuggestions(storedWeatherData.weather[0].id));
    }
  }, []);


  

  const generateSuggestions = (weatherCode) => {
    let suggestionsArray = [];
    
    switch (Math.floor(weatherCode / 100)) {
  
      case 2: // Group for Thunderstorm
        suggestionsArray = [
          "Stay indoors and avoid travel if possible.",
          "Keep away from windows and doors.",
          "Unplug electronics during lightning storms.",
          "Keep emergency supplies handy.",
          "Avoid using wired electronics.",
          "Secure outdoor objects that could be blown away.",
          "Stay updated on weather warnings and alerts.",
          "Avoid contact with electrical equipment or water during storms.",
          "Charge electronic devices in case of power outages.",
          "Stay in a safe, sturdy building.",
          "Avoid using landline phones during storms.",
          "Stay away from tall, isolated trees or structures.",
          "Avoid taking a shower or bath during thunderstorms.",
          "Close blinds or curtains to prevent broken glass.",
          "Stay clear of flooded areas or flowing water.",
          "Stay tuned to radio or TV for emergency updates.",
          "Keep a first aid kit and flashlight ready.",
          "Seek shelter in a sturdy building if outdoors.",
          "If driving, pull over to a safe area and park.",
        ];
        break;
      case 3: // Group for Drizzle
        suggestionsArray = [
          "Carry an umbrella when going out.",
          "Drive carefully and keep a safe distance on roads.",
          "Wear a waterproof jacket.",
          "Avoid walking in areas prone to waterlogging.",
          "Be cautious of slippery roads and walkways.",
          "Use windshield wipers and headlights while driving.",
          "Check for updated weather forecasts before leaving.",
          "Consider using rainproof accessories like boots and bags.",
          "Take precautions to prevent slipping or falling.",
          "Stay informed about possible flooding in your area.",
          "Look out for pedestrians while driving in rain.",
          "Stay away from low-lying areas during heavy rainfall.",
          "Ensure proper drainage around your home.",
          "Avoid using electronic devices during heavy rain.",
          "Use reflective clothing for better visibility.",
          "Maintain a safe distance from vehicles on wet roads.",
          "Inspect your vehicle’s tires and brakes regularly.",
          "Park vehicles away from trees or potential falling objects.",
          "Avoid driving through large puddles.",
        ];
        break;
      case 5: // Group for Rain
        suggestionsArray = [
          "Stay dry indoors and read a book.",
          "Listen to calming music while it rains.",
          "Watch a movie with a warm drink.",
          "Avoid driving unless necessary.",
          "Check drainage systems to prevent waterlogging.",
          "Be mindful of potential flooding in low-lying areas.",
          "Carry a waterproof cover for electronic devices.",
          "Avoid walking through flooded areas.",
          "Use raincoats or umbrellas for protection.",
          "Keep essential documents in waterproof bags.",
          "Protect sensitive electronic equipment from moisture.",
          "Stay away from steep slopes during heavy rainfall.",
          "Avoid using elevators during heavy rain.",
          "Keep an emergency kit with food and water.",
          "Use sandbags to divert water away from your home.",
          "Monitor weather alerts and advisories.",
          "Stay on higher ground during heavy rain.",
          "Avoid playing or standing near drainage areas.",
          "Secure outdoor furniture to prevent damage.",
        ];
        break;
      case 6: // Group for Snow
        suggestionsArray = [
          "Dress warmly and take precautions while walking.",
          "Enjoy outdoor winter sports.",
          "Build a snowman!",
          "Use snowshoes or proper footwear for walking.",
          "Keep extra blankets and warm clothing handy.",
          "Drive slowly and cautiously on icy roads.",
          "Check road conditions before traveling.",
          "Keep a shovel and rock salt for clearing pathways.",
          "Prepare a winter emergency kit for your vehicle.",
          "Stay aware of frostbite and hypothermia risks.",
          "Limit time outdoors in extreme cold.",
          "Protect pets from cold temperatures.",
          "Avoid overexertion while shoveling snow.",
          "Keep hydrated even in cold weather.",
          "Watch for signs of cold-related health issues.",
          "Ensure proper ventilation when using heaters.",
          "Avoid walking on frozen ponds or lakes.",
          "Use reflective clothing for visibility in snowstorms.",
          "Clear snow from rooftops to prevent damage.",
        ];
        break;
      case 7: // Group for Atmosphere
        suggestionsArray = [
          "Stay indoors if air quality is poor.",
          "Use air purifiers to improve indoor air quality.",
          "Avoid vigorous outdoor activities.",
          "Wear masks or respirators if air quality is severely affected.",
          "Stay updated on air quality reports in your area.",
          "Keep windows and doors closed during poor air conditions.",
          "Limit exposure to outdoor pollutants.",
          "Stay hydrated to support your immune system.",
          "Seek medical advice if experiencing respiratory issues.",
          "Consider using HEPA filters in your home.",
          "Create a clean-air room in your home.",
          "Ventilate rooms by opening windows during better air quality.",
          "Clean air ducts and vents regularly.",
          "Avoid using chemical cleaners in enclosed spaces.",
          "Use indoor plants to improve air quality.",
          "Reduce usage of candles or incense indoors.",
          "Avoid tobacco smoke in closed environments.",
          "Keep pets away from smoke or pollutants.",
          "Avoid outdoor exercising during poor air quality.",
        ];
        break;
      case 8: // Group for Clear or Clouds
        suggestionsArray = [
          "Go for a walk in the park.",
          "Have a picnic outdoors.",
          "Visit a nearby beach.",
          "Stargaze at night.",
          "Watch a sunset or sunrise.",
          "Enjoy outdoor sports or activities.",
          "Take photographs of scenic views.",
          "Organize outdoor events or gatherings.",
          "Set up a backyard camping experience.",
          "Engage in gardening or nature walks.",
          "Plan a barbecue with friends or family.",
          "Take a leisurely bike ride.",
          "Try outdoor yoga or meditation.",
          "Birdwatching in nature parks.",
          "Organize a bonfire with safety precautions.",
          "Create outdoor art or crafts.",
          "Read a book in an outdoor setting.",
          "Host an outdoor movie night.",
          "Try fishing or boating activities.",
        ];
        break;
      default:
        suggestionsArray = ["No specific suggestions for this weather condition."];
        break;
    }
  
  
    suggestionsArray = suggestionsArray.sort(() => Math.random() - 0.5);
  
   
    return suggestionsArray.slice(0, 5);
  };
  
  

  const addTask = () => {
    if (taskInput.trim() !== "") {
      const newTask = {
        developerId,
        task: taskInput,
      };

      setTasks([...tasks, newTask]);
      setTaskInput("");

      localStorage.setItem(`tasks_${currentUser.id}`, JSON.stringify([...tasks, newTask]));
    }
  };

  const handleDeveloperChange = (e) => {
    setDeveloperId(parseInt(e.target.value));
  };

  const removeTask = (indexToRemove) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${currentUser.id}`, JSON.stringify(updatedTasks));
  };

  if (!currentUser) {
    return null; 
  }

  return (
    <div className="notes-container">
      <div className="cards-container" style={{ display: "flex"}}>
        <div className="card" key="taskCard">
          <h2>{currentUser.username}'s Task List</h2>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter task"
          />
          <button onClick={addTask}>Add Task</button>
          <ul>
            {tasks.map((task, index) => {
              if (task.developerId === developerId) {
                return (
                  <li key={index} onClick={() => removeTask(index)}>
                    {task.task}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>


        <div className="card" key="weatherCard">
          <h2>Weather Suggestions</h2>
          {currentWeather ? (
            <>
              <p>{`It is currently ${currentWeather.weather && currentWeather.weather[0]?.main} in ${currentWeather.name}`}</p>
              <p>Weather : {currentWeather.weather && currentWeather.weather[0]?.description}</p>
              <p>Temperature: {currentWeather.main && currentWeather.main.temp}°C</p>
            </>
          ) : (
            <p>No weather data available</p>
          )}
          <h3>Suggestions:</h3>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default Notes;
