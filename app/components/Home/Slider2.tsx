import React, { useMemo } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { inputProps, sliderProps } from "./types";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils";
import _ from "lodash";

const Container = styled.ScrollView`
    padding: 20px;
    height: 100%;
`;
const Container2 = styled.View`
    border-width: 1px;
    border-color: black;
    width: ${SCREEN_WIDTH / 1.2}px;
    height: 95%;
    margin-right: 20px;
`;

const Slider2: React.FC<sliderProps> = ({
    cssType = "css001",
    data,
}) => {
    return (
        <Container
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            snapToInterval={8}
            snapToAlignment={"start"}
        >
            <Container2>

            </Container2>
            <Container2>

            </Container2>
            <Container2>

            </Container2>
        </Container>
    );
}

export default Slider2;