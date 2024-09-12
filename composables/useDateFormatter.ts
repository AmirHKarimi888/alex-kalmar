export default function () {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septempber", "October", "November", "December"];

    const getFormattedDate = (date: string) => {
        let dateList = date.split("-");
        let year = dateList[0];
        let month = months[+dateList[1] - 1];
        let day = dateList[2].split(" ")[0]
        return `${day}${+day === 1 ? 'st' : +day === 2 ? 'nd' : +day === 3 ? 'rd' : 'th'} ${month} ${year}`;
    }

    return getFormattedDate;
}