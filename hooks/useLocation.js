import { useQuery } from "@tanstack/react-query";

export const fetchLatLng = async (city) => {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API}`);
    return await res.json();
}

export function useLocation(location, options = {}) {
    let result = useQuery(
        ['GeoLocation', location],
        () => fetchLatLng(location),
        {
            ...options,
            staleTime: 10 * 60 * 1000
        })

    return result
}