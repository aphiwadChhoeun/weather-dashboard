import BackLink from './../../components/BackLink/BackLink';
import { useQuery } from '@tanstack/react-query'
import locations from '../../data/locations.json'
import Layout from '../../components/layout'
import {
    Container,
    Card,
    Text,
    Stack,
    Group,
    Image,
    NavLink,
} from '@mantine/core'
import LocationSkeleton from '../../components/ReusableLoader/LocationSkeleton'

export async function getStaticPaths() {
    const paths = locations.map((location) => ({
        params: { id: location.id },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps(context) {
    let { id } = context.params
    return {
        props: { data: locations.find(item => item.id === id) },
    }
}

export const fetchLatLng = (city) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${'15f7316707a06d2fa846b57979e19855'}`)
        .then(res => res.json())
}

const capitalizedWords = (text) => {
    let words = text.split(' ')
    words = words.map(word => {
        let temp = word
        temp = temp[0].toUpperCase() + temp.substring(1)
        return temp
    })

    return words.join(' ')
}

const LocationPage = (props) => {
    let { data: location } = props
    let { isLoading, data: weatherData } = useQuery(['GeoLocation', location.id],
        () => fetchLatLng(location.name),
        {
            staleTime: 10 * 60 * 1000
        })

    const loadingSkeleton = (
        <LocationSkeleton />
    )

    const backLink = (
        <BackLink />
    )

    let locationTime
    if (!isLoading) {
        let d = new Date()
        let utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds())

        console.log(utcDate.getHours(), ':', utcDate.getMinutes())
        locationTime = new Date()
        locationTime.setTime(utcDate.getTime() + (weatherData.timezone * 1000))
    }

    return (
        <Layout appBar={backLink}>
            <Container>
                <Card withBorder p="lg">

                    {isLoading ? (
                        loadingSkeleton
                    ) : (
                        <>
                            <Text size={64}>{weatherData.main.temp}°F</Text>

                            <Stack>
                                <Group position='apart'>
                                    <Text
                                        size={36}
                                    >
                                        {location.name}
                                    </Text>
                                    <Text>
                                        {locationTime.toLocaleString()}
                                    </Text>
                                </Group>
                                <Group position='apart'>
                                    <div style={{ width: '5rem' }}>
                                        <Image
                                            alt={weatherData.weather[0].description}
                                            src={'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png'} />
                                    </div>
                                    <Text>{capitalizedWords(weatherData.weather[0].description)}</Text>
                                </Group>
                                <Group position='apart'>
                                    <Stack>
                                        <Text
                                            size={24}
                                            color='dimmed'>Humidty</Text>
                                        <Text
                                            size={24}
                                            color='light'>
                                            {weatherData.main.humidity}
                                        </Text>
                                    </Stack>
                                    <Stack>
                                        <Text
                                            size={24}
                                            color='dimmed'>Wind</Text>
                                        <Text
                                            size={24}
                                            color='light'>
                                            {weatherData.wind.speed}
                                        </Text>
                                    </Stack>
                                </Group>
                            </Stack>
                        </>)}
                </Card>
            </Container>
        </Layout>
    )
}

export default LocationPage