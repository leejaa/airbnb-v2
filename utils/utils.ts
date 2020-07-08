import moment from "moment";
import _ from "lodash";

const format = 'YYYY-MM-DD';
export const getDates = ({startDate, endDate} : any) => {
    const dateArray = [];
    let currentDate : any = moment(startDate);
    while (currentDate <= moment(endDate)) {
        dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

export const getDatesEachMonths = ({baseDate, monthPageSize} : any) => {
    const dateArray = [];
    _.map(_.range(1, monthPageSize + 1), index => {
        const newDateArray = getDates({startDate: moment(baseDate).add(index - 1, 'months').startOf('month').format(format), endDate: moment(baseDate).add(index - 1, 'months').endOf('month').format(format)});
        dateArray.push(newDateArray);
    });
    return dateArray;
}

export const WEBSCREEN_WIDTH = typeof window !== 'undefined' ? window.screen.width : 0;
export const WEBSCREEN_HEIGHT = typeof window !== 'undefined' ? window.screen.height : 0;
export const IS_CLIENT = typeof window !== 'undefined';