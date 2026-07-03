import dayjs from "dayjs";

export const DisplayDateFormat = (date) => {
    return dayjs(date).format('DD-MM-YYYY');
}