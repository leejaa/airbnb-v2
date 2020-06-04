import React, { useCallback, useMemo, useState, useEffect } from "react";
import moment from "moment";
import { InputProps, CalendarProps } from "../types";
import _ from "lodash";
import { getDates, getDatesEachMonths } from "../../utils/utils";
import { DownOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { changeSelectedDateRange } from "../../redux/indexSlice";

const RoomSlide: React.FunctionComponent<CalendarProps> = ({
}) => {
    const RoomSlide001 = useMemo(() => {
        return (
            <div>
                
            </div>
        );
    }, []);
    
    let RoomSlide;
    switch (RoomSlide) {
        case '001':
            RoomSlide = _.clone(RoomSlide001);
            break;
        default:
            RoomSlide = _.clone(RoomSlide001);
            break;
    }
    return (
        <>
            {RoomSlide}
        </>
    );
}

export default RoomSlide;