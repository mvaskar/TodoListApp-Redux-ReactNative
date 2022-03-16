import moment from 'moment';

export const formatDate = (date) => {
    if (date == null) return null
    return moment(date).format("DD MMM yyyy");
}

export const convertToSQLiteDate = (date) => {
    return moment(date).format("YYYY-MM-DD")
}
