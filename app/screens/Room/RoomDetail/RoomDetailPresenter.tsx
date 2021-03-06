import React, { useCallback, useState, useRef, useEffect } from "react";
import { Dimensions, ActivityIndicator, StyleSheet, Animated, Alert, View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import styled from "styled-components/native";
import Input from "../../../components/Home/Input";
import utils, { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils";
import { Ionicons, AntDesign, EvilIcons, MaterialCommunityIcons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import Slider from "../../../components/Home/Slider";
import Slider2 from "../../../components/Home/Slider2";
import { SelectRoomsQuery, Room } from "../../../generated/graphql";
import Header from "../../../components/Common/Header";
import ModalComponent from "../../../components/Common/Modal";
import _ from "lodash";
import { useSelector } from "react-redux";
import { rootState } from "../../../redux/rootReducer";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const Container0 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT}px;
`;
const Container = styled.ScrollView`
    width: 100%;
`;
const Container2 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 16}px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    top: ${SCREEN_HEIGHT / 50}px;
    padding-left: ${SCREEN_WIDTH / 60}px;
    padding-right: ${SCREEN_WIDTH / 60}px;
    position: absolute;
    z-index: 100;
`;
const Container3: any = styled.TouchableOpacity`
    width: ${SCREEN_WIDTH / 10}px;
    height: ${SCREEN_WIDTH / 10}px;
    border-radius: ${SCREEN_WIDTH / 20}px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Container4 = styled.View`
    width: ${SCREEN_WIDTH / 4.3}px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Container5 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 3}px;
`;
const ContentContainer = styled.View`
    width: 100%;
    padding: ${SCREEN_WIDTH / 18}px;
`;
const ContentContainer2 = styled.View`
    width: 100%;
`;
const TitleContainer = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 8}px;
`;
const TitleContainer2 = styled.View`
    width: 100%;
    height: 50%;
`;
const TitleContainer3 = styled.View`
    width: 35%;
    height: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const TitleContainer4 = styled.View`
    width: 60%;
    height: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const TitleText = styled.Text`
    font-size: ${SCREEN_WIDTH / 12}px;
    font-weight: bold;
`;
const BottomContentContainer = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 5.5}px;
`;
const FooterContainer = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 8.5}px;
    position: absolute;
    z-index: 100;
    bottom: 0;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const FooterContainer2 = styled.View`
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const FooterContainer2Text = styled.Text`
    font-weight: bold;
`;
const FooterContainer3 = styled.View`
    width: 50%;
    height: 60%;
    border-radius: 10px;
    background-color: #F04848;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const FooterContainer3Text = styled.Text`
    color: white;
`;
const HrContainer = styled.View`
    margin-top: ${SCREEN_HEIGHT / 25}px;
    width: 20%;
    border-width: 0.5px;
    border-color: #D3D1D1;
`;
const SecondContainer = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 7}px;
    border-bottom-width: 1px;
    border-color: #D3D1D1;
    display: flex;
    justify-content: center;
`;
const SecondContainer2 = styled.View`
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const SecondContainer3 = styled.View`
    width: 80%;
    height: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const SecondContainer4 = styled.View`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
`;
const SecondContainer4Text = styled.Text`
    font-size: ${SCREEN_WIDTH / 20}px;
`;
const SecondContainer4Text2 = styled.Text`
    font-size: ${SCREEN_WIDTH / 30}px;
    font-weight: bold;
`;
const ThirdContainer = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 4}px;
    border-bottom-width: 1px;
    border-color: #D3D1D1;
    margin-top: ${SCREEN_HEIGHT / 20}px;
`;
const FourthContainer = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 2.5}px;
    border-bottom-width: 1px;
    border-color: #D3D1D1;
    margin-top: ${SCREEN_HEIGHT / 20}px;
    display: flex;

`;
const FourthContainerTitleText = styled.Text`
    font-size: ${SCREEN_WIDTH / 15}px;
    font-weight: 500;
`;
const FourthContainer2 = styled.View`
    width: 100%;
    height: 90%;
    display: flex;
`;
const FourthContainer3 = styled.View`
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const FourthContainer3Text = styled.Text`
    font-size: ${SCREEN_WIDTH / 26}px;
`;
const LocationContainer = styled.View`
    margin-top: ${SCREEN_HEIGHT / 20}px;
    width: 100%;
    height: ${SCREEN_HEIGHT / 2}px;
    border-bottom-width: 1px;
    border-color: #D3D1D1;
`;
const LocationContainerText = styled.Text`
    font-size: ${SCREEN_WIDTH / 15}px;
    font-weight: 500;
`;
const CommentContainer = styled.View`
    margin-top: ${SCREEN_HEIGHT / 25}px;
    width: 100%;
    height: ${SCREEN_HEIGHT / 2.4}px;
    border-bottom-width: 1px;
    border-color: #D3D1D1;
    display: flex;
`;
const CommentContainerTitleContainer = styled.View`
    width: 100%;
    height: 14%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const CommentAvatarContainer = styled.View`
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const CommentAvatarContainer2 = styled.View`
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const CommentAvatarContainer2Text1 = styled.Text`
    font-size: ${SCREEN_WIDTH / 30}px;
`;
const CommentAvatarContainer2Text2 = styled.Text`
    font-size: ${SCREEN_WIDTH / 30}px;
    color: gray;
`;
const CommentContainerText = styled.Text`
    font-size: ${SCREEN_WIDTH / 18}px;
    font-weight: bold;
`;
const AvatarImage = styled.Image`
    width: ${SCREEN_WIDTH / 6}px;
    height: ${SCREEN_WIDTH / 6}px;
    border-radius: ${SCREEN_WIDTH / 12}px;
`;
const ReviewAvatarImage = styled.Image`
    width: ${SCREEN_WIDTH / 7}px;
    height: ${SCREEN_WIDTH / 7}px;
    border-radius: ${SCREEN_WIDTH / 14}px;
`;
const CommentContentContainer = styled.Text`
    width: 100%;
    height: 40%;
`;
const MoreCommentButtonContainer = styled.TouchableOpacity`
    width: 100%;
    height: 20%;
    border-width: 1px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const MapMarkerContainer = styled.View`
    width: ${SCREEN_WIDTH / 10}px;
    height: ${SCREEN_WIDTH / 10}px;
    background-color: black;
    border-radius: ${SCREEN_WIDTH / 20}px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const MoreRoomContainer = styled.View`
    margin-top: ${SCREEN_HEIGHT / 25}px;
    width: 100%;
    height: ${SCREEN_HEIGHT / 3}px;
`;
const MoreRoomTitleContainer = styled.View`
    width: 100%;
    height: 10%;
    padding-left: ${SCREEN_WIDTH / 20}px;
`;
const MoreRoomContainerTitleText = styled.Text`
    font-size: ${SCREEN_WIDTH / 17}px;
    font-weight: 500;
`;
const MoreRoomContainer2 = styled.View`
    margin-top: ${SCREEN_HEIGHT / 30}px;
    width: 100%;
    height: 90%;
`;
const NearEnjoyContainer = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 2.5}px;
    margin-top: ${SCREEN_HEIGHT / 20}px;
`;
const NearEnjoyTitleContainer = styled.View`
    width: 100%;
    height: 10%;
    padding-left: ${SCREEN_WIDTH / 20}px;
`;
const NearEnjoyContainerTitleText = styled.Text`
    font-size: ${SCREEN_WIDTH / 17}px;
    font-weight: 500;
`;
const NearEnjoyContainer2 = styled.View`
    margin-top: ${SCREEN_HEIGHT / 50}px;
    width: 100%;
    height: 90%;
`;
const styles = StyleSheet.create({
    MapContainer: {
        width: '100%',
        height: '75%',
        marginTop: SCREEN_HEIGHT / 30,
    }
});

interface props {
    room: Room
}

export default ({
    room
}: props) => {
    const navigation = useNavigation();
    const [location, setLocation] = useState<any>(null);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
            }
            let location: any = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);
    return (
        <Container0>
            <Container>
                <Container2>
                    <Container3 onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={18} color="black" />
                    </Container3>
                    <Container4>
                        <Container3>
                            <EvilIcons name="share-apple" size={22} color="black" />
                        </Container3>
                        <Container3>
                            <EvilIcons name="heart" size={22} color="black" />
                        </Container3>
                    </Container4>
                </Container2>
                <Container5>
                    <Slider
                        room={room as any}
                        showLikeButton={false}
                        showDescryption={false}
                        showDots={false}
                        showPageLabel={true}
                        isRadius={false}
                        showPageLabelText={true}
                    />
                </Container5>
                <ContentContainer>
                    <TitleContainer>
                        <TitleContainer2>
                            <TitleText>{room.name}</TitleText>
                        </TitleContainer2>
                        <TitleContainer3>
                            <AntDesign name="star" size={10} color="#F04848" />
                            <Text>{`${room.score}(${room.price})`}</Text>
                        </TitleContainer3>
                        <TitleContainer4><Text>{room.address}</Text></TitleContainer4>
                    </TitleContainer>
                    <HrContainer></HrContainer>
                    <SecondContainer>
                        <SecondContainer2>
                            <SecondContainer4>
                                <SecondContainer4Text>게스트용 별채 전체</SecondContainer4Text>
                                <SecondContainer4Text2>호스트: {room?.user?.name}님</SecondContainer4Text2>
                            </SecondContainer4>
                            <AvatarImage source={{ uri: `${room.user.avatar}` }}></AvatarImage>
                        </SecondContainer2>
                        <SecondContainer3>
                            <Text>인원 5명</Text>
                            <Text>침실 2개</Text>
                            <Text>침대 2개</Text>
                            <Text>욕실 1개</Text>
                        </SecondContainer3>
                    </SecondContainer>
                    <ThirdContainer>
                        {
                            _.map(_.range(0, 8), (item, index) => <Text key={index}>{room?.description}</Text>)
                        }
                    </ThirdContainer>
                    <FourthContainer>
                        <FourthContainerTitleText>편의시설</FourthContainerTitleText>
                        <FourthContainer2>
                            <FourthContainer3>
                                <FourthContainer3Text>헤어드라이어</FourthContainer3Text>
                                <MaterialCommunityIcons name="tumble-dryer" size={23} color="black" />
                            </FourthContainer3>
                            <FourthContainer3>
                                <FourthContainer3Text>난방</FourthContainer3Text>
                                <Ionicons name="ios-bonfire" size={23} color="black" />
                            </FourthContainer3>
                            <FourthContainer3>
                                <FourthContainer3Text>화재경보기</FourthContainer3Text>
                                <MaterialCommunityIcons name="fire-extinguisher" size={23} color="black" />
                            </FourthContainer3>
                            <FourthContainer3>
                                <FourthContainer3Text>옷걸이</FourthContainer3Text>
                                <AntDesign name="skin" size={23} color="black" />
                            </FourthContainer3>
                            <FourthContainer3>
                                <FourthContainer3Text>필수품목</FourthContainer3Text>
                                <Entypo name="briefcase" size={23} color="black" />
                            </FourthContainer3>
                        </FourthContainer2>
                    </FourthContainer>
                    <LocationContainer>
                        <LocationContainerText>위치</LocationContainerText>
                        <MapView
                            style={styles.MapContainer}
                            region={{
                                latitude: location?.coords?.latitude ?? 0,
                                longitude: location?.coords?.longitude ?? 0,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.006,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: location?.coords?.latitude ?? 0,
                                    longitude: location?.coords?.longitude ?? 0,
                                }}
                            >
                                <MapMarkerContainer>
                                    <FontAwesome5 name="home" size={24} color="white" />
                                </MapMarkerContainer>
                            </Marker>
                        </MapView>
                    </LocationContainer>
                    <CommentContainer>
                        <CommentContainerTitleContainer>
                            <AntDesign name="star" size={18} color="#F04848" />
                            <CommentContainerText>{`${room.score}점(후기 159개)`}</CommentContainerText>
                        </CommentContainerTitleContainer>
                        <CommentAvatarContainer>
                            <ReviewAvatarImage source={{ uri: `${room?.review?.[0].user?.avatar}` }}></ReviewAvatarImage>
                            <CommentAvatarContainer2>
                                <CommentAvatarContainer2Text1>{room?.review?.[0].user?.name}</CommentAvatarContainer2Text1>
                                <CommentAvatarContainer2Text2>{moment().format('YYYY년 M월')}</CommentAvatarContainer2Text2>
                            </CommentAvatarContainer2>
                        </CommentAvatarContainer>
                        <CommentContentContainer>
                            <Text>{_.map(_.range(0, 6), index => room?.review?.[0].review)}</Text>
                        </CommentContentContainer>
                        <MoreCommentButtonContainer onPress={() => navigation.navigate("Review", { id: room?.id })}>
                            <Text>후기 <Text style={{ fontWeight: 'bold' }}>{_.size(room?.review)}</Text>개 모두 보기</Text>
                        </MoreCommentButtonContainer>
                    </CommentContainer>
                </ContentContainer>
                <ContentContainer2>
                    <MoreRoomContainer>
                        <MoreRoomTitleContainer>
                            <MoreRoomContainerTitleText>숙소 더 보기</MoreRoomContainerTitleText>
                        </MoreRoomTitleContainer>
                        <MoreRoomContainer2>
                            <Slider2
                                room={room}
                            />
                        </MoreRoomContainer2>
                    </MoreRoomContainer>
                    <NearEnjoyContainer>
                        <NearEnjoyTitleContainer>
                            <NearEnjoyContainerTitleText>주변의 즐길거리</NearEnjoyContainerTitleText>
                        </NearEnjoyTitleContainer>
                        <NearEnjoyContainer2>
                            <Slider2
                                room={room}
                                adjustmentRate={0.42}
                                adjustmentRate2={0.05}
                                showLikeButton={true}
                            />
                        </NearEnjoyContainer2>
                    </NearEnjoyContainer>
                    <BottomContentContainer></BottomContentContainer>
                </ContentContainer2>
            </Container>
            <FooterContainer>
                <FooterContainer2>
                    <FooterContainer2Text>요금을 확인하려면 날짜를 입력하세요.</FooterContainer2Text>
                </FooterContainer2>
                <FooterContainer3>
                    <FooterContainer3Text>예약 가능 여부 보기</FooterContainer3Text>
                </FooterContainer3>
            </FooterContainer>
        </Container0>
    )
}