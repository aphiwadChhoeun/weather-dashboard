import { Paper, Stack, Text } from "@mantine/core"
import styles from './LocationResult.module.css'

const LocationResult = (props) => {
    const { locations, locationHandler } = props

    return (
        <Stack
            spacing={'xs'}>
            {locations.map(location => (
                <Paper
                    key={location.lat + location.lon}
                    className={styles.resultItem}
                    withBorder={true}
                    p={'md'}
                    shadow={'sm'}
                    onClick={() => locationHandler({ lat: location.lat, lon: location.lon })}
                >
                    <Text>{location.name}{!!location.state ? (', ' + location?.state) : ''}, {location.country}</Text>
                </Paper>
            ))}
        </Stack>
    )
}

export default LocationResult