const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { pollRequests } = require("./src/pollRequests");
admin.initializeApp();

exports.pollRequests = functions
    .region("asia-southeast1")
    .https.onCall(async () => {
        return await pollRequests(admin);
    });
