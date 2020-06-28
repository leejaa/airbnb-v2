import React, { useCallback, useState, useRef, useEffect } from "react";
import { Dimensions, ActivityIndicator, StyleSheet, Animated, Alert, View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import styled from "styled-components/native";
import Input from "../../../components/Home/Input";
import utils, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils";
import { Ionicons, AntDesign, EvilIcons, MaterialCommunityIcons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import Slider from "../../../components/Home/Slider";
import Slider2 from "../../../components/Home/Slider2";
import { SelectRoomsQuery, Room } from "../../../generated/graphql";
import Header from "../../../components/Common/Header";
import ModalComponent from "../../../components/Common/Modal";
import _ from "lodash";
import { useSelector } from "react-redux";
import { rootState } from "../../../redux/rootReducer";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Review from "../../../components/Room/Review";

const Container = styled.ScrollView`
    width: 100%;
`;
const TitleContainer = styled.View`
    margin-top: ${SCREEN_HEIGHT / 40}px;
    width: 100%;
    height: ${SCREEN_HEIGHT / 12}px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: ${SCREEN_WIDTH / 20}px;
`;
const TitleText = styled.Text`
    font-size: ${SCREEN_WIDTH / 17}px;
    font-weight: bold;
`;
const ScoreContainer = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 3}px;
    padding: ${SCREEN_WIDTH / 25}px;
`;
const ScoreContainer2 = styled.View`
    width: 100%;
    height: 16.667%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const ScoreContainer2Text = styled.Text`
`;
const ScoreContainer3 = styled.View`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const ScoreContainer3Bar1: any = styled.View`
    width: 80%;
    border-width: 2px;
    border-color: #E3DFDF;
    border-radius: 10px;
    position: absolute;
    left: 0;
    z-index: 0;
`;
const ScoreContainer3Bar2: any = styled.View`
    width: ${(props: any) => `${80 * props.rate}%`};
    border-width: 2px;
    border-radius: 10px;
    position: absolute;
    left: 0;
    z-index: 100;
`;
const ScoreContainer3Text = styled.Text`
    font-size: ${SCREEN_WIDTH / 30}px;
    font-weight: bold;
    position: absolute;
    right: 0;
`;
const ReviewContainer = styled.View`
    width: 100%;
    padding: ${SCREEN_WIDTH / 20}px;
`;
const ReviewContainer2 = styled.View`
    margin-top: ${SCREEN_HEIGHT / 20}px;
    width: 100%;
    height: ${SCREEN_HEIGHT / 3.45}px;
`;
const styles = StyleSheet.create({

});

interface props {
    room: Room
}

export default ({
    room
}: props) => {
    useEffect(() => {

    }, []);
    return (
        <Container>
            <TitleContainer>
                <AntDesign name="star" size={18} color="#F04848" />
                <TitleText>{` ${room?.score}점 (후기 ${_.size(room?.review)}개)`}</TitleText>
            </TitleContainer>
            <ScoreContainer>
                <ScoreContainer2>
                    <ScoreContainer2Text>체크인</ScoreContainer2Text>
                    <ScoreContainer3>
                        <ScoreContainer3Bar1 />
                        <ScoreContainer3Bar2 rate={1} />
                        <ScoreContainer3Text>5.0</ScoreContainer3Text>
                    </ScoreContainer3>
                </ScoreContainer2>
                <ScoreContainer2>
                    <ScoreContainer2Text>정확성</ScoreContainer2Text>
                    <ScoreContainer3>
                        <ScoreContainer3Bar1 />
                        <ScoreContainer3Bar2 rate={4.9 / 5} />
                        <ScoreContainer3Text>4.9</ScoreContainer3Text>
                    </ScoreContainer3>
                </ScoreContainer2>
                <ScoreContainer2>
                    <ScoreContainer2Text>의사소통</ScoreContainer2Text>
                    <ScoreContainer3>
                        <ScoreContainer3Bar1 />
                        <ScoreContainer3Bar2 rate={4.9 / 5} />
                        <ScoreContainer3Text>4.9</ScoreContainer3Text>
                    </ScoreContainer3>
                </ScoreContainer2>
                <ScoreContainer2>
                    <ScoreContainer2Text>청결도</ScoreContainer2Text>
                    <ScoreContainer3>
                        <ScoreContainer3Bar1 />
                        <ScoreContainer3Bar2 rate={4.7 / 5} />
                        <ScoreContainer3Text>4.7</ScoreContainer3Text>
                    </ScoreContainer3>
                </ScoreContainer2>
                <ScoreContainer2>
                    <ScoreContainer2Text>위치</ScoreContainer2Text>
                    <ScoreContainer3>
                        <ScoreContainer3Bar1 />
                        <ScoreContainer3Bar2 rate={4.7 / 5} />
                        <ScoreContainer3Text>4.7</ScoreContainer3Text>
                    </ScoreContainer3>
                </ScoreContainer2>
                <ScoreContainer2>
                    <ScoreContainer2Text>가격 대비 만족도</ScoreContainer2Text>
                    <ScoreContainer3>
                        <ScoreContainer3Bar1 />
                        <ScoreContainer3Bar2 rate={4.6 / 5} />
                        <ScoreContainer3Text>4.6</ScoreContainer3Text>
                    </ScoreContainer3>
                </ScoreContainer2>
            </ScoreContainer>
            <ReviewContainer>
            {
                _.map(room?.review, (review, index) => (
                    <ReviewContainer2 key={index}>
                        <Review
                            review={review}
                        />
                    </ReviewContainer2>
                ))
            }
            </ReviewContainer>
        </Container>
    )
}