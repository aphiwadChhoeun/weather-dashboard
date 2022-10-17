import { Image } from "@mantine/core"

const StaticMap = (props) => {
    const { name, coord: { lat, lon } } = props.weatherData
    const [width, height] = props.size

    return (
        <Image
            src={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${[lon, lat].join(',')},12/${width}x${height}?access_token=pk.eyJ1IjoidmljMjIxYiIsImEiOiJjaXVhOHRxZWYwMDF6MnlsNzluZTNwMjc5In0.lShEWLac8O5NTy8QQAwTxQ`}
            height={320}
            alt={'Map of ' + name} />
    )
}

export default StaticMap