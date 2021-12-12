const fetchLatLng = async (location) => {
    const locationResponse = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            location
        )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    return await locationResponse.json();
};

export default fetchLatLng;
