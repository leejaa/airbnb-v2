import React, { useCallback } from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/rootReducer";
import Calendar from "../../components/Common/Calendar";
import { useNavigation } from "@react-navigation/native";

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
    height: ${SCREEN_HEIGHT * 0.52}px;
    margin-top: ${SCREEN_HEIGHT / 13}px;
`;
const Container4 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT * 0.1}px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;
const Container5 = styled.TouchableOpacity`
    width: 33%;
    height: 100%;
    background-color: #F02B52;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Text1 = styled.Text`
    font-size: ${SCREEN_WIDTH / 20}px;
    font-weight: 600;
`;
const Text2 = styled.Text`
    font-size: ${SCREEN_WIDTH / 20}px;
    font-weight: bold;
    color: white;
`;
interface props {
}

export default ({
}: props) => {
    const navigation = useNavigation();
    return (
        <Container1>
            <Container2>
                <Text1>날짜 추가</Text1>
            </Container2>
            <Container3>
                <Calendar />
            </Container3>
            <Container4>
                <Container5 onPress={() => navigation.navigate("Home")}>
                    <Text2>검색</Text2>
                </Container5>
            </Container4>
        </Container1>
    )
}