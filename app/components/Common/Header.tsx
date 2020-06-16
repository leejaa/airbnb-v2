import React, { useMemo, useCallback } from "react";
import { TouchableOpacity, Dimensions, Text, View } from "react-native";
import styled from "styled-components/native";
import _ from "lodash";
import { AntDesign } from '@expo/vector-icons';
import { headerProps } from "../types";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";

const Container: any = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 16}px;
    margin-top: ${SCREEN_HEIGHT / 60}px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: ${SCREEN_WIDTH / 12}px;
    border-bottom-width: 2px;
    border-color: #CECBCB;
`;
const Container2: any = styled.View`
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Container3: any = styled.View`
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
const Text1: any = styled.Text`
    font-size: 15px;
    font-weight: bold;
`;
const Text2: any = styled.Text`
    font-size: 15px;
    color: #000;
`;

const Header: React.FC<headerProps> = ({
    cssType = "001"
}: any) => {
    const Header001 = useMemo(() => {
        return (
            <Container>
                <Container2>
                    <Text1>지역</Text1>
                </Container2>
                <Container3>
                    <Text2>날짜 입력</Text2>
                    <Text2>|</Text2>
                    <AntDesign name="bars" size={20} color="black" />
                </Container3>
            </Container>
        );
    }, []);
    let Header;
    switch (cssType) {
        case "001":
            Header = _.clone(Header001);
            break;
        default:
            Header = _.clone(Header001);
            break;
    }
    return (
        <>
            {Header}
        </>
    );
}

export default Header;