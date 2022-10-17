import locations from '../../data/locations.json'

const handler = (req, res) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    res.status(200).json({
        data: locations
    })
}

export default handler