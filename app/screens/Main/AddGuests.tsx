import React, { useCallback } from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/rootReducer";
import Calendar from "../../components/Common/Calendar";

const Container1 = styled.View`
    width: 100%;
`;
interface props {
}

export default ({
}: props) => {
    return (
        <Container1>
            
        </Container1>
    )
}