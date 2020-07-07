import React, { useMemo, useState, useCallback, useEffect } from "react";
import { TouchableOpacity, Dimensions, NativeSyntheticEvent, NativeScrollEvent, Image, View } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { inputProps, sliderProps } from "../types";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils";
import _ from "lodash";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Container = styled.ScrollView`
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
`;
const Container2: any = styled.TouchableOpacity`
    width: ${(props: any) => props.container2Width}px;
    height: 100%;
    display: flex;
    align-items: center;
`;
const Container3: any = styled.View`
    width: 95%;
    height: 75%;
`;
const Container4: any = styled.View`
    width: 95%;
    height: 25%;
    display: flex;
    justify-content: center;
`;
const CardContainer: any = styled.View`
    width: 90%;
    height: 100%;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
`;
const CardContainerLeft = styled.View`
    width: 30%;
    height: 100%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
`;
const CardContainerRight = styled.View`
    width: 70%;
    height: 100%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding-top: 2%;
    padding-bottom: 2%;
`;
const CardContainerRight1 = styled.View`
    width: 100%;
    height: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const CardContainerRight1Label = styled.View`
    width: 30%;
    height: 80%;
    border-width: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${SCREEN_WIDTH / 60}px;
`;
const CardContainerRight1LabelText = styled.Text`
    font-size: ${SCREEN_WIDTH / 40}px;
`;
const CardContainerRight1Text = styled.Text`
    font-size: ${SCREEN_WIDTH / 35}px;
    color: gray;
`;
const CardContainerRight2 = styled.View`
    width: 100%;
    height: 50%;
`;
const CardContainerRight2Text = styled.Text`
    font-size: ${SCREEN_WIDTH / 33}px;
`;
const CardContainerRight3 = styled.View`
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const CardContainerRight3View = styled.View`
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;
const CardContainerRight3Text1 = styled.Text`
    font-size: ${SCREEN_WIDTH / 35}px;
`;
const CardContainerRight3Text2 = styled.Text`
    font-size: ${SCREEN_WIDTH / 35}px;
    color: gray;
`;

const Container4Text: any = styled.Text`
    color: #8E8C8C;
`;
const Container4Text2: any = styled.Text`
`;
const Image1: any = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 7px;
`;
const Image2: any = styled.Image`
    width: 100%;
    height: 100%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
`;
const HeartContainer: any = styled.TouchableOpacity`
    width: ${SCREEN_WIDTH / 18}px;
    height: ${SCREEN_WIDTH / 18}px;
    background-color: white;
    border-radius: ${SCREEN_WIDTH / 36}px;
    position: absolute;
    right: 7%;
    top: 5%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Slider2: React.FC<sliderProps> = ({
    cssType = "001",
    room,
    adjustmentRate = 0.7,
    adjustmentRate2 = 0.05,
    showLikeButton = false,
    roomList = [],
    onScrollEndDrag = () => console.log('onScrollEndDrag'),
    destination = "RoomDetail",
}) => {
    const navigation = useNavigation();
    const snapToIntervalNumber = useMemo(() => {
        return SCREEN_WIDTH * adjustmentRate;
    }, [adjustmentRate]);
    const contentContainerStyle = useMemo(() => {
        return { width: SCREEN_WIDTH * adjustmentRate * (_.size(room?.photo) - 1) + SCREEN_WIDTH * (adjustmentRate + adjustmentRate2) * 1 };
    }, [adjustmentRate, adjustmentRate2, room]);
    const contentContainerStyle2 = useMemo(() => {
        return { width: SCREEN_WIDTH * adjustmentRate * (_.size(roomList?.selectRooms) - 1) + SCREEN_WIDTH * (adjustmentRate + adjustmentRate2) * 1 };
    }, [adjustmentRate, adjustmentRate2, roomList]);
    useEffect(() => {

    }, []);
    const Slider001 = useMemo(() => {
        return (
            <Container
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                decelerationRate={"fast"}
                contentContainerStyle={contentContainerStyle}
                scrollEventThrottle={200}
                snapToInterval={snapToIntervalNumber}
                disableIntervalMomentum={true}
            >
                {
                    room?.photo.map((photo, index) => {
                        return (
                            <Container2
                                key={photo.id}
                                container2Width={_.isEqual(index, 0) ? SCREEN_WIDTH * (adjustmentRate + adjustmentRate2) : SCREEN_WIDTH * adjustmentRate}
                            >
                                <Container3>
                                    {
                                        showLikeButton && (
                                            <HeartContainer>
                                                <FontAwesome5 name="heart" size={15} color="black" />
                                            </HeartContainer>
                                        )
                                    }
                                    <Image1 key={photo.id} source={{ uri: photo.file }} />
                                </Container3>
                                <Container4>
                                    <Container4Text>{room?.address}</Container4Text>
                                    <Container4Text2>{room?.description}</Container4Text2>
                                </Container4>
                            </Container2>
                        )
                    })
                }
            </Container>
        );
    }, [room, snapToIntervalNumber, adjustmentRate, adjustmentRate2]);
    const Slider002 = useMemo(() => {
        return (
            <Container
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                decelerationRate={"fast"}
                contentContainerStyle={contentContainerStyle2}
                onScrollEndDrag={onScrollEndDrag}
                scrollEventThrottle={200}
                snapToInterval={snapToIntervalNumber}
                disableIntervalMomentum={true}
            >
                {
                    !_.isEmpty(roomList?.selectRooms ?? []) && roomList?.selectRooms.map((room: any, index: any) => {
                        return (
                            <Container2
                                key={room.id}
                                container2Width={_.isEqual(index, 0) ? SCREEN_WIDTH * (adjustmentRate + adjustmentRate2) : SCREEN_WIDTH * adjustmentRate}
                                onPress={() => navigation.navigate(destination, { id: room?.id })}
                            >
                                <CardContainer>
                                    <CardContainerLeft>
                                        <Image2 key={room.id} source={{ uri: room?.photo?.[0]?.file }} />
                                    </CardContainerLeft>
                                    <CardContainerRight>
                                        <CardContainerRight1>
                                            <CardContainerRight1Label>
                                                <CardContainerRight1LabelText>슈퍼호스트</CardContainerRight1LabelText>
                                            </CardContainerRight1Label>
                                            <CardContainerRight1Text>{room?.name ?? ""}</CardContainerRight1Text>
                                        </CardContainerRight1>
                                        <CardContainerRight2>
                                            <CardContainerRight2Text>{room?.address ?? ""}</CardContainerRight2Text>
                                        </CardContainerRight2>
                                        <CardContainerRight3>
                                            <CardContainerRight3View>
                                                <AntDesign name="star" size={12} color="rgb(255, 56, 92)" />
                                                <CardContainerRight3Text1>{room?.score ?? 0}</CardContainerRight3Text1>
                                                <CardContainerRight3Text2>{`(${room?.price ?? 0})`}</CardContainerRight3Text2>
                                            </CardContainerRight3View>
                                        </CardContainerRight3>
                                    </CardContainerRight>
                                </CardContainer>
                                <HeartContainer>
                                    <FontAwesome5 name="heart" size={15} color="black" />
                                </HeartContainer>
                            </Container2>
                        )
                    })
                }
            </Container>
        );
    }, [room, snapToIntervalNumber, adjustmentRate, adjustmentRate2, roomList]);
    let Slider2;
    switch (cssType) {
        case "001":
            Slider2 = _.clone(Slider001);
            break;
        case "002":
            Slider2 = _.clone(Slider002);
            break;
        default:
            Slider2 = _.clone(Slider001);
            break;
    }
    return (
        <>
            {Slider2}
        </>
    );
}

export default Slider2;