import { useQuery } from "@tanstack/react-query";

export const fetchLatLng = async (city) => {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API}`);
    return await res.json();
}

export function useLocation(location) {
    let { isLoading, isError, data } = useQuery(
        ['GeoLocation', location],
        () => fetchLatLng(location),
        {
            staleTime: 10 * 60 * 1000
        })

    return { isLoading, isError, data }
}