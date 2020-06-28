import React, { useCallback, useState, useRef, useEffect } from "react";
import { Dimensions, ActivityIndicator, StyleSheet, Animated, Alert, View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import styled from "styled-components/native";
import { Ionicons, AntDesign, EvilIcons, MaterialCommunityIcons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils";
import { useRoute, useNavigation } from "@react-navigation/native";
import BackBtn from "../../components/Auth/BackBtn";

const Container: any = styled.View`
    width: ${SCREEN_WIDTH}px;
    height: ${SCREEN_HEIGHT}px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CloseContainer = styled.TouchableOpacity`
    width: 100%;
    height: 7%;
    background-color: white;
    position: absolute;
    top: 0;
    justify-content: center;
    background-color: black;
`;
const ReviewAvatarImage = styled.Image`
    width: 100%;
    height: 70%;
`;

interface props {
}

export default ({
}: props) => {
    const route: any = useRoute();
    const navigation = useNavigation();
    return (
        <Container>
            <CloseContainer onPress={() => navigation.goBack()}>
                <BackBtn cssType="002" color="white" size={30} />
            </CloseContainer>
            <ReviewAvatarImage source={{ uri: route?.params?.uri ?? '' }} />
        </Container>
    )
}