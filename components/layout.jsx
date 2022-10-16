import Head from 'next/head'
import Link from 'next/link'
import { NavLink } from '@mantine/core'
import AppBar from '../components/AppBar/AppBar'

const Layout = ({ title, appBar, children }) => {
    return (
        <>
            <Head>
                <title>{title ?? 'Weather Dashboard'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AppBar>
                {appBar ?? (
                    <Link href="/">
                        <NavLink component="a" label="Weather Dashboard" />
                    </Link>
                )}
            </AppBar>
            <main>{children}</main>
        </>
    )
}

export default Layout