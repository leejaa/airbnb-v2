import React, { useCallback } from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/rootReducer";

const Container1 = styled.View`
    padding-top: ${SCREEN_HEIGHT / 20}px;
    padding-left: ${SCREEN_WIDTH / 18}px;
    padding-right: ${SCREEN_WIDTH / 18}px;
`;
const Container2 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 25}px;
    display: flex;
    justify-content: center;
`;
const Container3 = styled.Text`
    font-size: 10px;
    font-weight: 700;
`;
const Container4 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 13}px;
    display: flex;
    flex-direction: row;
    border-bottom-width: 1px;
    border-color: #C2BFBF;
`;
const Container5 = styled.View`
    width: 20%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const Container6 = styled.View`
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding-left: ${SCREEN_WIDTH / 20}px;
`;
const Container7 = styled.View`
    width: 80%;
    height: 80%;
    background-color: #D3D2D2;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Text1 = styled.Text`
    font-size: 15px;
`;
interface props {
}

export default ({
}: props) => {
    const { searchPlaceList = [] } = useSelector((state: rootState) => state.homeReducer);
    return (
        <Container1>
            <Container2>
                <Container3>최근 검색 기록</Container3>
            </Container2>
            {
                searchPlaceList.slice(0,10).map((place, index) => (
                    <Container4 key={index}>
                        <Container5>
                            <Container7>
                                <Feather name="watch" size={22} color="black" />
                            </Container7>
                        </Container5>
                        <Container6>
                            <Text1>{place.place_name}</Text1>
                        </Container6>
                    </Container4>
                ))
            }
        </Container1>
    )
}