import React, { useCallback } from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";
import { View, Text } from "react-native";
import Input from "../../../components/Home/Input";
import utils, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils";
import { Ionicons } from "@expo/vector-icons";
import Slider from "../../../components/Home/Slider";
import Slider2 from "../../../components/Home/Slider2";

const Container1 = styled.View`
    padding-top: ${SCREEN_HEIGHT / 60}px;
    display: flex;
    align-items: center;
`;
const Container2 = styled.View`
    width: 80%;
    height: ${SCREEN_HEIGHT / 20}px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
const Container4 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 4}px;
    margin-top: ${SCREEN_HEIGHT / 25}px;
`;

export default ({
    data
}: any) => {
    const onChangeSearchBox = useCallback(() => {
    }, []);
    return (
        <Container1>
            <Container2>
                <Input
                    stateFn={onChangeSearchBox}
                    cssType="css001"
                    placeholder="위치, 명소 또는 주소를 입력하세요."
                >
                </Input>
            </Container2>
            <Container4>
                <Slider
                    cssType="css001"
                    data={data}
                >
                </Slider>
            </Container4>
            <Container4>
                <Slider2
                    cssType="css001"
                    data={data}
                >
                </Slider2>
            </Container4>
        </Container1>
    )
}