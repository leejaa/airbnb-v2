import React, { useMemo, useState, useEffect } from "react";
import { ModalProps } from "../types";
import _ from "lodash";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/rootReducer";

const Modal: React.FunctionComponent<ModalProps> = ({
    ModalType = "001",
}) => {
    const { showLikeModal = false, modalMessage = "" } = useSelector((state: rootState) => state.indexReducer);
    const style = useMemo(() => {
        let style = "";
        if (showLikeModal) {
            style = "show_modal";
        } else {
            style = "hide_modal";
        }
        return style;
    }, [showLikeModal]);
    const Modal001 = useMemo(() => {
        return (
            <div className={`bg-white w-8/12 h-16 rounded-lg fixed z-20 left-20 flex items-center justify-center ${style} xl:w-2/12 xl:left-5`}>
               <span className="font-bold text-base">{modalMessage}</span>
            </div>
        );
    }, [style, modalMessage]);
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