export default function timeBlock() {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let monthStr = month.toString();
    let dateStr = date.toString();
    let hourStr = hour.toString();
    let minuteStr = minute.toString();
    if (month < 10) monthStr = '0' + month.toString();
    if (date < 10) dateStr = '0' + date.toString();
    if (hour < 10) hourStr = '0' + hour.toString();
    if (minute < 10) minuteStr = '0' + minute.toString();
    let current_time = `${year}/${monthStr}/${dateStr} ${hourStr}:${minuteStr}`;
    // console.log(current_time);
    return current_time;

}