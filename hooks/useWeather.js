import { useQuery } from "@tanstack/react-query"

export const fetchWeather = async (latLng) => {
    if (!latLng) return null
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latLng.lat}&lon=${latLng.lon}&units=imperial&appid=${'15f7316707a06d2fa846b57979e19855'}`)
    return await res.json()
}

export function useWeather(latLng, options = {}) {
    let { isLoading, isError, data } = useQuery(
        ['Weather', latLng?.lat, latLng?.lon],
        () => fetchWeather(latLng),
        {
            ...options,
            staleTime: 10 * 60 * 1000
        })

    return { isLoading, isError, data }
}