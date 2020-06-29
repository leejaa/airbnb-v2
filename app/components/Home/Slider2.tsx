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
}) => {
    const [intervals, setIntervals] = useState(1);
    const [width, setWidth] = useState(0);
    const [page, setPage] = useState(0);
    const [snapToIntervalNumber, setSnapToIntervalNumber] = useState(width / intervals * 0.65);
    const onScroll = useCallback((data) => {
        let x = data?.nativeEvent?.contentOffset?.x ?? 1;
        x = x === 0 ? 1 : x;
        const intervalWidth = Math.round(width / intervals);
        const newPage = Math.round(x / intervalWidth);
        if (newPage !== 0) {
            setSnapToIntervalNumber(width / intervals * 0.7);
        }
        if (newPage !== page) {
            setPage(newPage);
        }
    }, [width, page]);
    useEffect(() => {
        const newIntervals = room?.photo.length ?? 1;
        const newWidth = SCREEN_WIDTH * newIntervals;
        setIntervals(newIntervals);
        setWidth(newWidth);
    }, []);
    const Slider001 = useMemo(() => {
        return (
            <Container
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                decelerationRate={"fast"}
                contentContainerStyle={{ width: `${100 * intervals}%` }}
                // onContentSizeChange={(w, h) => init(w)}
                // onScrollEndDrag={onScrollEndDrag}
                onScroll={onScroll}
                scrollEventThrottle={200}
                snapToInterval={snapToIntervalNumber}
                // snapToOffsets={[width / intervals * 0.8, width / intervals * 0.8]}
            >
                {
                    room?.photo.map((photo, index) => {
                        const newContainer2Width = width / intervals * 0.7;
                        return (
                            <Container2
                                key={photo.id}
                                container2Width={newContainer2Width}>
                                <Container3>
                                    <Image1 key={photo.id} source={{ uri: photo.file }} />
                                </Container3>
                            </Container2>
                        )
                    })
                }
            </Container>
        );
    }, [room, intervals, width, page, snapToIntervalNumber]);
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