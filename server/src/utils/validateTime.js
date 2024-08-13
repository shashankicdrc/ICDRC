const isValidDateTime = (createdTime, minute) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - createdTime.getTime();
    const MinutesInMillisecond = minute * 60 * 1000;
    return timeDifference <= MinutesInMillisecond;
};

export default isValidDateTime;
