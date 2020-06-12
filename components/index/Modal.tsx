import React, { useMemo, useState, useEffect } from "react";
import { ModalProps } from "../types";
import _ from "lodash";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/rootReducer";

const Modal: React.FunctionComponent<ModalProps> = ({
    ModalType = "001",
    message = "좋아요에 추가되었습니다.",
}) => {
    const { showLikeModal = false } = useSelector((state: rootState) => state.indexReducer);
    const style = useMemo(() => {
        console.log('showLikeModal', showLikeModal);
        let style = "";
        if (showLikeModal) {
            style = "show_modal";
        } else {
            style = "hide_modal";
        }
        return style;
    }, [showLikeModal]);
    const Modal001 = useMemo(() => {
        console.log('style', style);
        return (
            <div className={`bg-white w-8/12 h-16 rounded-lg fixed z-20 left-20 flex items-center justify-center ${style}`}>
               <span className="font-bold text-base">{message}</span>
            </div>
        );
    }, [style]);
    useEffect(() => {

    }, []);
    let Modal;
    switch (ModalType) {
        case '001':
            Modal = _.clone(Modal001);
            break;
        default:
            Modal = _.clone(Modal001);
            break;
    }
    return (
        <>
            {Modal}
        </>
    );
}

export default Modal;