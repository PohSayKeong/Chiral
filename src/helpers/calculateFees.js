const calculateFees = (distance) => {
    if (distance > 5) {
        return (0.8 * (10 + 0.7 * (distance - 5) + 2.3)).toFixed(2);
    } else {
        return (0.8 * (5 + distance + 2.3)).toFixed(2);
    }
};

export default calculateFees;
