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
    let { data } = props
    let { isLoading, data: geoLocation } = useQuery(['GeoLocation', data.id],
        () => fetchLatLng(data.name),
        {
            staleTime: 10 * 60 * 1000
        })

    const loadingSkeleton = (
        <LocationSkeleton />
    )

    const backLink = (
        <BackLink />
    )

    return (
        <Layout appBar={backLink}>
            <Container>
                <Card withBorder p="lg">

                    {isLoading ? (
                        loadingSkeleton
                    ) : (
                        <>
                            <Text size={64}>{data.name}</Text>

                            <Stack>
                                <Group>
                                    <Text
                                        size={36}
                                    >
                                        {geoLocation.main.temp}°F
                                    </Text>
                                </Group>
                                <Group position='apart'>
                                    <div style={{ width: '5rem' }}>
                                        <Image
                                            alt={geoLocation.weather[0].description}
                                            src={'http://openweathermap.org/img/wn/' + geoLocation.weather[0].icon + '@2x.png'} />
                                    </div>
                                    <Text>{capitalizedWords(geoLocation.weather[0].description)}</Text>
                                </Group>
                                <Group position='apart'>
                                    <Stack>
                                        <Text
                                            size={24}
                                            color='dimmed'>Humidty</Text>
                                        <Text
                                            size={24}
                                            color='light'>
                                            {geoLocation.main.humidity}
                                        </Text>
                                    </Stack>
                                    <Stack>
                                        <Text
                                            size={24}
                                            color='dimmed'>Wind</Text>
                                        <Text
                                            size={24}
                                            color='light'>
                                            {geoLocation.wind.speed}
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