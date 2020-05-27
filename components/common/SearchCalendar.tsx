import React, { useCallback } from "react";
import _ from "lodash";
import { SearchCalendarProps } from "../types";
import { LeftOutlined, ArrowRightOutlined, SwapRightOutlined } from "@ant-design/icons";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowHeader, toggleShowSearchCalendar } from "../../redux/indexSlice";
import Calendar from "./Calendar";
import { rootState } from "../../redux/rootReducer";
import moment from "moment";

const SearchCalendar: React.FunctionComponent<SearchCalendarProps> = ({
}) => {
    const { selectedDateRange } = useSelector((state: rootState) => state.indexReducer);
    const dispatch = useDispatch();
    const onChangeDate = useCallback(() => {

    }, []);
    const goBack = useCallback(() => {
        dispatch(toggleShowHeader({ data: true }));
        dispatch(toggleShowSearchCalendar({ data: false }));
    }, []);
    return (
        <div className="w-full h-full">
            <div className="w-full h-16 flex items-center justify-between p-3">
                <LeftOutlined style={{ fontSize: 25 }} onClick={goBack} />
                <span><u>지우기</u></span>
            </div>
            <div className="w-full h-16 flex items-center p-3">
                <span className="text-xl font-bold">날짜 추가</span>
            </div>
            <div className="w-full h-16 flex items-center pl-3">
                <div className="w-1/3 h-70p">
                    <Input
                        inputType="003"
                        placeholder="년.월.일"
                        onChange={onChangeDate}
                        value={_.isEmpty(selectedDateRange?.startDate) ? "" : moment(selectedDateRange.startDate).format('YYYY.MM.DD')}
                    />
                </div>
                <div className="w-1/12 h-full flex items-center justify-center">
                    <SwapRightOutlined style={{ fontSize: 20 }} />
                </div>
                <div className="w-1/3 h-70p">
                    <Input
                        inputType="003"
                        placeholder="년.월.일"
                        onChange={onChangeDate}
                        value={_.isEmpty(selectedDateRange?.endDate) ? "" : moment(selectedDateRange.endDate).format('YYYY.MM.DD')}
                    />
                </div>
            </div>
            <div className="w-full h-62p">
                <Calendar />
            </div>
            <div className="w-full h-10p border absolute border-black bottom-0 flex items-center justify-between">
            </div>
        </div >
    );
}

export default SearchCalendar;