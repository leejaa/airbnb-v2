import React, { useCallback } from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";
import { View, Text } from "react-native";
import Input from "../../../components/Home/Input";
import utils, { SCREEN_HEIGHT } from "../../../utils";
import { Ionicons } from "@expo/vector-icons";

const Container1 = styled.View`
    padding-top: ${SCREEN_HEIGHT / 60}px;
`;
const Container2 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 20}px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
`;
const Container3 = styled.View`
    position: absolute;
    left: 50px;
    z-index: 1;
    top: 10px;
`;

export default ({
}: any) => {
    const onChangeSearchBox = useCallback(() => {

    }, []);
    return (
        <Container1>
            <Container2>
                <Input
                    stateFn={onChangeSearchBox}
                    cssType="css001"
                    placeholder="            위치, 명소 또는 주소를 입력하세요."
                >
                </Input>
                <Container3>
                    <Ionicons
                        name={utils.isAndroid() ? "md-search" : "ios-search"}
                        size={28}
                    />
                </Container3>
            </Container2>
        </Container1>
    )
}