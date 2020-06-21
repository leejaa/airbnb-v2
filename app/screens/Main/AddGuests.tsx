import React, { useCallback, useState, useEffect } from "react";
import { Dimensions } from 'react-native';
import styled from "styled-components/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../redux/rootReducer";
import Calendar from "../../components/Common/Calendar";
import _ from "lodash";
import { setPersonCnt } from "../../redux/homeSlice";

const Container1 = styled.View`
    width: 100%;
`;
const Container2 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 10}px;
    display: flex;
    justify-content: center;
    padding-left: ${SCREEN_WIDTH / 20}px;
`;
const Container3 = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 2.5}px;
    margin-top: ${SCREEN_HEIGHT / 15}px;
`;
const Container4 = styled.View`
    width: 100%;
    height: 33.333%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: ${SCREEN_WIDTH / 20}px;
    padding-right: ${SCREEN_WIDTH / 20}px;
    border-bottom-color: #E9E6E7;
    border-bottom-width: 1px;
`;
const Container5 = styled.View`
    width: 25%;
    height: 80%;
    display: flex;
    justify-content: center;
`;
const Container6 = styled.View`
    width: 35%;
    height: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const Text1 = styled.Text`
    font-size: ${SCREEN_WIDTH / 15}px;
    font-weight: 600;
`;
const Text2 = styled.Text`
    font-size: ${SCREEN_WIDTH / 25}px;
    font-weight: 600;
`;
const Text3 = styled.Text`
    font-size: ${SCREEN_WIDTH / 27}px;
    font-weight: 600;
    color: gray;
`;
const Text4 = styled.Text`
    font-size: ${SCREEN_WIDTH / 20}px;
    font-weight: 600;
    color: black;
`;
interface props {
}

export default ({
}: props) => {
    const dispatch = useDispatch();
    const [cnt, setCnt] = useState({
        adultCnt: 0,
        childCnt: 0,
        babyCnt: 0
    });
    const changeCnt = useCallback(({ flag, type }) => {
        const newCnt: any = _.clone(cnt);
        newCnt[type] = _.isEqual(flag, 'plus') ? newCnt[type] + 1 : (newCnt[type] - 1 < 0 ? 0 : newCnt[type] - 1);
        setCnt(newCnt);
    }, [cnt]);
    useEffect(() => {
        dispatch(setPersonCnt({ data: cnt }));
    }, [cnt]);
    return (
        <Container1>
            <Container2>
                <Text1>게스트 추가</Text1>
            </Container2>
            <Container3>
                <Container4>
                    <Container5>
                        <Text2>성인</Text2>
                        <Text3>만 13세 이상</Text3>
                    </Container5>
                    <Container6>
                        <AntDesign name="minuscircleo" size={30} color="gray" onPress={() => changeCnt({ flag: 'minus', type: 'adultCnt' })} />
                        <Text4>{cnt.adultCnt}</Text4>
                        <AntDesign name="pluscircleo" size={30} color="gray" onPress={() => changeCnt({ flag: 'plus', type: 'adultCnt' })} />
                    </Container6>
                </Container4>
                <Container4>
                    <Container5>
                        <Text2>어린이</Text2>
                        <Text3>2 ~ 12세</Text3>
                    </Container5>
                    <Container6>
                        <AntDesign name="minuscircleo" size={30} color="gray" onPress={() => changeCnt({ flag: 'minus', type: 'childCnt' })} />
                        <Text4>{cnt.childCnt}</Text4>
                        <AntDesign name="pluscircleo" size={30} color="gray" onPress={() => changeCnt({ flag: 'plus', type: 'childCnt' })} />
                    </Container6>
                </Container4>
                <Container4>
                    <Container5>
                        <Text2>유아</Text2>
                        <Text3>2세 미만</Text3>
                    </Container5>
                    <Container6>
                        <AntDesign name="minuscircleo" size={30} color="gray" onPress={() => changeCnt({ flag: 'minus', type: 'babyCnt' })} />
                        <Text4>{cnt.babyCnt}</Text4>
                        <AntDesign name="pluscircleo" size={30} color="gray" onPress={() => changeCnt({ flag: 'plus', type: 'babyCnt' })} />
                    </Container6>
                </Container4>
            </Container3>
        </Container1>
    )
}