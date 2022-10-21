import { Container, Center, Loader } from '@mantine/core'

const ReusableLoader = () => {
    return (
        <div>
            <Center>
                <Loader variant="dots" />
            </Center>
        </div>
    )
}

export default ReusableLoader