import React, { useMemo, useCallback, useState } from "react";
import { TouchableOpacity, Dimensions, Text, View, Alert } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { inputProps, reviewProps } from "../types";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../redux/rootReducer";
import { useUpdateLikeMutation, SelectRoomsDocument } from "../../generated/graphql";
import { toggleShowLikeModal } from "../../redux/homeSlice";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const Container = styled.View`
    width: 100%;
    height: 100%;
`;
const CommentContainerTitleContainer = styled.View`
    width: 100%;
    height: 14%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const CommentAvatarContainer = styled.TouchableOpacity`
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const CommentAvatarContainer2 = styled.View`
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const CommentAvatarContainer2Text1 = styled.Text`
    font-size: ${SCREEN_WIDTH / 30}px;
`;
const CommentAvatarContainer2Text2 = styled.Text`
    font-size: ${SCREEN_WIDTH / 30}px;
    color: gray;
`;
const CommentContainerText = styled.Text`
    font-size: ${SCREEN_WIDTH / 18}px;
    font-weight: bold;
`;
const AvatarImage = styled.Image`
    width: ${SCREEN_WIDTH / 6}px;
    height: ${SCREEN_WIDTH / 6}px;
    border-radius: ${SCREEN_WIDTH / 12}px;
`;
const ReviewAvatarImage = styled.Image`
    width: ${SCREEN_WIDTH / 7}px;
    height: ${SCREEN_WIDTH / 7}px;
    border-radius: ${SCREEN_WIDTH / 14}px;
`;
const CommentContentContainer = styled.Text`
    width: 100%;
    height: 75%;
`;

const Review: React.FC<reviewProps> = ({
    review
}) => {
    const navigation = useNavigation();
    return (
        <Container>
            <CommentAvatarContainer onPress={() => navigation.navigate("Avatar", {uri: review?.user?.avatar ?? ''})}>
                <ReviewAvatarImage source={{ uri: `${review?.user?.avatar}` }} />
                <CommentAvatarContainer2>
                    <CommentAvatarContainer2Text1>{review?.user?.name}</CommentAvatarContainer2Text1>
                    <CommentAvatarContainer2Text2>{moment().format('YYYY년 M월')}</CommentAvatarContainer2Text2>
                </CommentAvatarContainer2>
            </CommentAvatarContainer>
            <CommentContentContainer>
                <Text>{_.map(_.range(0, 6), index => review?.review)}</Text>
            </CommentContentContainer>
        </Container>
    );
}

export default Review;