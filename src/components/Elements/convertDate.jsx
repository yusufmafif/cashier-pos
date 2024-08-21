export default function convertDate(date) {
    const sellDateObj = new Date(date);
    const day = sellDateObj.getDate();
    const month = sellDateObj.getMonth() + 1;
    const year = sellDateObj.getFullYear();
    const hours = sellDateObj.getHours();
    const minutes = sellDateObj.getMinutes();
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDate
}