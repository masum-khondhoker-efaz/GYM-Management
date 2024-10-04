const convertToDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) {
        throw new Error("Invalid date or time string");
    }

    const [time, modifier] = timeStr.split(" ");
    if (!time || !modifier) {
        throw new Error(`Invalid time format: ${timeStr}`);
    }

    let [hours, minutes] = time.split(":");
    if (!hours || !minutes) {
        throw new Error(`Invalid hours/minutes in time: ${timeStr}`);
    }

    if (modifier === "PM" && hours !== "12") {
        hours = (parseInt(hours, 10) + 12).toString();
    } else if (modifier === "AM" && hours === "12") {
        hours = "00";
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date format: ${dateStr}`);
    }

    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));


    return date;
};


export default convertToDateTime;