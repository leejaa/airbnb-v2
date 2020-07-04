import React, { useCallback, useState, useRef, useEffect } from "react";
import { Dimensions, ActivityIndicator, StyleSheet, Animated } from 'react-native';
import styled from "styled-components/native";
import { View, Text } from "react-native";
import Input from "../../../components/Home/Input";
import utils, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils";
import { Ionicons, Entypo, FontAwesome, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "../../../components/Home/Slider";
import Slider2 from "../../../components/Home/Slider2";
import { SelectRoomsQuery } from "../../../generated/graphql";
import Header from "../../../components/Common/Header";
import ModalComponent from "../../../components/Common/Modal";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../redux/rootReducer";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getPlaceInfoList } from "../../../redux/homeSlice";

const Container0 = styled.View`
    width: ${SCREEN_WIDTH}px;
    height: ${SCREEN_HEIGHT}px;
`;
const TopContainer = styled.View`
    width: ${SCREEN_WIDTH}px;
    height: ${SCREEN_HEIGHT / 11}px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    z-index: 100;
    padding-left: ${SCREEN_WIDTH / 25}px;
    padding-right: ${SCREEN_WIDTH / 25}px;
`;
const CloseContainer = styled.TouchableOpacity`
    width: ${SCREEN_WIDTH / 10}px;
    height: ${SCREEN_WIDTH / 10}px;
    border-width: 1px;
    border-radius: ${SCREEN_WIDTH / 50}px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface props {
}

export default ({
}: props) => {

    return (
        <Container0>
            <TopContainer>
                <CloseContainer>
                    <AntDesign name="close" size={20} color="black" />
                </CloseContainer>
                <CloseContainer>
                    <MaterialCommunityIcons name="sort-variant" size={20} color="black" />
                </CloseContainer>
            </TopContainer>
        </Container0>
    )
}