const Web3 = require("web3");
const RequestManager = require("./contracts/RequestManager.json");
const extraFields = [...Array(9).keys(), "pickup", "destination"];
const toInt = ["fees", "index", "step", "value", "weight"];
const toCoord = Math.pow(10, 15).toFixed(10);
const { fetchAddress } = require("./helpers/fetchAddress");
const { fetchDistance } = require("./helpers/fetchDistance");
const mapboxKey =
    "pk.eyJ1Ijoic2Nob29sc2tuYWkiLCJhIjoiY2t0amUyM3NmMHBtNzJ3cGQ4MjNobXNqZSJ9.6KIO734ezAzyXSxuOyBl_g";

const pollRequests = async (admin) => {
    // initialize web3
    const web3 = new Web3("https://matic-mumbai.chainstacklabs.com");
    const networkId = await web3.eth.net.getId();
    const requestManagerInstance = new web3.eth.Contract(
        RequestManager.abi,
        RequestManager.networks[networkId] &&
            RequestManager.networks[networkId].address
    );

    // scan from last scanned block to latest block
    const fromBlockRef = admin
        .firestore()
        .collection("config")
        .doc("blockchain");
    const fromBlock = (await fromBlockRef.get()).data().from_block;
    const toBlock = await web3.eth.getBlockNumber();
    const pastEvents = await requestManagerInstance.getPastEvents("allEvents", {
        fromBlock,
        toBlock,
    });

    // format data
    const newData = {};
    const toUpdate = {};
    pastEvents.forEach(async (event) => {
        let request = {};
        for (const [field, value] of Object.entries(event.returnValues)) {
            if (!(field in extraFields || extraFields.includes(field))) {
                if (toInt.includes(field)) {
                    request[field] = parseInt(value);
                } else {
                    request[field] = value;
                }
            }
        }

        if (request.step == 0) {
            temp = {
                ...event.returnValues.pickup,
                ...event.returnValues.destination,
            };
            request.pickup_lng = temp.pickup_lng / toCoord;
            request.pickup_lat = temp.pickup_lat / toCoord;
            request.destination_lng = temp.destination_lng / toCoord;
            request.destination_lat = temp.destination_lat / toCoord;
            request.pickup_floor = temp.pickup_floor;
            request.pickup_unit = temp.pickup_unit;
            request.destination_floor = temp.destination_floor;
            request.destination_unit = temp.destination_unit;
            toUpdate[request.index] = request;
        } else if (toUpdate[request.index]) {
            toUpdate[request.index] = {
                ...toUpdate[request.index],
                ...request,
            };
        } else {
            toUpdate[request.index] = request;
        }
    });

    // write to firestore
    const promises = [];
    for (const index in toUpdate) {
        const docRef = admin
            .firestore()
            .collection("requests")
            .doc(index.toString());
        promises.push(
            admin.firestore().runTransaction(async (tx) => {
                const doc = await docRef.get();
                if (doc.exists) {
                    tx.update(docRef, toUpdate[index]);
                } else {
                    toUpdate[index].requestDistance = await fetchDistance(
                        toUpdate[index],
                        mapboxKey
                    );
                    toUpdate[index].pickup = await fetchAddress(
                        toUpdate[index].pickup_lng,
                        toUpdate[index].pickup_lat,
                        mapboxKey
                    );
                    toUpdate[index].destination = await fetchAddress(
                        toUpdate[index].destination_lng,
                        toUpdate[index].destination_lat,
                        mapboxKey
                    );
                    tx.set(docRef, toUpdate[index]);
                }
            })
        );
    }
    fromBlockRef.update({ from_block: toBlock });
    await Promise.all(promises);
};

module.exports = {
    pollRequests,
};
