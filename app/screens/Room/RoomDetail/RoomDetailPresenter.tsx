import React, { useCallback, useState, useRef, useEffect } from "react";
import { Dimensions, ActivityIndicator, StyleSheet, Animated, Alert } from 'react-native';
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
import { useNavigation } from "@react-navigation/native";

const Container0 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT}px;
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
    top: ${SCREEN_HEIGHT / 50}px;
    padding-left: ${SCREEN_WIDTH / 60}px;
    padding-right: ${SCREEN_WIDTH / 60}px;
    position: absolute;
    z-index: 100;
`;
const Container3: any = styled.TouchableOpacity`
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
    height: ${SCREEN_HEIGHT / 3}px;
`;
const ContentContainer = styled.View`
    width: 100%;
    padding: ${SCREEN_WIDTH / 18}px;
`;
const TitleContainer = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 8}px;
`;
const TitleContainer2 = styled.View`
    width: 100%;
    height: 50%;
`;
const TitleContainer3 = styled.View`
    width: 35%;
    height: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const TitleContainer4 = styled.View`
    width: 60%;
    height: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const TitleText = styled.Text`
    font-size: ${SCREEN_WIDTH / 12}px;
    font-weight: bold;
`;
const FooterContainer = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 5.5}px;
    position: absolute;
    z-index: 100;
    bottom: 0;
    background-color: white;
`;
const HrContainer = styled.View`
    margin-top: ${SCREEN_HEIGHT / 25}px;
    width: 20%;
    border-width: 0.5px;
    border-color: #D3D1D1;
`;
const SecondContainer = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 7}px;
    border-bottom-width: 1px;
    border-color: #D3D1D1;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const SecondContainer2 = styled.View`
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-width: 1px;
`;
const SecondContainer3 = styled.View`
    width: 100%;
    height: 30%;
    border-width: 1px;
`;
const SecondContainer4 = styled.View`
    width: 50%;
    height: 100%;
    border-width: 1px;
`;
const AvatarContainer = styled.View`
    width: ${SCREEN_WIDTH / 6}px;
    height: ${SCREEN_WIDTH / 6}px;
    border-radius: ${SCREEN_WIDTH / 12}px;
    border-width: 1px;
`;
const AvatarImage = styled.Image`
    width: ${SCREEN_WIDTH / 6}px;
    height: ${SCREEN_WIDTH / 6}px;
    border-radius: ${SCREEN_WIDTH / 12}px;
`;

interface props {
    room: Room
}

export default ({
    room
}: props) => {
    const navigation = useNavigation();
    return (
        <Container0>
            <Container>
                <Container2>
                    <Container3 onPress={() => navigation.goBack()}>
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
                        showDots={false}
                        showPageLabel={true}
                        isRadius={false}
                        showPageLabelText={true}
                    />
                </Container5>
                <ContentContainer>
                    <TitleContainer>
                        <TitleContainer2>
                            <TitleText>{room.name}</TitleText>
                        </TitleContainer2>
                        <TitleContainer3>
                            <AntDesign name="star" size={10} color="#F04848" />
                            <Text>{`${room.score}(${room.price})`}</Text>
                        </TitleContainer3>
                        <TitleContainer4><Text>{room.address}</Text></TitleContainer4>
                    </TitleContainer>
                    <HrContainer></HrContainer>
                    <SecondContainer>
                        <SecondContainer2>
                            <SecondContainer4></SecondContainer4>
                            <AvatarContainer><AvatarImage source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}></AvatarImage></AvatarContainer>
                        </SecondContainer2>
                        <SecondContainer3>

                        </SecondContainer3>
                    </SecondContainer>
                </ContentContainer>
            </Container>
            <FooterContainer>

            </FooterContainer>
        </Container0>
    )
}