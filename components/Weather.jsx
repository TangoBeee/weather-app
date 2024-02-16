import React from 'react';
import Image from 'next/image';
import { useWeather } from '../contexts/WeatherContext';

const Weather = ({ data }) => {
  const { temperatureUnit, toggleTemperatureUnit } = useWeather();

  const convertToCelsius = (temperature) => {
    return ((temperature - 32) * 5/9).toFixed(0);
  };

  const convertToFahrenheit = (temperature) => {
    return ((temperature * 9/5) + 32).toFixed(0);
  };

  const renderTemperature = (temperature) => {
    return temperatureUnit === 'matrix' ? `${convertToCelsius(temperature)}°C` : `${convertToFahrenheit(temperature)}°F`;
  };


  return (
    <div className="flex flex-col max-w-[450px] w-full h-max m-auto p-4 text-gray-300">
      <div className="flex pt-12 flex-wrap justify-center items-center gap-x-10">
        <div className="flex flex-col items-center">
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="weather"
            width="75"
            height="75"
          />
          <p className="text-3xl">{data.weather[0].main}</p>
        </div>
        <div className="pt-[5%]">
          <p className="text-7xl lg:text-8xl">
          {temperatureUnit == "metric" ? data.main.feels_like.toFixed(0) + "°C" : ((data.main.feels_like * 9/5) + 32).toFixed(0) + "°F"}
          </p>
        </div>
      </div>

      <div className="p-8 rounded-md bg-[#59546C]/20 mt-16">
        <p className="pb-6 text-xl font-bold text-center lg:text-2xl">
          Weather in {data.name}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5 text-center">
          <div>
            <p className="text-xl font-bold">
            {temperatureUnit == "metric" ? data.main.feels_like.toFixed(0) + "°C" : ((data.main.feels_like * 9/5) + 32).toFixed(0) + "°F"}
            </p>
            <p className="text-lg">Feels like</p>
          </div>
          <div>
            <p className="text-xl font-bold">{data.main.humidity} %</p>
            <p className="text-lg">Humidity</p>
          </div>
          <div>
            <p className="text-xl font-bold">
              {data.wind.speed.toFixed(0)} mph
            </p>
            <p className="text-lg">Winds</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button onClick={toggleTemperatureUnit} className="text-white font-bold bg-gray-600 p-2 rounded-lg">
          {temperatureUnit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
        </button>
      </div>
    </div>
  );
};

export default Weather;
