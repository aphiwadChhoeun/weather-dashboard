import { IconHome } from '@tabler/icons'
import Link from 'next/link'
import { Card, Text, ActionIcon } from '@mantine/core'
import styles from './DashboardItem.module.css'


const DashboardItem = (props) => {
    let { location } = props

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder className={styles.container}>
            <Text>{location.name}</Text>
            <Link href={'/location/' + location.id}>
                <ActionIcon variant={'outline'} color={'blue'} style={{ width: '100%' }} mt={15} size={'lg'}>
                    <IconHome />
                </ActionIcon>
            </Link>
        </Card>
    )
}

export default DashboardItem