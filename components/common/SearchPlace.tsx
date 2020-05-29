import React, { useCallback, useState } from "react";
import { InputProps, SearchProps, SearchPlaceProps } from "../types";
import { CloseOutlined, SearchOutlined, CalendarOutlined, UsergroupAddOutlined, CloseCircleFilled, InstagramOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toggleShowSearchModal, toggleShowSearchPlace, toggleShowHeader } from "../../redux/indexSlice";
import Input from "./Input";
import SearchPlaceList from "./SearchPlaceList";

const SearchPlace: React.FunctionComponent<SearchPlaceProps> = ({
}) => {
    const dispatch = useDispatch();
    const [searchResultList, setSearchResultList] = useState([]);
    const cancel = useCallback(() => {
        dispatch(toggleShowSearchPlace({ data: false }));
        dispatch(toggleShowHeader({ data: true }));
    }, []);
    const [searchword, setSearchword] = useState("");
    const onChangeSearch = useCallback((e) => {
        setSearchword(e?.target?.value ?? "");
        searchAddress();
    }, [searchword]);
    const onKeyDown = useCallback((e) => {
        if (e.keyCode === 13) {
            // searchAddress();
        }
    }, [searchword]);
    const searchAddress = useCallback(async () => {
        const result = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchword}`, {
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO_KEY}`
            }
        });
        setSearchResultList(result?.data?.documents ?? []);
    }, [searchword, searchResultList]);
    return (
        <div className="move001">
            <div className="move002 flex flex-row">
                <div className="w-4/5 h-full flex justify-center items-center">
                    <Input
                        inputType="002"
                        value={searchword}
                        setValue={setSearchword}
                        onChange={onChangeSearch}
                        onKeyDown={onKeyDown}
                        searchResultList={searchResultList}
                    />
                </div>
                <div className="w-1/5 h-full flex justify-center items-center" onClick={cancel}>
                    <span>취소</span>
                </div>
            </div>
            <SearchPlaceList
                searchResultList={searchResultList}
            />
        </div >
    );
}

export default SearchPlace;