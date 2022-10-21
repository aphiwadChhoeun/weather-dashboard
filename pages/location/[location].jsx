import BackLink from '../../components/BackLink/BackLink';
import Layout from '../../components/layout'
import {
    Container,
    Card,
    Text,
    Stack,
    Group,
} from '@mantine/core'
import LocationSkeleton from '../../components/ReusableLoader/LocationSkeleton'
import { useLocation } from '../../hooks/useLocation';
import { useWeather } from '../../hooks/useWeather';
import {
    IconSunrise,
    IconSunset,
    IconTemperatureMinus,
    IconTemperaturePlus
} from '@tabler/icons';
import StaticMap from '../../components/StaticMap/StaticMap';
import TemperatureDisplay from '../../components/TemperatureDisplay/TemperatureDisplay';
import WeatherImage from '../../components/WeatherImage/WeatherImage';
import LocaleTime from '../../components/LocaleTime/LocaleTime';
import WeatherDescription from '../../components/WeatherDescription/WeatherDescription';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const LocationPage = (props) => {
    const { query: { location: locationParams } } = useRouter()
    const latlon = useMemo(() => {
        if (!locationParams) return null

        let temp = locationParams.split(',')
        return {
            lat: temp[0],
            lon: temp[1]
        }
    }, [locationParams])

    let { isLoading, data: weatherData } = useWeather(latlon, {
        enabled: !!latlon
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
                            <Group position='apart'>
                                <TemperatureDisplay size={64} weight={'bold'}>
                                    {weatherData.main.temp}
                                </TemperatureDisplay>
                                <Stack>
                                    <Group>
                                        <TemperatureDisplay>
                                            {weatherData.main.temp_max}
                                        </TemperatureDisplay>
                                        <IconTemperaturePlus />
                                    </Group>
                                    <Group>
                                        <TemperatureDisplay>
                                            {weatherData.main.temp_min}
                                        </TemperatureDisplay>
                                        <IconTemperatureMinus />
                                    </Group>
                                </Stack>
                            </Group>

                            <Stack>
                                <Group position='apart'>
                                    <Text
                                        size={36}
                                    >
                                        {weatherData.name}
                                    </Text>
                                    <LocaleTime offset={weatherData.timezone} />
                                </Group>
                                <Group>
                                    <IconSunrise />
                                    <LocaleTime offset={weatherData.timezone} timestamp={weatherData.sys.sunrise * 1000} />

                                    <IconSunset />
                                    <LocaleTime offset={weatherData.timezone} timestamp={weatherData.sys.sunset * 1000} />
                                </Group>
                                <Group position='apart'>
                                    <div style={{ width: '5rem' }}>
                                        <WeatherImage weatherData={weatherData.weather[0]} />
                                    </div>
                                    <WeatherDescription text={weatherData.weather[0].description} />
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

                            <Card.Section mt={'md'} mb={'-lg'}>
                                <StaticMap weatherData={weatherData} size={[928, 280]} />
                            </Card.Section>
                        </>)}
                </Card>
            </Container>
        </Layout>
    )
}

export default LocationPage