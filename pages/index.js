import Head from "next/head";
import axios from "axios";
import Weather from "../components/Weather";
import Footer from "../components/Footer";
import { useState } from "react";
import { BsFillCloudsFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import Spinner from "../components/Spinner";
import { useForm } from "react-hook-form";
import { useWeather } from "../contexts/WeatherContext";

export default function home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { weather, setWeather } = useWeather();
  const { temperatureUnit, toggleTemperatureUnit } = useWeather();

  const url = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeather = async (data) => {
    setError('')
    setLoading(true);

    try {
      const response = await axios.get(url, {
        params: {
          q: data.city,
          units: temperatureUnit,
          appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
        },
      });

      if (!response.data || response.data.cod !== 200) {
        throw new Error("Invalid location or no data available");
      }

      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setError('Invalid city name or no data available');
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="flex flex-col items-center justify-center">
        <Head>
          <title>Weather App - NextJS</title>
          <meta name="weather app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <div className="flex justify-center m-2 mt-4 text-white">
            <BsFillCloudsFill
              className="text-white lg:scale-150 lg:my-4"
              size={120}
            />
          </div>
          <div className="block text-3xl text-white font-bold w-full px-6 py-3 m-2 lg:text-6xl text-center lg:mb-8">
            Get your weather info<br></br>in your browser
          </div>
          <div className="flex flex-col justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-[#59546C]">
            <form
              onSubmit={handleSubmit(fetchWeather)}
              className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-[#59546C] text-[#59546C] rounded-2xl"
            >
              <input
                {...register("city", { required: true })}
                className="bg-transparent border-none text-white focus:outline-none text-2xl placeholder:text-gray-[#d3d3d3] w-full"
                type="text"
                placeholder="Enter your city name (or zipcode)"
              />
              <button type="submit">
                <AiOutlineSearch className="inline-block text-2xl align-middle" />
              </button>
            </form>
            {errors.city && (
              <p className="text-red-500">City name is required</p>
            )}
            {error && (
              <p className="text-red-500">{error}</p>
            )}
          </div>

          {weather.main && <Weather data={weather} />}
        </div>
        <div className="flex mt-8 mb-4 text-lg text-[#8B939C]">
          <Footer />
        </div>
      </div>
    );
  }
}
