import { useQuery } from '@tanstack/react-query'
import { Container, Grid } from '@mantine/core'
import DashboardItem from '../DashboardItem/DashboardItem.jsx'
import ReusableLoader from '../ReusableLoader/ReusableLoader.jsx'

export const fetchLocations = () => {
    return fetch('/api/dashboard')
        .then(res => res.json())
}

const Dashboard = (props) => {
    const { isLoading, data } = useQuery(['dashboard'], fetchLocations)

    if (isLoading) {
        return (
            <ReusableLoader />
        )
    }

    const { data: locations } = data

    return (
        <Container>
            <Grid>
                {locations.map((item, index) => {
                    return (
                        <Grid.Col sm={6} md={4} lg={2} key={index}>
                            <DashboardItem location={item} />
                        </Grid.Col>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default Dashboard