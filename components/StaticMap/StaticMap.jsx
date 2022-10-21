import { Image } from "@mantine/core"

const StaticMap = (props) => {
    const { name, coord: { lat, lon } } = props.weatherData
    const [width, height] = props.size

    return (
        <Image
            src={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${[lon, lat].join(',')},12/${width}x${height}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API}`}
            height={320}
            alt={'Map of ' + name} />
    )
}

export default StaticMap