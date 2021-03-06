import React, { useMemo, useCallback, useState } from "react";
import { TouchableOpacity, Dimensions, Text, View, Alert } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { inputProps, sliderProps } from "../types";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../redux/rootReducer";
import { useUpdateLikeMutation, SelectRoomsDocument } from "../../generated/graphql";
import { toggleShowLikeModal } from "../../redux/homeSlice";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const Container: any = styled.View`
    margin-bottom: 10px;
    overflow: hidden;
    width: 100%;
    height: ${(props: any) => `${SCREEN_HEIGHT / props.factor}`}px;
    border-radius: ${(props: any) => props.isRadius ? 4 : 0}px;
`;
const Container0: any = styled.TouchableOpacity`
    margin-bottom: 10px;
    overflow: hidden;
    width: 100%;
    height: ${(props: any) => `${SCREEN_HEIGHT / props.factor}`}px;
    border-radius: ${(props: any) => props.isRadius ? 4 : 0}px;
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
const PageLabelContainer: any = styled.View`
    width: 14%;
    height: 9%;
    background-color: black;
    background: rgba(64, 64, 64, 0.5);
    position: absolute;
    right: 3%;
    bottom: 3%;
    z-index: 100;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`;
const TextContainer: any = styled.Text`
    font-size: 12px;
    font-weight: bold;
`;
const TextContainer2: any = styled.Text`
    font-size: 13px;
`;
const PageLabelText: any = styled.Text`
    font-size: 13px;
    color: white;
    font-weight: bold;
`;
const SlideImage: any = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${(props: any) => props.isRadius ? 5 : 0}px;
`;
const DotContainer: any = styled.View`
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size}px`};
  border-radius: 3px;
  background-color: ${(props: any) => props.backgroundColor};
  margin-right: 4px;
`;
const TouchableContainer: any = styled.TouchableOpacity`
    width: ${(props : any) => SCREEN_WIDTH / props.width}px;
    height: ${(props : any) => SCREEN_WIDTH / props.height}px;
    background-color: pink;
`;

const Slider: React.FC<sliderProps> = ({
    cssType = "css001",
    factor = 3,
    room,
    showLikeButton = true,
    showDots = true,
    showDescryption = true,
    showPageLabel = false,
    isRadius = true,
    destination = "RoomDetail",
    showPageLabelText = false,
}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { userId = 0 } = useSelector((state: rootState) => state.usersReducer);
    const [updateLikeMutation] = useUpdateLikeMutation();
    const isLike = useMemo(() => {
        const userList = _.map(room?.like, like => like.user);
        const isLike = _.some(userList, ['id', userId]);
        return isLike;
    }, [room, userId]);
    const [isLikeFast, setIsLikeFast] = useState(isLike);
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
    const DotComponent = useCallback(({ isActive }) => {
        return (
            <>
                {
                    showDots && (
                        <DotContainer
                            backgroundColor={isActive ? "white" : "#CECBCB"}
                            size={isActive ? "7" : "6"}
                        >
                        </DotContainer>
                    )
                }
            </>
        );
    }, [showDots]);
    const fnLike = useCallback(async () => {
        let message = "좋아요에 추가되었습니다";
        if (isLikeFast) {
            message = "좋아요가 취소되었습니다";
        }
        setIsLikeFast(!isLikeFast);
        dispatch(toggleShowLikeModal({ data: true, message }));
        setTimeout(() => {
            dispatch(toggleShowLikeModal({ data: false, message }));
        }, 3000);
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
    const renderContents = () => {
        return (
            <>
                {
                    showLikeButton && (
                        <Container7 onPress={fnLike}>
                            {
                                isLikeFast ? (
                                    <FontAwesome name="heart" size={20} color="#F04848" />
                                ) : (
                                        <FontAwesome5 name="heart" size={20} color="black" />
                                    )
                            }
                        </Container7>
                    )
                }
                {
                    showPageLabelText && (
                        <PageLabelContainer><PageLabelText>{currentPictureIndex + 1} / 6</PageLabelText></PageLabelContainer>
                    )
                }
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
                        },
                    } as any}
                    onIndexChanged={(index) => setCurrentPictureIndex(index)}
                >
                    {room?.photo.slice(0, 6).map(photo => (
                        <TouchableOpacity key={photo.id} onPress={() => navigation.navigate(destination, { id: room?.id })} activeOpacity={1}>
                            <SlideImage key={new Date()} source={{ uri: `${photo.file}`, cache: "reload" }} isRadius={isRadius} />
                        </TouchableOpacity>
                    ))}
                </Swiper>
                {
                    showDescryption && (
                        <Container3>
                            <Container2>
                                <Container4>
                                    <Container6 isRadius={isRadius}>
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
                    )
                }
            </>
        );
    };
    return (
        <Container factor={factor} isRadius={isRadius}>
            {renderContents()}
        </Container>
    );
}

export default Slider;