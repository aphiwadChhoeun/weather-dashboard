import BackLink from './../../components/BackLink/BackLink';
import locations from '../../data/locations.json'
import Layout from '../../components/layout'
import {
    Container,
    Card,
    Text,
    Stack,
    Group,
    Image,
} from '@mantine/core'
import LocationSkeleton from '../../components/ReusableLoader/LocationSkeleton'
import { useLocation } from '../../hooks/GeoLocation/useLocation';
import { useWeather } from '../../hooks/GeoLocation/useWeather';
import {
    IconSunrise,
    IconSunset,
    IconTemperatureFahrenheit,
    IconTemperatureMinus,
    IconTemperaturePlus
} from '@tabler/icons';

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

const capitalizedWords = (text) => {
    let words = text.split(' ')
    words = words.map(word => {
        let temp = word
        temp = temp[0].toUpperCase() + temp.substring(1)
        return temp
    })

    return words.join(' ')
}

const getLocaleTime = (offset, base = null) => {
    let baseDate
    if (!base) {
        let d = new Date()
        baseDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds())
    } else {
        baseDate = base
    }

    let localeTime = getDate(baseDate.getTime() + (offset * 1000) + (base ? (baseDate.getTimezoneOffset() * 60000) : 0))
    return localeTime
}

const getDate = (dt) => {
    let d = new Date(dt)

    return d
}

const LocationPage = (props) => {
    let { data: location } = props
    let { data: latLng } = useLocation(location.name)

    let { isLoading, data: weatherData } = useWeather(latLng?.[0], {
        enabled: !!latLng
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
                <Card withBorder shadow="sm" p="lg">

                    {isLoading ? (
                        loadingSkeleton
                    ) : (
                        <>

                            <Card.Section mt={'-lg'}>
                                <Image
                                    src={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${[weatherData.coord.lon, weatherData.coord.lat].join(',')},12/928x320?access_token=pk.eyJ1IjoidmljMjIxYiIsImEiOiJjaXVhOHRxZWYwMDF6MnlsNzluZTNwMjc5In0.lShEWLac8O5NTy8QQAwTxQ`}
                                    height={320}
                                    alt={'Map of ' + weatherData.name} />
                            </Card.Section>

                            <Group position='apart'>
                                <Text size={64} weight={'bold'}>{weatherData.main.temp}<IconTemperatureFahrenheit size={64} /></Text>
                                <Stack>
                                    <Group>
                                        <Text>{weatherData.main.temp_max}<IconTemperatureFahrenheit size={18} /></Text>
                                        <IconTemperaturePlus />
                                    </Group>
                                    <Group>
                                        <Text>{weatherData.main.temp_min}<IconTemperatureFahrenheit size={18} /></Text>
                                        <IconTemperatureMinus />
                                    </Group>
                                </Stack>
                            </Group>

                            <Stack>
                                <Group position='apart'>
                                    <Text
                                        size={36}
                                    >
                                        {location.name}
                                    </Text>
                                    <Text>
                                        {getLocaleTime(weatherData.timezone).toLocaleString()}
                                    </Text>
                                </Group>
                                <Group>
                                    <IconSunrise />
                                    <Text>{getLocaleTime(weatherData.timezone, new Date(weatherData.sys.sunrise * 1000)).toLocaleTimeString()}</Text>
                                    <IconSunset />
                                    <Text>{getLocaleTime(weatherData.timezone, new Date(weatherData.sys.sunset * 1000)).toLocaleTimeString()}</Text>
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
                                            {weatherData.main.humidity} %
                                        </Text>
                                    </Stack>
                                    <Stack>
                                        <Text
                                            size={24}
                                            color='dimmed'>Wind</Text>
                                        <Text
                                            size={24}
                                            color='light'>
                                            {weatherData.wind.speed} mph
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