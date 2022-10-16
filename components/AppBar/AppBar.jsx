import { Header, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';

import styles from './AppBar.module.css'

const AppBar = (props) => {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <Header height={56} mb={20}>
            <div className={styles.inner}>
                <Group spacing={5}>
                    {props.children}
                </Group>
            </div>
        </Header>
    )
}

export default AppBar