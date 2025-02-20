'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather data');
      }

      setWeather(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherEmoji = (description: string) => {
    const weatherMap: { [key: string]: string } = {
      'clear sky': '☀️',
      'few clouds': '🌤️',
      'scattered clouds': '☁️',
      'broken clouds': '☁️',
      'shower rain': '🌧️',
      'rain': '🌧️',
      'thunderstorm': '⛈️',
      'snow': '🌨️',
      'mist': '🌫️'
    };
    return weatherMap[description.toLowerCase()] || '🌡️';
  };

  const getWeatherSound = (description: string) => {
    const soundMap: { [key: string]: string } = {
      'rain': '/sounds/rain.mp3',
      'thunderstorm': '/sounds/thunder.mp3',
      'clear sky': '/sounds/birds.mp3',
      'snow': '/sounds/wind.mp3',
      'clouds': '/sounds/wind-light.mp3'
    };
    
    const weatherType = description.toLowerCase();
    return Object.keys(soundMap).find(key => weatherType.includes(key));
  };

  useEffect(() => {
    if (weather?.weather[0].description) {
      const soundType = getWeatherSound(weather.weather[0].description);
      if (soundType) {
        const newAudio = new Audio(`/sounds/${soundType}.mp3`);
        newAudio.loop = true;
        setAudio(newAudio);
        newAudio.play();
      }
    }
    
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [weather]);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Weather App {getWeatherEmoji('sunny')}
      </h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 px-4 py-2 border rounded bg-white text-black"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center p-4">
          Loading weather data...
        </div>
      )}

      {weather && (
        <div className="bg-white text-black p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            {weather.name} {getWeatherEmoji(weather.weather[0].description)}
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold animate-pulse">
                {Math.round(weather.main.temp)}°C
              </p>
              <p className="text-gray-600 capitalize">
                {weather.weather[0].description}
              </p>
            </div>
            <div className="transform transition-all duration-500 hover:rotate-180">
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg transition-all hover:bg-blue-100">
              <p className="text-gray-600">Humidity 💧</p>
              <p className="font-semibold">{weather.main.humidity}%</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg transition-all hover:bg-blue-100">
              <p className="text-gray-600">Wind Speed 🌪️</p>
              <p className="font-semibold">{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
