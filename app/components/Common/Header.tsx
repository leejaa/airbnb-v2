import React, { useMemo, useCallback, useState, useRef, useEffect } from "react";
import { TouchableOpacity, Dimensions, Text, View, Alert, Animated, StyleSheet } from "react-native";
import styled from "styled-components/native";
import _ from "lodash";
import axios from "axios";
import { AntDesign, Feather, Entypo, EvilIcons } from '@expo/vector-icons';
import { headerProps } from "../types";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import BackBtn from "../Auth/BackBtn";
import { KAKAO_KEY } from "../../env";
import { useDispatch, useSelector } from "react-redux";
import { setSearchPlaceList, toggleSearchReviewText, setSearchPlaceWord, setSearchedPlaceWord } from "../../redux/homeSlice";
import { rootState } from "../../redux/rootReducer";
import moment from "moment";

const Container: any = styled.TouchableOpacity`
    width: 100%;
    height: ${SCREEN_HEIGHT / 16}px;
    margin-top: ${SCREEN_HEIGHT / 60}px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: ${SCREEN_WIDTH / 12}px;
    border-bottom-width: 2px;
    border-color: #CECBCB;
`;
const Container2: any = styled.View`
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Container3: any = styled.View`
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const Container5: any = styled.View`
    width: 100%;
    height: 45%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Container6: any = styled.View`
    width: 100%;
    height: 55%;
    border-width: 2px;
    border-color: #CECBCB;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
`;
const Container7: any = styled.TouchableOpacity`
    width: 100%;
    height: 50%;
    border-bottom-width: 1px;
    border-color: #CECBCB;
    padding-left: 13px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const Container8: any = styled.View`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
`;
const Container9: any = styled.TouchableOpacity`
    width: 50%;
    height: 100%;
    border-right-width: 1px;
    border-color: #CECBCB;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 13px;
`;
const Container10: any = styled.TouchableOpacity`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 13px;
`;
const Container11: any = styled.SafeAreaView`
    width: 100%;
    height: ${SCREEN_HEIGHT / 9}px;
    display: flex;  
    flex-direction: row;
`;
const Container12: any = styled.View`
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Container13: any = styled.View`
    width: 75%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Container14: any = styled.View`
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Container15: any = styled.TextInput`
    width: 100%;
    height: 100%;
`;
const SearchContainer: any = styled.View`
    width: 15%;
    height: 100%;
    position: absolute;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Text1: any = styled.Text`
    font-size: 15px;
    font-weight: bold;
`;
const Text2: any = styled.Text`
    font-size: 15px;
    color: #000;
`;
const Text3: any = styled.Text`
    font-size: 18px;
    font-weight: 500;
`;
const Text4: any = styled.Text`
    font-size: 14px;
    font-weight: 500;
    margin-left: 5px;
`;

const styles = StyleSheet.create({
    Container4: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderBottomWidth: 2,
        borderColor: '#CECBCB',
        position: 'absolute',
        zIndex: 100,
        backgroundColor: 'white',
        padding: 10,
        height: 200
    }
});

const Header: React.FC<headerProps> = ({
    cssType = "001",
    showSearchIcon = false,
    action = "place",
}: any) => {
    const { selectedSearchPlace = "", selectedSearchDates = [], personCnt = undefined } = useSelector((state: rootState) => state.homeReducer);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchPlaceText, setSearchPlaceText] = useState("");
    const [searchReviewText, setSearchReviewText] = useState("");
    const [top, setTop] = useState(-40);
    const animateRef = useRef(new Animated.Value(-230)).current;
    const searchTextInputRef: any = useRef(null);
    const onPressHeader = useCallback(() => {
        Animated.timing(animateRef, {
            toValue: 0,
            duration: 200
        }).start();
        setTop(0);
    }, [animateRef]);
    const closeSearchBox = useCallback(() => {
        Animated.timing(animateRef, {
            toValue: -230,
            duration: 200
        }).start();
        setTop(-40);
    }, [animateRef]);
    const onChangeText = useCallback((value) => {
        setSearchPlaceText(value);
    }, [searchPlaceText]);
    const onChangeReviewText = useCallback((value) => {
        setSearchReviewText(value);
    }, [searchReviewText]);
    const searchAddress = useCallback(async () => {
        if (_.isEqual(searchPlaceText, "")) {
            dispatch(setSearchPlaceList({ data: [] }));
            return;
        }
        const result = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchPlaceText}`, {
            headers: {
                Authorization: `KakaoAK ${KAKAO_KEY}`
            }
        });
        dispatch(setSearchPlaceList({ data: result?.data?.documents ?? [] }));
        dispatch(setSearchedPlaceWord({ data: searchPlaceText }));
    }, [searchPlaceText]);
    useEffect(() => {
        if (!_.isNull(searchTextInputRef) && _.isEqual(cssType, "002")) {
            searchTextInputRef.current.focus();
        }
    }, []);
    useEffect(() => {
        searchAddress();
    }, [searchPlaceText]);
    useEffect(() => {
        if (!_.isEqual(searchReviewText, "")) {
            dispatch(toggleSearchReviewText({data: searchReviewText}))
        }
    }, [searchReviewText]);
    const Header001 = useMemo(() => {
        return (
            <>
                <Animated.View style={[styles.Container4, { top: animateRef }]}>
                    <Container5>
                        <AntDesign name="close" size={23} color="black" onPress={closeSearchBox} />
                        <Text3>검색 조건 수정하기</Text3>
                        <AntDesign name="bars" size={23} color="black" />
                    </Container5>
                    <Container6>
                        <Container7 onPress={() => navigation.navigate("SearchPlace")}>
                            <Feather name="search" size={18} color="black" />
                            <Text4>{_.isEqual(selectedSearchPlace, "") ? "지역 추가" : selectedSearchPlace}</Text4>
                        </Container7>
                        <Container8>
                            <Container9 onPress={() => navigation.navigate("SearchCalendar")}>
                                <Entypo name="calendar" size={18} color="black" />
                                <Text4>{_.isEmpty(selectedSearchDates) ? "날짜 추가" : `${moment(selectedSearchDates[0]).format('M월 D일')} - ${moment(selectedSearchDates[_.size(selectedSearchDates) - 1]).format('M월 D일')}`}</Text4>
                            </Container9>
                            <Container10 onPress={() => navigation.navigate("AddGuests")}>
                                <AntDesign name="team" size={18} color="black" />
                                <Text4>게스트 {!_.isUndefined(personCnt) && _.sum(Object.values(personCnt))}명</Text4>
                            </Container10>
                        </Container8>
                    </Container6>
                </Animated.View>
                <Container onPress={onPressHeader}>
                    <Container2>
                        <Text1>지역</Text1>
                    </Container2>
                    <Container3>
                        <Text2>날짜 입력</Text2>
                        <Text2>|</Text2>
                        <AntDesign name="bars" size={20} color="black" />
                    </Container3>
                </Container>
            </>
        );
    }, [showSearchBox, top, selectedSearchPlace, selectedSearchDates, personCnt]);
    const Header002 = useMemo(() => {
        return (
            <Container11>
                <Container12>
                    <BackBtn />
                </Container12>
                <Container13>
                    {
                        _.isEqual(action, "place") && <Container15 ref={searchTextInputRef} value={searchPlaceText} onChangeText={onChangeText}></Container15>
                    }
                    {
                        _.isEqual(action, "review") && <Container15 ref={searchTextInputRef} value={searchReviewText} onChangeText={onChangeReviewText}></Container15>
                    }
                </Container13>
                <Container14>
                    {
                        !_.isEqual(searchPlaceText, "") && (
                            <AntDesign name="closecircle" size={20} color="gray" onPress={() => setSearchPlaceText("")} />
                        )
                    }
                </Container14>
                {
                    showSearchIcon && (
                        <SearchContainer>
                            <EvilIcons name="search" size={30} color="black" />
                        </SearchContainer>
                    )
                }
            </Container11>
        );
    }, [searchPlaceText, showSearchIcon, action, searchReviewText]);
    const Header003 = useMemo(() => {
        return (
            <Container11>
                <Container12>
                    <BackBtn cssType="002" />
                </Container12>
            </Container11>
        );
    }, []);
    let Header;
    switch (cssType) {
        case "001":
            Header = _.clone(Header001);
            break;
        case "002":
            Header = _.clone(Header002);
            break;
        case "003":
            Header = _.clone(Header003);
            break;
        default:
            Header = _.clone(Header001);
            break;
    }
    return (
        <>
            {Header}
        </>
    );
}

export default Header;