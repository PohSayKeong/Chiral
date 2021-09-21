const calculateFees = (distance) => {
    if (distance < 5) {
        return 5;
    } else if (distance < 10) {
        return 7;
    } else if (distance < 20) {
        return 10;
    } else if (distance < 35) {
        return 13;
    } else {
        return 15;
    }
};

export default calculateFees;
