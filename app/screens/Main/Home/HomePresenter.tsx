import React, { useCallback, useState } from "react";
import { Dimensions, ActivityIndicator } from 'react-native';
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

interface props {
    data: SelectRoomsQuery,
    fetchMore: any,
    pageSize: number,
    skip: number,
    loading: boolean,
}

export default ({
    data,
    fetchMore,
    pageSize,
    skip,
    loading,
}: props) => {
    return (
        <Container1
            onScroll={
                (e: any) => {
                    const newSkip = _.clone(skip) + pageSize;
                    let paddingToBottom = 10;
                    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                    if (e.nativeEvent.contentOffset.y + paddingToBottom >= e.nativeEvent.contentSize.height) {
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
                        <Container5 key={index}>
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
    )
}