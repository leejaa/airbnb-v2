import React, { useMemo, useState, useCallback, useEffect } from "react";
import { TouchableOpacity, Dimensions, NativeSyntheticEvent, NativeScrollEvent, Image } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { inputProps, sliderProps } from "./types";
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
    cssType = "css001",
    room,
}) => {
    const [intervals, setIntervals] = useState(1);
    const [width, setWidth] = useState(0);
    const [page, setPage] = useState(0);
    const container2WidthList = useMemo(() => {
        let container2WidthList = _.fill(Array(room?.photo.length ?? 0), 1);
        if (page === 0) {
            container2WidthList[page] = 0.8;
            container2WidthList[page+1] = 1.1;
        } else if (page === ((room?.photo.length ?? 0) - 1)) {
            container2WidthList[page-1] = 1.1;
            container2WidthList[page] = 0.85;
        } else {
            container2WidthList[page-1] = 1.1;
            container2WidthList[page] = 0.8;
            container2WidthList[page+1] = 1.1;
        }
        return container2WidthList;
    }, [page]);
    const onScroll = useCallback((data) => {
        let x = data?.nativeEvent?.contentOffset?.x ?? 1;
        x = x === 0 ? 1 : x;
        const intervalWidth = Math.round(width / intervals);
        const newPage = Math.round(x / intervalWidth);
        if (newPage !== page) {
            setPage(newPage);
        }
    }, [width]);
    useEffect(() => {
        const newIntervals = room?.photo.length ?? 1;
        const newWidth = SCREEN_WIDTH * newIntervals;
        setIntervals(newIntervals);
        setWidth(newWidth);
    }, []);
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
        >
            {
                room?.photo.map((photo, index) => {
                    const newContainer2Width = width / intervals * container2WidthList[index];
                    return (
                        <Container2
                            key={photo.id}
                            container2Width={newContainer2Width}>
                            <Container3>
                                <Image1 key={photo.id} source={{uri: photo.file}} />
                            </Container3>
                        </Container2>
                    )
                })
            }
        </Container>
    );
}

export default Slider2;