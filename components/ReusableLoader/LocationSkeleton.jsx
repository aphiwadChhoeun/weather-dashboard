import { Skeleton, Stack, Group, Card } from "@mantine/core"

const LocationSkeleton = () => {
    return (
        <>
            <Card.Section mt={-20} mb={20}>
                <Skeleton height={320} />
            </Card.Section>

            <Skeleton height={64} />

            <Stack mt={15}>
                <Group>
                    <Skeleton height={36} />
                </Group>
                <Group position='apart'>
                    <Skeleton height={100} circle />
                    <Skeleton height={50} width={'50%'} />
                </Group>
                <Group position='apart'>
                    <div style={{ width: '25%' }}>
                        <Stack>
                            <Skeleton height={25} />
                            <Skeleton height={25} />
                        </Stack>
                    </div>
                    <div style={{ width: '25%' }}>
                        <Stack>
                            <Skeleton height={25} />
                            <Skeleton height={25} />
                        </Stack>
                    </div>
                </Group>
            </Stack>
        </>
    )
}

export default LocationSkeleton