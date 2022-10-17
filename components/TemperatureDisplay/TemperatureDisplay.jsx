import { Text } from "@mantine/core"
import { IconTemperatureCelsius, IconTemperatureFahrenheit } from "@tabler/icons"

const TemperatureDisplay = (props) => {
    const { type } = props

    const typeIcon = (!type || type === 'f') ? (
        <IconTemperatureFahrenheit size={props.size ?? 18} />
    ) : (
        <IconTemperatureCelsius size={props.size ?? 18} />
    )


    return (
        <Text {...props}>{props.children}{typeIcon}</Text>
    )
}

export default TemperatureDisplay