'use client';

const getWeatherColors = (description: string, temp: number, time: number) => {
  const isNight = time < 6 || time > 18;
  
  const themes = {
    clear: {
      day: 'from-yellow-400 to-blue-400',
      night: 'from-blue-900 to-purple-900'
    },
    rain: {
      day: 'from-gray-400 to-blue-600',
      night: 'from-gray-900 to-blue-900'
    },
    snow: {
      day: 'from-blue-100 to-blue-300',
      night: 'from-blue-800 to-purple-900'
    },
    thunderstorm: {
      day: 'from-gray-700 to-purple-900',
      night: 'from-gray-900 to-purple-950'
    }
  };

  // ... theme logic
  return isNight ? themes.clear.night : themes.clear.day;
}; 