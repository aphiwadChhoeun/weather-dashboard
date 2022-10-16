import { IconHome } from '@tabler/icons'
import Link from 'next/link'
import { Card, Text, Button } from '@mantine/core'
import styles from './DashboardItem.module.css'


const DashboardItem = (props) => {
    let { location } = props

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder className={styles.container}>
            <Text>{location.name}</Text>
            <Link href={'/location/' + location.id}>
                <Button fullWidth leftIcon={(<IconHome />)} mt={'md'} variant={'light'}>Open</Button>
            </Link>
        </Card>
    )
}

export default DashboardItem