import { requestActions } from "store/request-slice";
import { functions, db } from "../../firebase/app";
import { httpsCallable } from "firebase/functions";
import { collection, query, where, getDocs } from "firebase/firestore";
const { fetchRequestDistance } = require("helpers/fetchDistance");

const getRequests = async (account, targetCoord, dispatch) => {
    const pollRequests = httpsCallable(functions, "pollRequests");
    await pollRequests({});
    const requestsRef = collection(db, "requests");

    // available requests
    const availableRequestsSnapshot = await getDocs(
        query(
            requestsRef,
            where("step", "==", 0),
            where("pickupAddress", "!=", account)
        )
    );
    const availableRequests = [];
    availableRequestsSnapshot.forEach(async (doc) => {
        const temp = { ...doc.data() };
        if (targetCoord) {
            temp.distanceToUser = await fetchRequestDistance(
                temp.pickup_lng,
                temp.pickup_lat,
                targetCoord.lng,
                targetCoord.lat
            );
        }
        availableRequests.push(temp);
    });

    // requests with user as courier
    const myCourierRequestsSnapshot = await getDocs(
        query(requestsRef, where("courierAddress", "==", account))
    );
    const myCourierRequests = [];
    myCourierRequestsSnapshot.forEach((doc) => {
        myCourierRequests.push(doc.data());
    });

    // requests with user as requester
    const myRequesterRequestsSnapshot = await getDocs(
        query(requestsRef, where("pickupAddress", "==", account))
    );
    const myRequesterRequests = [];
    myRequesterRequestsSnapshot.forEach((doc) => {
        myRequesterRequests.push(doc.data());
    });

    // requests with user
    const myRequests = myCourierRequests.concat(myRequesterRequests);
    myRequests.sort((a, b) => {
        return b.index - a.index;
    });

    // requests with user that is still ongoing
    const ongoingSteps = [0, 1, 2];
    const myCurrentRequests = [];
    myRequests.forEach((request) => {
        if (request.step in ongoingSteps) {
            myCurrentRequests.push(request);
        }
    });

    // request with user that is complete
    const myPastRequests = [];
    myRequests.forEach((request) => {
        if (!(request.step in ongoingSteps)) {
            myPastRequests.push(request);
        }
    });

    // requests that user reported
    const myReportedRequests = [];
    myRequests.forEach((request) => {
        if (request.step == 5) {
            myReportedRequests.push(request);
        }
    });

    // reported requests
    const reportedRequestsSnapshot = await getDocs(
        query(requestsRef, where("step", "==", 5))
    );
    const reportedRequests = [];
    reportedRequestsSnapshot.forEach((doc) => {
        reportedRequests.push(doc.data());
    });

    dispatch(
        requestActions.setRequests({
            availableRequests: availableRequests,
            myCurrentRequests: myCurrentRequests,
            myReportedRequests: myReportedRequests,
            myPastRequests: myPastRequests,
            reportedRequests: reportedRequests,
        })
    );
};

export default getRequests;
