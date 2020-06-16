import React, { useCallback } from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";
import { View, Text } from "react-native";
import Input from "../../../components/Home/Input";
import utils, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils";
import { Ionicons } from "@expo/vector-icons";
import Slider from "../../../components/Home/Slider";
import Slider2 from "../../../components/Home/Slider2";
import { SelectRoomsQuery } from "../../../generated/graphql";
import Header from "../../../components/Common/Header";
import ModalComponent from "../../../components/Common/Modal";

const Container1 = styled.ScrollView`
    padding-top: ${SCREEN_HEIGHT / 60}px;
    display: flex;
    background-color: white;
`;
const Container2 = styled.View`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
const Container3 = styled.View`
    width: 100%;
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
const Container5 = styled.View`
    width: 85%;
    height: ${SCREEN_HEIGHT / 4}px;
    margin-top: ${SCREEN_HEIGHT / 8}px;
`;
const Container6 = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

interface props {
    data: SelectRoomsQuery
}

export default ({
    data
}: props) => {
    const onChangeSearchBox = useCallback(() => {
    }, []);
    return (
        <Container1>
            <Header />
            {/* <Container3>
                <Container2>
                    <Input
                        stateFn={onChangeSearchBox}
                        cssType="css001"
                        placeholder="위치, 명소 또는 주소를 입력하세요."
                    >
                    </Input>
                </Container2>
            </Container3> */}
            {/* <Container4>
                <Slider2
                    cssType="css001"
                    room={data.selectRooms[0] as any}
                >
                </Slider2>
            </Container4> */}
            <ModalComponent />
            <Container6>
                {
                    data.selectRooms.map(room => (
                        <Container5 key={room.id}>
                            <Slider
                                cssType="css001"
                                room={room as any}
                            >
                            </Slider>
                        </Container5>
                    ))
                }
            </Container6>
        </Container1>
    )
}