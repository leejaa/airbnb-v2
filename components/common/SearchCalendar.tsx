import React, { useCallback, useState } from "react";
import { InputProps, SearchProps, SearchPlaceProps, SearchCalendarProps } from "../types";
import { CloseOutlined, SearchOutlined, CalendarOutlined, UsergroupAddOutlined, CloseCircleFilled, InstagramOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toggleShowSearchModal, toggleShowSearchPlace, toggleShowHeader } from "../../redux/indexSlice";
import Input from "./Input";

const SearchCalendar: React.FunctionComponent<SearchCalendarProps> = ({
}) => {
    return (
        <div>
            SearchCalendar.............
        </div >
    );
}

export default SearchCalendar;