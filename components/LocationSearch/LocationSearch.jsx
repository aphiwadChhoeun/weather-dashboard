import { ActionIcon, Container, Stack, TextInput } from "@mantine/core"
import { useForm } from '@mantine/form';
import { IconHome2, IconSearch } from "@tabler/icons"
import { useRouter } from "next/router";
import { useState } from "react";
import { useLocation } from "../../hooks/useLocation";
import ReusableLoader from "../ReusableLoader/ReusableLoader";
import LocationResult from "./LocationResult";

const LocationSearch = (props) => {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const form = useForm({
        initialValues: {
            locationQuery: ''
        }
    })
    const { isLoading, data } = useLocation(query, {
        enabled: !!query
    })

    const formHandler = (values) => {
        const { locationQuery } = values
        setQuery(locationQuery)
    }

    const searchResultHandler = (latlon) => {
        router.push('/location/' + [latlon.lat, latlon.lon].join(','))
    }

    return (
        <Container>
            <Stack>
                <form onSubmit={form.onSubmit(values => formHandler(values))}>
                    <TextInput
                        label="Search location"
                        size={'lg'}
                        icon={<IconHome2 />}
                        rightSection={(
                            <ActionIcon
                                onClick={form.onSubmit(values => formHandler(values))}>
                                <IconSearch />
                            </ActionIcon>
                        )}
                        {...form.getInputProps('locationQuery')}
                    />
                </form>

                {!!query ? (
                    <div>
                        {isLoading ?
                            (<ReusableLoader />) :
                            <LocationResult
                                locations={data}
                                locationHandler={searchResultHandler}
                            />
                        }
                    </div>
                ) : null}
            </Stack>
        </Container>
    )
}

export default LocationSearch