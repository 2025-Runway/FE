import { Weather } from "@/interfaces/weather.types"
import SunIcon from '@/public/svg/weather/weather-big-sun.svg';
import CloudIcon from '@/public/svg/weather/weather-big-cloud.svg';
import RainIcon from '@/public/svg/weather/weather-big-rain.svg';
import HazyIcon from '@/public/svg/weather/weather-big-hazy.svg';
import SnowIcon from '@/public/svg/weather/weather-big-snow.svg';
import { spawn } from "child_process";


export function WeatherIcon({
    weather
}: {
    weather: Weather
}) {
    switch (weather) {
        case '맑음':
            return <SunIcon />
        case '구름많음':
            return <CloudIcon />
        case '흐림':
            return <HazyIcon />
        case '흐림+비':
            return <RainIcon />
        case '흐림+눈':
            return <SnowIcon />
        default:
            return null
    };
}