import React, { useMemo, useCallback } from "react";
import { TouchableOpacity, Dimensions, Text } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { AntDesign } from '@expo/vector-icons';
import { inputProps, sliderProps } from "../types";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils";
import _ from "lodash";

const Container: any = styled.View`
    margin-bottom: 10px;
    overflow: hidden;
    width: 100%;
    height: ${props => `${SCREEN_HEIGHT / props.factor}`}px;
    border-radius: 4px;
`;
const Container2: any = styled.View`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const Container3: any = styled.View`
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
`;
const Container4: any = styled.View`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Container5: any = styled.View`
    width: 12%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const Container6: any = styled.View`
    width: 50%;
    height: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-color: black;
    border-radius: 5px;
`;
const TextContainer: any = styled.Text`
    font-size: 12px;
    font-weight: bold;
`;
const TextContainer2: any = styled.Text`
    font-size: 13px;
`;
const SlideImage: any = styled.Image`
  width: 100%;
  height: 100%;
`;
const DotContainer: any = styled.View`
  width: ${(props : any) => `${props.size}px`};
  height: ${(props : any) => `${props.size}px`};
  border-radius: 3px;
  background-color: ${(props : any) => props.backgroundColor};
  margin-right: 4px;
`;

const Slider: React.FC<sliderProps> = ({
    cssType = "css001",
    data,
    factor = 3,
    room
}) => {
    const DotComponent = useCallback(({ isActive }) => {
        return (
            <DotContainer
                backgroundColor={ isActive ? "white" : "#CECBCB" }
                size={ isActive ? "7" : "6" }
            >
            </DotContainer>
        );
    }, []);
    return (
        <Container factor={factor}>
            <Swiper
                controlsProps={{
                    PrevComponent: () => null,
                    NextComponent: () => null,
                    dotActiveStyle: {
                        backgroundColor: "white"
                    },
                    DotComponent: ({ index, isActive, onPress }) => {
                        return (
                            <>
                                {DotComponent({ isActive })}
                            </>
                        )
                    }
                } as any}
            >
                {room?.photo.map(photo => (
                    <SlideImage key={photo.id} source={{ uri: photo.file }} />
                ))}
            </Swiper>
            <Container3>
                <Container2>
                    <Container4>
                        <Container6>
                            <TextContainer>슈퍼호스트</TextContainer>
                        </Container6>
                        <TextContainer2>{room?.name}</TextContainer2>
                    </Container4>
                    <Container5>
                        <AntDesign name="star" size={15} color="rgb(255, 56, 92)" />
                        <TextContainer2>{room?.score}</TextContainer2>
                    </Container5>
                </Container2>
                <Container2>
                    <TextContainer2>{room?.description}</TextContainer2>
                </Container2>
            </Container3>
        </Container>
    );
}

export default Slider;