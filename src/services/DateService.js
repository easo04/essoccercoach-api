class DateService{
    static getDateWeb(date){
        const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return `${date.getFullYear()}-${month}-${day}`
    }

    /**
     * Retourne la date en français dans le format suivant: 
     * weekday day month. year
     * ex: mercredi 21 juil. 2021
     * @param {*} date la date à convertir
     */
    static getDateFormatFR(date){
        return this.getDateFormat(date, 'fr');
    }

    static getDateFormatEN(date){
        return this.getDateFormat(date, 'en');
    }

    /**
     * Retourne la date selon la langue
     * @param {*} date la date à convertir
     * @param {*} langue la langue à utiliser 
     */
    static getDateFormat(date, langue){
        const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
        return Intl.DateTimeFormat(langue, options).format(date)
    }

    /**
     * Retourne la date dans le format dd/mm/yyyy
     */
    static getDateFormatSimple(date, langue){
        return Intl.DateTimeFormat(langue).format(date)
    }
}

module.exports = DateService