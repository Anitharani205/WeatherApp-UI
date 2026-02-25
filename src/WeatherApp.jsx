import React, { useEffect, useState } from "react";
import weatherData from "./WeatherData.json"; 
import "./WeatherApp.css";

function WeatherApp() {
  const[weatherList,setWeatherList] = useState([]);
  const[filtered,setFiltered] = useState([]);
  const[searchYear,setSearchYear] = useState("");
  const[minTemp,setMinTemp] = useState("");
  const[maxTemp,setMaxTemp] = useState("");
 
  function getWeatherCondition(temp) {
    if (temp >=35) return"Hot";
    if (temp >=25) return"Sunny";
    if (temp >=15) return"Cloudy";
    if (temp >=5) return"Rainy";
    return "Cold";
  }

  useEffect(() => {
    const formatted = weatherData.map((item) => ({
      ...item,
      condition: getWeatherCondition(item.temperature),
    }));
    setWeatherList(formatted);
    setFiltered(formatted);
  },[]);

  const handleSearch = () => {
    const result = weatherList.filter((item) => {
      return (
        (searchYear=== "" || item.year.toString().includes(searchYear)) &&
        (minTemp=== "" || item.temperature >=Number(minTemp)) &&
        (maxTemp=== "" || item.temperature <=Number(maxTemp)) 
      );
    });
    setFiltered(result);
  };

  function deleteYear(id) {
    const updated=weatherList.filter((item) => item.id !== id);
    setWeatherList(updated);
    setFiltered(updated);
  }
  function sortBy(key) {
    const sorted =[...filtered].sort((a, b) => a[key] - b[key]);
    setFiltered(sorted);
  }
  return (
    <div className="container">
      <h1 className="title">Weather Dashboard for Delhi (20 years)</h1>
      <div className="controls">
        <input
          className="search"
          placeholder="Search by Year"
          value={searchYear}
          onChange={(e) =>setSearchYear(e.target.value)}
        />
        <input
          className="search"
          type="number"
          placeholder="Min Temp"
          value={minTemp}
          onChange={(e) =>setMinTemp(e.target.value)}
        />
        <input
          className="search"
          type="number"
          placeholder="Max Temp"
          value={maxTemp}
          onChange={(e) =>setMaxTemp(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={()=>sortBy("year")}>Sort Year</button>
        <button onClick={()=>sortBy("temperature")}>Sort Temp</button>
        <button onClick={()=>sortBy("humidity")}>Sort Humidity</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Temp (°C)</th>
            <th>Humidity</th>
            <th>Pressure</th>
            <th>Condition</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td>{item.year}</td>
              <td>{item.temperature}</td>
              <td>{item.humidity}</td>
              <td>{item.pressure}</td>
              <td>{item.condition}</td>
              <td>
                <button className="delete" onClick={() => deleteYear(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherApp;