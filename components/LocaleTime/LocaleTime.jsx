import { Text } from "@mantine/core"

const getLocaleTime = (offset, base = null) => {
    let baseDate
    if (!base) {
        let d = new Date()
        baseDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds())
    } else {
        baseDate = base
    }

    let localeTime = getDate(baseDate.getTime() + (offset * 1000) + (base ? (baseDate.getTimezoneOffset() * 60000) : 0))
    return localeTime
}

const getDate = (dt) => {
    let d = new Date(dt)

    return d
}

const LocaleTime = (props) => {
    const { offset, timestamp } = props
    const dateInstance = new Date()
    if (timestamp) {
        dateInstance.setTime(timestamp)
    }

    return (
        <Text>
            {getLocaleTime(offset ?? 0, dateInstance).toLocaleTimeString()}
        </Text>
    )
}

export default LocaleTime