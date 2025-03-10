import React, { useState, useEffect } from 'react';
import axios from 'axios';
import'./App.css';

function App() {
  const API_KEY = 'e029280987144379b6f221134250803';
  const API_URL = "https://api.weatherapi.com/v1/forecast.json";
  const [city, setCity] = useState(""); 
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState(null);  
  const [lon, setLon] = useState(null);

  const fetchWeather = async (cityName = null, lat = null, lon = null) => {
    try {
      const params = {
        key: API_KEY,
        days: 7,
      };
      if (cityName) {
        params.q = cityName;
      } else if (lat && lon) { 
        params.q = `${lat},${lon}`;
      }
      
      const response = await axios.get(API_URL, { params });
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  useEffect(() => {
    if (!city && navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(null, latitude, longitude); 
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    }
  }, []); 
  const formatDate = (dateString) => {
    const date = new Date(dateString); 
    const day = date.getDate(); 
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });

  const suffix = (day) => {
    if (day == 1 || day == 21 || day == 31) {
      return "ˢᵗ"; 
    } else if (day == 2 || day == 22) {
      return "ⁿᵈ"; 
    } else if (day == 3 || day == 23) {
      return "ʳᵈ"; 
    } else {
      return "ᵗʰ"; 
    }
}
const supertext=suffix(day);
return `${month} ${day}${supertext}, ${year}`;
};

  return (
    <div className="container">
      <h1>Weather App</h1>
      
      <input 
        type="text" 
        placeholder="Enter city name" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        onKeyDown={(e) => e.key === "Enter" && fetchWeather(city)} 
      />
      <button onClick={()=>fetchWeather(city)}>Submit</button>

      {weather && (
        <div>
          <h2>{weather.location.name}</h2>
          <p>Temperature: {weather.current.temp_c} °C</p>
          <p>Weather: {weather.current.condition.text}</p>
          
          <h3>7-Day Forecast:</h3>
          <ul>
            {weather.forecast.forecastday.map((day, index) => (
              <li key={index}>
                <p>{formatDate(day.date)}</p>
                <p>Temperature: {day.day.avgtemp_c} °C</p>
                <p>Weather: {day.day.condition.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
