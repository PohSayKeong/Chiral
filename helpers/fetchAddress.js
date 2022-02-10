const axios = require("axios");

const fetchAddress = async (lng, lat, key) => {
    const routeResponse = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${
            key || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }`
    );
    if (routeResponse.status === 200) {
        return routeResponse.data.features[0].place_name;
    }
};

module.exports = {
    fetchAddress,
};
