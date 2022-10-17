import { Image } from "@mantine/core"

const WeatherImage = (props) => {
    const { weatherData } = props

    return (
        <Image
            alt={weatherData.description}
            src={'http://openweathermap.org/img/wn/' + weatherData.icon + '@2x.png'} />
    )
}

export default WeatherImage