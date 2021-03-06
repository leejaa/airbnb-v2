import React, { useState, useEffect, useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Keyboard, ActivityIndicator, View } from "react-native";
import ReviewPresenter from "./ReviewPresenter";
import { useSelectPhotoQuery, useSelectRoomsQuery, useSelectRoomQuery } from "../../../generated/graphql";
import _ from "lodash";
import { useSelector } from "react-redux";
import { rootState } from "../../../redux/rootReducer";

interface props {
}
export default ({ }: props) => {
    const { searchReviewText = "" } = useSelector((state: rootState) => state.homeReducer);
    const route: any = useRoute();
    const { data, loading } = useSelectRoomQuery({
        variables: {
            id: parseInt(route?.params?.id ?? 0),
        }
    });
    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    const filteredReview = useMemo(() => {
        const filteredReview = _.isEqual(searchReviewText, '') ? data?.selectRoom?.review : _.filter(data?.selectRoom?.review, (o) => _.includes(o.review, searchReviewText));
        return filteredReview;
    }, [searchReviewText]);
    return (
        <ReviewPresenter
            room={data?.selectRoom as any}
            filteredReview={filteredReview as any}
        />
    );
};