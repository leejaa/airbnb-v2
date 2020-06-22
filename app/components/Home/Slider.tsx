import React, { useMemo, useCallback, useState } from "react";
import { TouchableOpacity, Dimensions, Text } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { inputProps, sliderProps } from "../types";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils";
import _ from "lodash";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/rootReducer";
import { useUpdateLikeMutation, SelectRoomsDocument } from "../../generated/graphql";

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
const Container7: any = styled.TouchableOpacity`
    width: 10%;
    height: 12%;
    background-color: white;
    border-radius: 50px;
    position: absolute;
    right: 3%;
    top: 3%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
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
  border-radius: 5px;
`;
const DotContainer: any = styled.View`
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size}px`};
  border-radius: 3px;
  background-color: ${(props: any) => props.backgroundColor};
  margin-right: 4px;
`;

const Slider: React.FC<sliderProps> = ({
    cssType = "css001",
    data,
    factor = 3,
    room
}) => {
    const { userId = 0 } = useSelector((state: rootState) => state.usersReducer);
    const [updateLikeMutation] = useUpdateLikeMutation();
    const isLike = useMemo(() => {
        const userList = _.map(room?.like, like => like.user);
        const isLike = _.some(userList, ['id', userId]);
        return isLike;
    }, [room, userId]);
    const [isLikeFast, setIsLikeFast] = useState(isLike);
    const DotComponent = useCallback(({ isActive }) => {
        return (
            <DotContainer
                backgroundColor={isActive ? "white" : "#CECBCB"}
                size={isActive ? "7" : "6"}
            >
            </DotContainer>
        );
    }, []);
    const fnLike = useCallback(async () => {
        let message = "좋아요에 추가되었습니다";
        if (isLikeFast) {
            message = "좋아요가 취소되었습니다";
        }
        setIsLikeFast(!isLikeFast);
        // dispatch(toggleLikeModal({ data: true, message }));
        // setTimeout(() => {
        //     dispatch(toggleLikeModal({ data: false }));
        // }, 3000);
        try {
            const result = await updateLikeMutation({
                variables: {
                    roomId: parseInt(room?.id ?? "", 10)
                },
                refetchQueries: [{
                    query: SelectRoomsDocument
                }]
            });
        } catch (error) {
            console.log('error', error);
        } finally {
        }
    }, [room, isLikeFast]);
    return (
        <Container factor={factor}>
            <Container7 onPress={fnLike}>
                {
                    isLikeFast ? (
                        <FontAwesome name="heart" size={20} color="#F04848" />
                    ) : (
                            <FontAwesome5 name="heart" size={20} color="black" />
                        )
                }
            </Container7>
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
                {room?.photo.slice(0, 6).map(photo => (
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