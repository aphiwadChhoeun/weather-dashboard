import locations from '../../data/locations.json'

const handler = (req, res) => {
    res.status(200).json({
        data: locations
    })
}

export default handler