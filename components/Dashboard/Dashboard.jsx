import { useQuery } from '@tanstack/react-query'
import { Container, SimpleGrid, Loader } from '@mantine/core'
import DashboardItem from '../DashboardItem/DashboardItem.jsx'

export const fetchLocations = () => {
    return fetch('/api/dashboard')
        .then(res => res.json())
}

const Dashboard = (props) => {
    const { isLoading, data } = useQuery(['dashboard'], fetchLocations)

    if (isLoading) {
        return (
            <Loader />
        )
    }

    const { data: locations } = data

    return (
        <Container>
            <SimpleGrid cols={3}>
                {locations.map((item, index) => {
                    return (
                        <DashboardItem key={index} location={item} />
                    )
                })}
            </SimpleGrid>
        </Container>
    )
}

export default Dashboard