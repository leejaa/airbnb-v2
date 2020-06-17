import React, { useMemo, useCallback, useState } from "react";
import { View, Text } from "react-native";
import Modal from 'react-native-modal';
import styled from "styled-components/native";
import _ from "lodash";
import { AntDesign } from '@expo/vector-icons';
import { headerProps, calendarProps } from "../types";
import { SCREEN_HEIGHT, SCREEN_WIDTH, getDates, getDatesEachMonths } from "../../utils";
import { rootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowSearchModal } from "../../redux/homeSlice";
import moment from "moment";

const Container: any = styled.View`
    width: 100%;
    height: 100%;
`;
const Container2: any = styled.View`
    width: 100%;
    height: 7%;
    display: flex;
    flex-direction: row;
    border-bottom-width: 1px;
    border-color: #DFDDDD;
`;
const Container3: any = styled.View`
    width: 14.2857%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Container4: any = styled.ScrollView`
    width: 100%;
    height: 93%;
    border-width: 1px;
    border-color: black;
`;
const Text1: any = styled.Text`
`;

const format = 'YYYY-MM-DD';
const pageSize = 3;

const Calendar: React.FC<calendarProps> = ({
    cssType = "001"
}: any) => {
    // const [dates, setDates] = useState(getDates({startDate: moment().startOf('month').format(format), endDate: moment().add(pageSize, 'months').endOf('month').format(format)}));
    const [dates, setDates] = useState(getDatesEachMonths({baseDate: moment().format(format), monthPageSize: pageSize}));
    console.log('dates', JSON.stringify(dates));
    const Calendar001 = useMemo(() => {
        return (
            <Container>
                <Container2>
                    <Container3><Text1>일</Text1></Container3>
                    <Container3><Text1>월</Text1></Container3>
                    <Container3><Text1>화</Text1></Container3>
                    <Container3><Text1>수</Text1></Container3>
                    <Container3><Text1>목</Text1></Container3>
                    <Container3><Text1>금</Text1></Container3>
                    <Container3><Text1>토</Text1></Container3>
                </Container2>
                <Container4></Container4>
            </Container>
        );
    }, []);
    let Calendar;
    switch (cssType) {
        case "001":
            Calendar = _.clone(Calendar001);
            break;
        default:
            Calendar = _.clone(Calendar001);
            break;
    }
    return (
        <>
            {Calendar}
        </>
    );
}

export default Calendar;