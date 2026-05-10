import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, Wind, Droplets, ThermometerSun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import axios from 'axios';

// Mock data fallback if no API key is provided
const mockWeather = {
  temp: 24,
  condition: 'Partly Cloudy',
  humidity: 60,
  wind: 12,
  forecast: [
    { day: 'Mon', temp: 25, icon: <Sun size={16} /> },
    { day: 'Tue', temp: 22, icon: <CloudRain size={16} /> },
    { day: 'Wed', temp: 23, icon: <Cloud size={16} /> },
    { day: 'Thu', temp: 26, icon: <Sun size={16} /> },
  ],
  alert: 'Light rain expected Tuesday morning.',
};

export default function WeatherWidget({ city = 'Tokyo' }) {
  const { dark } = useTheme();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch from OpenWeatherMap here:
    // const fetchWeather = async () => {
    //   try {
    //     const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
    //     // Process data
    //   } catch (error) {
    //     console.error('Weather fetch error', error);
    //   }
    // };
    
    // Using mock data for demo since no API key is configured
    setTimeout(() => {
      setWeather({ ...mockWeather, city });
      setLoading(false);
    }, 1000);
  }, [city]);

  if (loading) {
    return (
      <Card className="animate-pulse h-48 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-primary">
          <Cloud size={24} className="animate-bounce" />
          <span className="text-sm font-medium">Loading weather...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500" />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="font-outfit font-bold text-lg">{weather.city}</h3>
          <p className={`text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{weather.condition}</p>
        </div>
        <div className="text-right">
          <div className="flex items-start justify-end gap-1">
            <span className="font-outfit font-bold text-4xl leading-none">{weather.temp}</span>
            <span className="text-lg font-medium text-amber-500">°C</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
        <div className={`flex items-center gap-2 text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
          <Droplets size={16} className="text-blue-500" />
          <span>Humidity: {weather.humidity}%</span>
        </div>
        <div className={`flex items-center gap-2 text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
          <Wind size={16} className="text-cyan-500" />
          <span>Wind: {weather.wind} km/h</span>
        </div>
      </div>

      {weather.alert && (
        <div className="mb-6">
          <Badge color="amber" className="w-full flex items-center justify-center py-1.5" dot>
            {weather.alert}
          </Badge>
        </div>
      )}

      <div className={`pt-4 border-t flex justify-between ${dark ? 'border-dark-border' : 'border-light-border'} relative z-10`}>
        {weather.forecast.map((day, i) => (
          <div key={day.day} className="flex flex-col items-center gap-1.5">
            <span className={`text-xs ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{day.day}</span>
            <div className={`p-2 rounded-xl ${dark ? 'bg-dark-surface' : 'bg-light-surface'}`}>
              {day.icon}
            </div>
            <span className="text-xs font-semibold">{day.temp}°</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
