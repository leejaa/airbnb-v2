import React, { useCallback, useState, useRef, useEffect } from "react";
import { Dimensions, ActivityIndicator, StyleSheet, Animated } from 'react-native';
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
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../redux/rootReducer";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getPlaceInfoList } from "../../../redux/homeSlice";

const Container0 = styled.View`
`;
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
const Container7 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 12}px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    z-index: 100;
`;
const Text1 = styled.Text`
    font-weight: 600;
    font-size: ${SCREEN_WIDTH / 20}px;
`;
const LoadingContainer = styled.View`
    width: ${SCREEN_WIDTH}px;
    height: ${SCREEN_HEIGHT}px;
`;
const LoadingContainer2 = styled.View`
  position: absolute;
  top: 40%;
  left: 40%;
`;

const styles = StyleSheet.create({
    Container8: {
        width: '70%',
        height: SCREEN_HEIGHT / 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        zIndex: 100,
        flex: 1,
        position: 'absolute',
        left: SCREEN_WIDTH / 7,
        borderRadius: 10,
    }
});

interface props {
    data: SelectRoomsQuery,
    fetchMore: any,
    pageSize: number,
    skip: number,
    loading: boolean,
    globalLoading: boolean,
}

export default ({
    data,
    fetchMore,
    pageSize,
    skip,
    loading,
    globalLoading,
}: props) => {
    const dispatch = useDispatch();
    const { showLikeModal = false, modalMessage = "", roomList = [], searchedPlaceWord = "", limit = 5 } = useSelector((state: rootState) => state.homeReducer);
    const animateRef = useRef(new Animated.Value(-100)).current;
    useEffect(() => {
        if (showLikeModal) {
            Animated.timing(animateRef, {
                toValue: SCREEN_HEIGHT / 20,
                duration: 600,
            }).start();
        } else {
            Animated.timing(animateRef, {
                toValue: -100,
                duration: 600,
            }).start();
        }
    }, [showLikeModal]);
    if (_.isEmpty(data) || globalLoading) {
        return (
            <Container0>
                <Header />
                <LoadingContainer>
                    <LoadingContainer2>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </LoadingContainer2>
                </LoadingContainer>
            </Container0>
        );
    }
    return (
        <Container0>
            <Container1
                onScroll={
                    (e: any) => {
                        const newSkip = _.clone(skip) + pageSize;
                        let paddingToBottom = 10;
                        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                        if (e.nativeEvent.contentOffset.y + paddingToBottom >= e.nativeEvent.contentSize.height) {
                            if (_.isEmpty(roomList)) {
                                fetchMore({
                                    variables: {
                                        first: pageSize,
                                        skip: newSkip,
                                    },
                                    updateQuery: (prev: { selectRooms: any; }, { fetchMoreResult }: any) => {
                                        return Object.assign({}, prev, {
                                            selectRooms: [...prev.selectRooms, ...fetchMoreResult.selectRooms]
                                        });
                                    }
                                });
                            } else {
                                // getPlaceInfoList({
                                //     searchedPlaceWord,
                                //     dispatch,
                                //     limit,
                                // });
                            }
                        }
                    }
                }
                scrollEventThrottle={500}
            >
                <Header />
                <ModalComponent />
                <Container6>
                    {
                        data.selectRooms.map((room, index) => (
                            <Container5 key={room.id}>
                                <Slider
                                    cssType="css001"
                                    room={room as any}
                                >
                                </Slider>
                            </Container5>
                        ))
                    }
                    {
                        loading && (
                            <Container7>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </Container7>
                        )
                    }
                </Container6>
            </Container1>
            <Animated.View style={[styles.Container8, { bottom: animateRef }]}>
                <Text1>{modalMessage}</Text1>
            </Animated.View>
        </Container0>
    )
}