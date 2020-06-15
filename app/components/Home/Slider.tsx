import React, { useMemo } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { inputProps, sliderProps } from "./types";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils";
import _ from "lodash";

const Container: any = styled.View`
    margin-bottom: 10px;
    overflow: hidden;
    width: 100%;
    height: ${props => `${SCREEN_HEIGHT / props.factor}`}px;
    border-radius: 4px;
`;

const SlideImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Slider: React.FC<sliderProps> = ({
    cssType = "css001",
    data,
    factor = 4,
    room
}) => {
    return (
        <Container factor={factor}>
            <Swiper
                controlsProps={{
                    PrevComponent: () => null,
                    NextComponent: () => null,
                    dotActiveStyle: {
                        backgroundColor: "white"
                    }
                } as any}
            >
                {room?.photo.map(photo => (
                    <SlideImage key={photo.id} source={{ uri: photo.file }} />
                ))}
            </Swiper>
        </Container>
    );
}

export default Slider;