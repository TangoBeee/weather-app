import React, { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [temperatureUnit, setTemperatureUnit] = useState('metric'); // Default to Celsius

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <WeatherContext.Provider value={{ weather, setWeather, temperatureUnit, toggleTemperatureUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
