import { NextResponse } from 'next/server';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function GET(request: Request) {
  console.log('API Key:', API_KEY);

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'OpenWeather API key is not configured' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }

  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  console.log('Request URL:', url);

  try {
    const response = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();

    console.log('Weather API Response:', data);

    if (data.cod !== 200) {
      return NextResponse.json(
        { error: data.message || 'Failed to fetch weather data' },
        { status: data.cod }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 