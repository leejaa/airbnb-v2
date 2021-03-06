import React, { useCallback, useMemo, useState, useEffect } from "react";
import moment from "moment";
import { InputProps, CalendarProps } from "../types";
import _ from "lodash";
import { getDates, getDatesEachMonths } from "../../utils/utils";
import { DownOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { changeSelectedDateRange } from "../../redux/indexSlice";

const format = 'YYYY-MM-DD';
let dateIndex = 0;
const Calendar: React.FunctionComponent<CalendarProps> = ({
    calenderType = '001',
    monthPageSize = 4,
}) => {
    const dispatch = useDispatch();
    const [baseDate, setBaseDate] = useState(moment().format(format));
    const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });
    const [dates, setDates] = useState(getDatesEachMonths({ baseDate: moment().format(format), monthPageSize }));
    const showMoreMonths = useCallback(() => {
        const newBaseDate = moment(baseDate).add(monthPageSize, 'months').format(format);
        setBaseDate(newBaseDate);
        const newDates = _.union(dates, getDatesEachMonths({ baseDate: newBaseDate, monthPageSize }));
        setDates(newDates);
    }, [dates, baseDate]);
    const moveMonths = useCallback((flag) => {
        let defaultAnimationClassName = "";
        if (_.isEqual(flag, 'right')) {
            defaultAnimationClassName = "cell_right";
        } else if (_.isEqual(flag, 'left')) {
            defaultAnimationClassName = "cell_left";
        }
        const animationCells = document.getElementsByClassName("animation");
        _.forEach(animationCells, (cell : any, index) => {
            cell.className = "";
            void cell.offsetWidth;
            cell.className = `animation w-1/4 h-full ${defaultAnimationClassName}${index}`;
        });
        let pagination = 0;
        if (_.isEqual(flag, 'right')) {
            pagination = 1;
        } else if (_.isEqual(flag, 'left')) {
            pagination = -1;
        }
        const newBaseDate = moment(baseDate).add(pagination, 'months').format(format);
        setBaseDate(newBaseDate);
        const newDates = getDatesEachMonths({ baseDate: newBaseDate, monthPageSize });
        setDates(newDates);
    }, [dates, baseDate, selectedDateRange]);
    useEffect(() => {
        dispatch(changeSelectedDateRange({ data: selectedDateRange }));
    }, [selectedDateRange]);
    const selectDate = useCallback(({ eachDateParam, isAble }) => {
        if (!isAble) {
            return false;
        }
        const newSelectedDateRange = _.clone(selectedDateRange);
        if (_.isEmpty(selectedDateRange.startDate)) {
            newSelectedDateRange.startDate = eachDateParam;
        }
        if (_.isEmpty(selectedDateRange.endDate)) {
            newSelectedDateRange.endDate = eachDateParam;
        }
        if (!_.isEmpty(selectedDateRange.startDate) && !_.isEmpty(selectedDateRange.endDate)) {
            if (_.isEqual(selectedDateRange.startDate, selectedDateRange.endDate)) {
                newSelectedDateRange.endDate = eachDateParam;
            } else {
                newSelectedDateRange.startDate = eachDateParam;
                newSelectedDateRange.endDate = eachDateParam;
            }
        }
        if (moment(newSelectedDateRange.startDate).isAfter(moment(newSelectedDateRange.endDate))) {
            const temp = newSelectedDateRange.startDate;
            newSelectedDateRange.startDate = newSelectedDateRange.endDate;
            newSelectedDateRange.endDate = temp;
        }
        setSelectedDateRange(newSelectedDateRange);
    }, [selectedDateRange]);
    const drawCells = useCallback((eachDates) => {
        const dayIndex = moment(eachDates[0]).day();
        dateIndex = 0;
        return (
            <>
                {
                    _.map(_.range(0, Math.ceil(eachDates.length / 7)), (eachWeekIndex) => {
                        return (
                            <div className="w-full h-12 flex flex-row">
                                {
                                    _.map(_.range(0, 7), (cellIndex) => {
                                        if (dateIndex > eachDates.length - 1) {
                                            return;
                                        }
                                        const isAble = !moment(eachDates[dateIndex]).isSameOrBefore(moment());
                                        let fontColor = moment(eachDates[dateIndex]).isSameOrBefore(moment()) ? "text-gray-300" : "";
                                        fontColor = _.includes([selectedDateRange.startDate, selectedDateRange.endDate], eachDates[dateIndex]) ? "text-white" : fontColor;
                                        const isSelectedDate = moment(eachDates[dateIndex]).isBetween(selectedDateRange.startDate, selectedDateRange.endDate, null, '[]');
                                        const eachDateParam = _.clone(eachDates[dateIndex]);
                                        return (
                                            <div className={`w-1/7 h-12 flex items-center justify-center ${isSelectedDate && "bg-gray-200"} ${eachDates[dateIndex] === selectedDateRange.startDate && "rounded-l-full"} ${eachDates[dateIndex] === selectedDateRange.endDate && "rounded-r-full"}`}>
                                                <div className={`hover:shadow-black w-full h-full rounded-full flex items-center justify-center ${_.includes([selectedDateRange.startDate, selectedDateRange.endDate], eachDates[dateIndex]) && "bg-black"}`} onClick={() => selectDate({ eachDateParam, isAble })}>
                                                    {
                                                        eachWeekIndex === 0 ? (
                                                            <span className={`text-sm font-bold ${fontColor}`}>{dayIndex > cellIndex ? "" : moment(eachDates[dateIndex++]).format('D')}</span>
                                                        ) : (
                                                                <span className={`text-sm font-bold ${fontColor}`}>{moment(eachDates[dateIndex++]).format('D')}</span>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </div>
                        )
                    })
                }
            </>
        );
    }, [dates, baseDate, selectedDateRange]);
    const drawMondayToSunday = useCallback(() => {
        return (
            <div className="w-full h-7 flex flex-row items-center justify-between border-b border-gray-200">
                <div className="w-1/7 h-full flex item-center justify-center">
                    <span className="text-xs">일</span>
                </div>
                <div className="w-1/7 h-full flex item-center justify-center">
                    <span className="text-xs">월</span>
                </div>
                <div className="w-1/7 h-full flex item-center justify-center">
                    <span className="text-xs">화</span>
                </div>
                <div className="w-1/7 h-full flex item-center justify-center">
                    <span className="text-xs">수</span>
                </div>
                <div className="w-1/7 h-full flex item-center justify-center">
                    <span className="text-xs">목</span>
                </div>
                <div className="w-1/7 h-full flex item-center justify-center">
                    <span className="text-xs">금</span>
                </div>
                <div className="w-1/7 h-full flex item-center justify-center">
                    <span className="text-xs">토</span>
                </div>
            </div>
        );
    }, [dates, baseDate, selectedDateRange]);
    const Calendar001 = useMemo(() => {
        return (
            <div className="w-full h-full">
                {drawMondayToSunday()}
                <div className="w-full h-full overflow-auto">
                    {
                        dates.map((eachDates, index) => {
                            return (
                                <div key={index} className="w-full h-65p relative">
                                    <div className="w-full h-10p flex items-center justify-center">
                                        <span className="font-bold">{moment(eachDates[0]).format('YYYY년 M월')}</span>
                                    </div>
                                    <div className="w-full h-62p flex flex-col">
                                        {drawCells(eachDates)}
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="w-full h-12 flex items-center justify-center" onClick={showMoreMonths}>
                        <DownOutlined style={{ fontSize: 20 }} />
                    </div>
                </div>
            </div>
        );
    }, [dates, baseDate, selectedDateRange]);
    const Calendar002 = useMemo(() => {
        return (
            <div className="w-full h-full flex flex-row justify-around relative">
                <div className="w-3p h-full flex items-center justify-center cursor-pointer absolute left-0" onClick={() => moveMonths('left')}>
                    <ArrowLeftOutlined style={{ fontSize: 15 }} />
                </div>
                <div className="w-full h-full flex flex-row justify-around">
                    {
                        dates.map((eachDates, index) => {
                            return (
                                <div className={`animation w-1/4 h-full`}>
                                    <div key={index} className="w-full h-65p">
                                        <div className="w-full h-10p flex items-center justify-center">
                                            <span className="font-bold">{moment(eachDates[0]).format('YYYY년 M월')}</span>
                                        </div>
                                        {drawMondayToSunday()}
                                        <div className="w-full h-62p flex flex-col">
                                            {drawCells(eachDates)}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="w-3p h-full flex items-center justify-center cursor-pointer absolute right-0" onClick={() => moveMonths('right')}>
                    <ArrowRightOutlined style={{ fontSize: 15 }} />
                </div>
            </div>
        );
    }, [dates, baseDate, selectedDateRange]);
    let Calendar;
    switch (calenderType) {
        case '001':
            Calendar = _.clone(Calendar001);
            break;
        case '002':
            Calendar = _.clone(Calendar002);
            break;
        default:
            Calendar = _.clone(Calendar001);
            break;
    }
    return (
        <>
            {Calendar}
        </>
    );
}

export default Calendar;