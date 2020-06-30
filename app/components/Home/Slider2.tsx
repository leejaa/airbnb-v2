import React, { useMemo, useState, useCallback, useEffect } from "react";
import { TouchableOpacity, Dimensions, NativeSyntheticEvent, NativeScrollEvent, Image, View } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { inputProps, sliderProps } from "../types";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils";
import _ from "lodash";

const Container = styled.ScrollView`
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
`;
const Container2: any = styled.View`
    width: ${(props: any) => props.container2Width}px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
const Container3: any = styled.View`
    width: 95%;
    height: 100%;
`;
const Image1: any = styled.Image`
    width: 100%;
    height: 100%;
`;

const Slider2: React.FC<sliderProps> = ({
    cssType = "001",
    room,
    adjustmentRate = 0.7,
    adjustmentRate2 = 0.05,
}) => {
    const [snapToIntervalNumber, setSnapToIntervalNumber] = useState(SCREEN_WIDTH * adjustmentRate);
    const onScroll = useCallback((data) => {
        // let x = data?.nativeEvent?.contentOffset?.x ?? 1;
        // x = x === 0 ? 1 : x;
        // const intervalWidth = Math.round(SCREEN_WIDTH * adjustmentRate);
        // const page = Math.abs(Math.round(x / intervalWidth));
    }, [snapToIntervalNumber, adjustmentRate]);
    const contentContainerStyle = useMemo(() => {
        return { width: SCREEN_WIDTH * adjustmentRate * (_.size(room?.photo) - 1) + SCREEN_WIDTH * (adjustmentRate + adjustmentRate2) * 1 };
    }, [adjustmentRate, adjustmentRate2, room]);
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
                onScrollEndDrag={onScroll}
                scrollEventThrottle={200}
                snapToInterval={snapToIntervalNumber}
            >
                {
                    room?.photo.map((photo, index) => {
                        return (
                            <Container2
                                key={photo.id}
                                container2Width={_.isEqual(index, 0) ? SCREEN_WIDTH * (adjustmentRate + adjustmentRate2) : SCREEN_WIDTH * adjustmentRate}>
                                <Container3>
                                    <Image1 key={photo.id} source={{ uri: photo.file }} />
                                </Container3>
                            </Container2>
                        )
                    })
                }
            </Container>
        );
    }, [room, snapToIntervalNumber, adjustmentRate, adjustmentRate2]);
    let Slider2;
    switch (cssType) {
        case "001":
            Slider2 = _.clone(Slider001);
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