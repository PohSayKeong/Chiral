const fetchAddress = (lng, lat) =>
    fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    )
        .then((resp) => resp.json())
        .then((data) => data.features[0].place_name);

export default fetchAddress;
