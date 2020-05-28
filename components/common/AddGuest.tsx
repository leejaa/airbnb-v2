import React, { useCallback, useState } from "react";
import _ from "lodash";
import { addGuestProps } from "../types";
import { CloseOutlined, SearchOutlined, CalendarOutlined, UsergroupAddOutlined, CloseCircleFilled, InstagramOutlined, LeftOutlined, PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleShowHeader, toggleAddGuest } from "../../redux/indexSlice";

const AddGuest: React.FunctionComponent<addGuestProps> = ({
}) => {
    const dispatch = useDispatch();
    const [adultCnt, setAdultCnt] = useState(0);
    const [kidsCnt, setKidsCnt] = useState(0);
    const [babyCnt, setBabyCnt] = useState(0);
    const goBack = useCallback(() => {
        dispatch(toggleShowHeader({ data: true }));
        dispatch(toggleAddGuest({ data: false }));
    }, []);
    const changeAdultCnt = useCallback((plusMinus) => {
        let newAdultCnt = _.clone(adultCnt);
        if (_.isEqual(plusMinus, 'plus')) {
            newAdultCnt ++;
        } else if (_.isEqual(plusMinus, 'minus')) {
            newAdultCnt = newAdultCnt - 1 < 0 ? 0 : newAdultCnt - 1;
        }
        setAdultCnt(newAdultCnt);
    }, [adultCnt]);
    const changeKidsCnt = useCallback((plusMinus) => {
        let newKidsCnt = _.clone(kidsCnt);
        if (_.isEqual(plusMinus, 'plus')) {
            newKidsCnt ++;
        } else if (_.isEqual(plusMinus, 'minus')) {
            newKidsCnt = newKidsCnt - 1 < 0 ? 0 : newKidsCnt - 1;
        }
        setKidsCnt(newKidsCnt);
    }, [kidsCnt]);
    const changeBabyCnt = useCallback((plusMinus) => {
        let newBabyCnt = _.clone(babyCnt);
        if (_.isEqual(plusMinus, 'plus')) {
            newBabyCnt ++;
        } else if (_.isEqual(plusMinus, 'minus')) {
            newBabyCnt = newBabyCnt - 1 < 0 ? 0 : newBabyCnt - 1;
        }
        setBabyCnt(newBabyCnt);
    }, [babyCnt]);
    return (
        <div className="move001">
            <div className="w-full h-16 flex items-center justify-between p-3">
                <LeftOutlined style={{ fontSize: 25 }} onClick={goBack} />
                <span><u>지우기</u></span>
            </div>
            <div className="w-full h-16 mt-5 flex items-center">
                <span className="font-bold text-2xl">게스트 추가</span>
            </div>
            <div className="w-full h-56 mt-5 flex items-center flex flex-col">
                <div className="w-full h-33p border-b border-gray-300 flex items-center justify-between">
                    <div className="w-1/3 h-full flex flex-col justify-center">
                        <span className="font-semibold">성인</span>
                        <span className="text-gray-500">만 13세 이상</span>
                    </div>
                    <div className="w-1/3 h-full flex items-center justify-between">
                        <MinusCircleOutlined style={{ fontSize: 30 }} onClick={() => changeAdultCnt('minus')}/>
                        <span className="text-lg">{adultCnt}</span>
                        <PlusCircleOutlined style={{ fontSize: 30 }} onClick={() => changeAdultCnt('plus')}/>
                    </div>
                </div>
                <div className="w-full h-33p border-b border-gray-300 flex items-center justify-between">
                    <div className="w-1/3 h-full flex flex-col justify-center">
                        <span className="font-semibold">어린이</span>
                        <span className="text-gray-500">2 ~ 12세</span>
                    </div>
                    <div className="w-1/3 h-full flex items-center justify-between">
                        <MinusCircleOutlined style={{ fontSize: 30 }} onClick={() => changeKidsCnt('minus')}/>
                        <span className="text-lg">{kidsCnt}</span>
                        <PlusCircleOutlined style={{ fontSize: 30 }} onClick={() => changeKidsCnt('plus')}/>
                    </div>
                </div>
                <div className="w-full h-33p flex items-center justify-between">
                    <div className="w-1/3 h-full flex flex-col justify-center">
                        <span className="font-semibold">유아</span>
                        <span className="text-gray-500">2세 미만</span>
                    </div>
                    <div className="w-1/3 h-full flex items-center justify-between">
                        <MinusCircleOutlined style={{ fontSize: 30 }} onClick={() => changeBabyCnt('minus')}/>
                        <span className="text-lg">{babyCnt}</span>
                        <PlusCircleOutlined style={{ fontSize: 30 }} onClick={() => changeBabyCnt('plus')}/>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AddGuest;