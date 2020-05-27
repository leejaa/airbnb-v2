import React, { useCallback, useState } from "react";
import { InputProps, SearchProps, SearchPlaceProps, addGuestProps } from "../types";
import { CloseOutlined, SearchOutlined, CalendarOutlined, UsergroupAddOutlined, CloseCircleFilled, InstagramOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toggleShowSearchModal, toggleShowSearchPlace, toggleShowHeader } from "../../redux/indexSlice";
import Input from "./Input";

const AddGuest: React.FunctionComponent<addGuestProps> = ({
}) => {
    
    
    return (
        <div className="move001">
            <div className="w-full h-full border border-black">
                
            </div>
        </div >
    );
}

export default AddGuest;