import { Platform } from "react-native";
import { Dimensions } from "react-native";
import moment from "moment";
import _ from "lodash";
import { useRef, useEffect } from "react";
const { width, height } = Dimensions.get("screen");
const format = 'YYYY-MM-DD';
export default {
  isAndroid: () => Platform.OS === "android",
  isEmail: (email: string) => {
    const regEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regEx.test(email);
  }
};

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

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
  const dateArray: string[][] = [];
  _.map(_.range(1, monthPageSize + 1), index => {
      const newDateArray = getDates({startDate: moment(baseDate).add(index - 1, 'months').startOf('month').format(format), endDate: moment(baseDate).add(index - 1, 'months').endOf('month').format(format)});
      dateArray.push(newDateArray);
  });
  return dateArray;
}


export const useDidMountEffect = (func : any, deps : any) => {
    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}
