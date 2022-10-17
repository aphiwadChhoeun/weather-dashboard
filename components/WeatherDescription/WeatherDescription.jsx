import { Text } from "@mantine/core"

const capitalizedWords = (text) => {
    let words = text.split(' ')
    words = words.map(word => {
        let temp = word
        temp = temp[0].toUpperCase() + temp.substring(1)
        return temp
    })

    return words.join(' ')
}

const WeatherDescription = (props) => {
    const { text } = props

    return (
        <Text>{capitalizedWords(text)}</Text>
    )
}

export default WeatherDescription