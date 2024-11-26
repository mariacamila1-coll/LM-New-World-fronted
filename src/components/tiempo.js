import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../styles/weather.css';  

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [cityIndex, setCityIndex] = useState(0);  // Para controlar la ciudad actual

  const cities = useMemo(() => ['Medellín', 'Bogotá', 'Cartagena', 'Santa Marta', 'Cali'], []);  // Lista de ciudades

  const API_KEY = '26647e24f35d1931d0022e9786fffdb6';  

  // Función para actualizar la hora y la fecha
  const updateTime = () => {
    const now = new Date();
    const formattedTime = now.toLocaleString('es-CO', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setCurrentTime(formattedTime);
  };

  // Función para obtener los datos del clima
  useEffect(() => {
    const city = cities[cityIndex];  // Obtener la ciudad actual desde el índice
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    axios
      .get(url)
      .then(response => {
        setWeatherData(response.data);
        setError(null);
      })
      .catch(err => {
        setError('Error al obtener los datos del clima');
        console.error(err);
      });

    // Cambiar la ciudad cada 10 segundos
    const interval = setInterval(() => {
      setCityIndex((prevIndex) => (prevIndex + 1) % cities.length); // Ciclo entre las ciudades
    }, 10000);  // 10 segundos

    // Actualizar la hora cada segundo
    const timeInterval = setInterval(updateTime, 1000);

    // Limpiar los intervalos cuando el componente se desmonte
    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, [cityIndex, cities]);  

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!weatherData) {
    return <div>Cargando el clima...</div>;
  }

  return (
    <div className="weather-container">
      <h2>{cities[cityIndex]}</h2> 
      <div className="weather-icon">
        <img 
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
          alt={weatherData.weather[0].description} 
        />
      </div>
      <p className="temperature">{weatherData.main.temp}°C</p>
      <p className="condition">{weatherData.weather[0].description}</p>
      <p className="humidity">Humedad: {weatherData.main.humidity}%</p>
      <p className="wind">Viento: {weatherData.wind.speed} m/s</p>
      <p className="date-time">{currentTime}</p> 
    </div>
  );
};

export default Weather;
