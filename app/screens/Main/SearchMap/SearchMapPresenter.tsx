import React, { useCallback, useState, useRef, useEffect } from "react";
import { Dimensions, ActivityIndicator, StyleSheet, Animated, Alert, View, Text } from 'react-native';
import styled from "styled-components/native";
import utils, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils";
import { Ionicons, Entypo, FontAwesome, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import Slider2 from "../../../components/Home/Slider2";

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
    border-radius: ${SCREEN_WIDTH / 50}px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const MapMarkerContainer: any = styled.View`
    width: ${SCREEN_WIDTH / 10}px;
    height: ${SCREEN_WIDTH / 10}px;
    background-color: ${(props: any) => props.color};
    border-radius: ${SCREEN_WIDTH / 20}px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const RoomSliderContainer = styled.View`
    position: absolute;
    bottom: ${SCREEN_HEIGHT / 10}px;
    width: ${SCREEN_WIDTH}px;
    height: ${SCREEN_HEIGHT / 7}px;
    z-index: 100;
`;
const styles = StyleSheet.create({
    MapContainer: {
        width: '100%',
        height: '100%',
    }
});
interface props {
    roomList: any,
    focusedRoomIndex: number,
    adjustmentRate: number,
    onScrollEndDrag: any,
}

export default ({
    roomList,
    focusedRoomIndex,
    adjustmentRate,
    onScrollEndDrag,
}: props) => {
    const navigation = useNavigation();
    return (
        <Container0>
            <TopContainer>
                <CloseContainer onPress={() => navigation.goBack()}>
                    <AntDesign name="close" size={20} color="black" />
                </CloseContainer>
                <CloseContainer>
                    <MaterialCommunityIcons name="sort-variant" size={20} color="black" />
                </CloseContainer>
            </TopContainer>
            <MapView
                style={styles.MapContainer}
                region={{
                    latitude: roomList?.selectRooms?.[focusedRoomIndex]?.lat ?? 0,
                    longitude: roomList?.selectRooms?.[focusedRoomIndex]?.lng ?? 0,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.015,
                }}
            >
                {
                    _.map(roomList?.selectRooms ?? [], (room, index) => (
                        <Marker
                            key={room.id}
                            coordinate={{
                                latitude: room?.lat ?? 0,
                                longitude: room?.lng ?? 0,
                            }}
                        >
                            <MapMarkerContainer color={_.isEqual(index, focusedRoomIndex) ? "black" : "white"}>
                                <FontAwesome name="home" size={24} color={_.isEqual(index, focusedRoomIndex) ? "white" : "black"} />
                            </MapMarkerContainer>
                        </Marker>
                    ))
                }
            </MapView>
            <RoomSliderContainer>
                <Slider2
                    cssType="002"
                    roomList={roomList}
                    adjustmentRate={adjustmentRate}
                    adjustmentRate2={0.1}
                    showLikeButton={true}
                    onScrollEndDrag={onScrollEndDrag}
                />
            </RoomSliderContainer>
        </Container0>
    )
}