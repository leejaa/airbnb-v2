import React, { useMemo, useCallback } from "react";
import { View, Text } from "react-native";
import Modal from 'react-native-modal';
import styled from "styled-components/native";
import _ from "lodash";
import { AntDesign } from '@expo/vector-icons';
import { headerProps } from "../types";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";
import { rootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowSearchModal } from "../../redux/homeSlice";

const Container: any = styled.TouchableOpacity`
    width: ${SCREEN_WIDTH}px;
    height: ${SCREEN_HEIGHT}px;
`;
const Container2: any = styled.TouchableOpacity`
    width: 100%;
    height: ${SCREEN_HEIGHT / 10}px;
    background-color: black;
    position: absolute;
    top: 0;
`;

const ModalComponent: React.FC<headerProps> = ({
    cssType = "001"
}: any) => {
    const { showSearchModal = false } = useSelector((state: rootState) => state.homeReducer);
    const dispatch = useDispatch();
    const closeModal = useCallback(() => {
        dispatch(toggleShowSearchModal({ data: false }));
    }, []);
    const Modal001 = useMemo(() => {
        return (
            <Modal
                isVisible={showSearchModal}
                animationIn="slideInDown"
                animationOut="slideInUp"
            >
                <Container
                    onPress={closeModal}
                >
                    <Container2></Container2>
                </Container>
            </Modal>
        );
    }, [showSearchModal]);
    let ModalComponent;
    switch (cssType) {
        case "001":
            ModalComponent = _.clone(Modal001);
            break;
        default:
            ModalComponent = _.clone(Modal001);
            break;
    }
    return (
        <>
            {ModalComponent}
        </>
    );
}

export default ModalComponent;