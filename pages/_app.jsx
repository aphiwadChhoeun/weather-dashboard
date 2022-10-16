import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '../styles/global.css'

const queryClient = new QueryClient()

const customTheme = {
    colorScheme: 'dark',
}

export default function App(props) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Page title</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={customTheme}
            >
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </MantineProvider>
        </>
    );
}