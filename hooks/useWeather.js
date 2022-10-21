import { useQuery } from "@tanstack/react-query"

export const fetchWeather = async (latLng) => {
    if (!latLng) return null
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latLng.lat}&lon=${latLng.lon}&units=imperial&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API}`)
    return await res.json()
}

export function useWeather(latLng, options = {}) {
    let result = useQuery(
        ['Weather', latLng?.lat, latLng?.lon],
        () => fetchWeather(latLng),
        {
            ...options,
            staleTime: 10 * 60 * 1000
        })

    return result
}