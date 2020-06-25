import React, { useCallback, useState, useRef, useEffect } from "react";
import { Dimensions, ActivityIndicator, StyleSheet, Animated } from 'react-native';
import styled from "styled-components/native";
import { View, Text } from "react-native";
import Input from "../../../components/Home/Input";
import utils, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils";
import { Ionicons, AntDesign, EvilIcons } from "@expo/vector-icons";
import Slider from "../../../components/Home/Slider";
import Slider2 from "../../../components/Home/Slider2";
import { SelectRoomsQuery, Room } from "../../../generated/graphql";
import Header from "../../../components/Common/Header";
import ModalComponent from "../../../components/Common/Modal";
import _ from "lodash";
import { useSelector } from "react-redux";
import { rootState } from "../../../redux/rootReducer";

const Container0 = styled.SafeAreaView`
    width: 100%;
`;
const Container = styled.ScrollView`
    width: 100%;
`;
const Container2 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 16}px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: ${SCREEN_WIDTH / 60}px;
    padding-right: ${SCREEN_WIDTH / 60}px;
    position: absolute;
    z-index: 100;
`;
const Container3 = styled.TouchableOpacity`
    width: ${SCREEN_WIDTH / 10}px;
    height: ${SCREEN_WIDTH / 10}px;
    border-radius: ${SCREEN_WIDTH / 20}px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Container4 = styled.View`
    width: ${SCREEN_WIDTH / 4.3}px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Container5 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 3.4}px;
`;

interface props {
    room: Room
}

export default ({
    room
}: props) => {
    return (
        <Container0>
            <Container>
                <Container2>
                    <Container3>
                        <AntDesign name="arrowleft" size={18} color="black" />
                    </Container3>
                    <Container4>
                        <Container3>
                            <EvilIcons name="share-apple" size={22} color="black" />
                        </Container3>
                        <Container3>
                            <EvilIcons name="heart" size={22} color="black" />
                        </Container3>
                    </Container4>
                </Container2>
                <Container5>
                    <Slider
                        room={room as any}
                        showLikeButton={false}
                        showDescryption={false}
                        showDots={true}
                        showPageLabel={true}
                    />
                </Container5>
            </Container>
        </Container0>
    )
}