class DateService{
    static getDateWeb(date){
        const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return `${date.getFullYear()}-${month}-${day}`
    }
}

module.exports = DateService