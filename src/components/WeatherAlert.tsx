'use client';

const getWeatherSeverity = (temp: number, windSpeed: number) => {
  if (temp > 35) return { level: 'severe', message: 'Extreme heat warning!' };
  if (temp < 0) return { level: 'severe', message: 'Freezing conditions!' };
  if (windSpeed > 20) return { level: 'warning', message: 'Strong winds!' };
  return null;
}; 