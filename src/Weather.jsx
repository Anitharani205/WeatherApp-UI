import React, { useEffect, useState } from "react";
import "./WeatherApp.css";

function WeatherApp() {
  const[weatherList,setWeatherList] = useState([]);
  const[filtered,setFiltered] = useState([]);
  const[searchYear,setSearchYear] = useState("");
  const[minTemp,setMinTemp] = useState("");
  const[maxTemp,setMaxTemp] = useState("");
  
  const API_KEY = "ef048b4fb65504073ffe3589767fd26b"; 
  const CITY = "Delhi";
  function getWeatherCondition(temp) {
    if (temp >= 35) return"Hot";
    if (temp >= 25) return"Sunny";
    if (temp >= 15) return"Cloudy";
    if (temp >= 5) return"Rainy";
    return "Cold";
  }

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = [
          {
            id: 1,
            year: new Date().getFullYear(),
            temperature:data.main.temp,
            humidity:data.main.humidity,
            pressure:data.main.pressure,
            heatIndex:data.main.feels_like,
            condition:getWeatherCondition(data.main.temp),
          },
        ];
        setWeatherList(formatted);
        setFiltered(formatted);
      })
      .catch((err) => console.log("Error fetching weather:", err));
  }, []);

  
  const handleSearch = () => {
    const result = weatherList.filter((item) => {
      return (
        (searchYear === "" || item.year.toString() === searchYear) &&
        (minTemp === "" || item.temperature >= Number(minTemp)) &&
        (maxTemp === "" || item.temperature <= Number(maxTemp)) &&
        (minHumidity === "" || item.humidity >= Number(minHumidity))
      );
    });
    setFiltered(result);
  };
  const sortBy = (key) => {
    const sorted = [...filtered].sort((a, b) => a[key] - b[key]);
    setFiltered(sorted);
  };

  return (
    <div className="container">
      <h1 className="title">Delhi Live Weather Dashboard</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Year"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Temp"
          value={minTemp}
          onChange={(e) => setMinTemp(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Temp"
          value={maxTemp}
          onChange={(e) => setMaxTemp(e.target.value)}
        />
    
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => sortBy("year")}>Sort Year</button>
        <button onClick={() => sortBy("temperature")}>Sort Temp</button>
        <button onClick={() => sortBy("humidity")}>Sort Humidity</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Temperature (°C)</th>
            <th>Humidity (%)</th>
            <th>Pressure</th>
            <th>Heat Index</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td>{item.year}</td>
              <td style={{ color: item.temperature > 35 ? "red" : "black" }}>
                {item.temperature}
              </td>
              <td>{item.humidity}</td>
              <td>{item.pressure}</td>
              <td>{item.heatIndex}</td>
              <td>{item.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherApp;