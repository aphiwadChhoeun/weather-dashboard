import Layout from '../layout'
import { Container, Center, Loader } from '@mantine/core'

const ReusableLoader = () => {
    return (
        <Layout>
            <Container>
                <Center>
                    <Loader />
                </Center>
            </Container>
        </Layout>
    )
}

export default ReusableLoader