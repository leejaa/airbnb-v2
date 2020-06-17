import React, { useCallback } from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/rootReducer";
import Calendar from "../../components/Common/Calendar";

const Container1 = styled.View`
    width: 100%;
`;
const Container2 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 10}px;
    display: flex;
    justify-content: center;
    padding: ${SCREEN_WIDTH / 20}px;
`;
const Container3 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT * 0.6}px;
    margin-top: ${SCREEN_HEIGHT / 13}px;
`;
const Text1 = styled.Text`
    font-size: ${SCREEN_WIDTH / 20}px;
    font-weight: 600;
`;
interface props {
}

export default ({
}: props) => {
    return (
        <Container1>
            <Container2>
                <Text1>날짜 추가</Text1>
            </Container2>
            <Container3>
                <Calendar />
            </Container3>
        </Container1>
    )
}