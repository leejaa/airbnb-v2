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
`;
const Container5: any = styled.View`
    width: 100%;
    height: ${SCREEN_HEIGHT / 2.5}px;
`;
const Container6: any = styled.View`
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    padding-left: ${SCREEN_WIDTH / 20}px;
`;
const Container7: any = styled.View`
    width: 100%;
    height: 13%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const Container8: any = styled.TouchableOpacity`
    width: 14.2857%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
`;
const Container9: any = styled.View`
    width: 80%;
    height: 100%;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props: any) => props.selected ? "black" : "undefined"};
`;
const Container10: any = styled.View`
    width: 50%;
    height: 100%;
    position: absolute;
    background-color: ${(props: any) => props.selected ? "#E7E6E6" : "undefined"};
    left: 0;
`;
const Container11: any = styled.View`
    width: 50%;
    height: 100%;
    position: absolute;
    background-color: ${(props: any) => props.selected ? "#E7E6E6" : "undefined"};
    right: 0;
`;
const Text1: any = styled.Text`
`;
const Text2: any = styled.Text`
    font-size: ${SCREEN_WIDTH / 22}px;
    font-weight: 600;
`;
const Text3: any = styled.Text`
    font-size: ${SCREEN_WIDTH / 25}px;
    font-weight: 600;
    color: ${(props: any) => {
        let color = props.selected ? "white" : "black";
        if (moment(props.date).isBefore(moment())) {
            color = "#DAD8D8";
        }
        return color;
    }};
`;

const format = 'YYYY-MM-DD';
const pageSize = 3;

const Calendar: React.FC<calendarProps> = ({
    cssType = "001"
}: any) => {
    const [dates, setDates] = useState(getDatesEachMonths({ baseDate: moment().format(format), monthPageSize: pageSize }));
    const [selectedDates, setSelectedDates] = useState<Array<string>>([]);
    const selectDate = useCallback((date) => {
        if (moment(date).isBefore(moment())) {
            return;
        }
        if (_.isEmpty(selectedDates)) {
            setSelectedDates(getDates({ startDate: date, endDate: date }));
            return;
        }
        if (_.isEqual(_.size(selectedDates), 1)) {
            const startDate = moment(selectedDates[0]).isBefore(moment(date)) ? selectedDates[0] : date;
            const endDate = moment(selectedDates[0]).isBefore(moment(date)) ? date : startDate;
            setSelectedDates(getDates({ startDate, endDate }));
            return;
        }
        if (moment(date).isBetween(moment(selectedDates[0]), moment(selectedDates[_.size(selectedDates) - 1]))) {
            setSelectedDates(getDates({ startDate: date, endDate: date }));
            return;
        }
        if (moment(date).isBefore(moment(selectedDates[0])) || moment(date).isAfter(moment(selectedDates[_.size(selectedDates) - 1]))) {
            setSelectedDates(getDates({ startDate: date, endDate: date }));
            return;
        }
    }, [selectedDates]);
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
                <Container4>
                    {
                        dates.map((date, index) => {
                            const dayIndex = moment(date[0]).day();
                            let dateIndex = 0;
                            return (
                                <Container5 key={index}>
                                    <Container6>
                                        <Text2>{moment(date[0]).format('M월 YYYY')}</Text2>
                                    </Container6>
                                    <Container7>
                                        {
                                            _.map(_.range(0, 7), index => {
                                                if (index < dayIndex) {
                                                    return (
                                                        <Container8 key={index}></Container8>
                                                    );
                                                } else {
                                                    const dateParam = _.clone(date[dateIndex]);
                                                    const isStartDate = !_.isEmpty(selectedDates) && (_.isEqual(selectedDates[0], date[dateIndex]));
                                                    const isEndDate = !_.isEmpty(selectedDates) && (_.isEqual(selectedDates[_.size(selectedDates) - 1], date[dateIndex]));
                                                    const isBetween = _.includes(selectedDates, date[dateIndex]) && !isStartDate && !isEndDate;
                                                    const selected = isStartDate || isEndDate;
                                                    return (
                                                        <Container8 key={index} onPress={() => selectDate(dateParam)}>
                                                            <Container10 selected={isEndDate || isBetween}></Container10>
                                                            <Container11 selected={isStartDate || isBetween}></Container11>
                                                            <Container9 selected={selected}>
                                                                <Text3 date={date[dateIndex]} selected={selected}>{moment(date[dateIndex++]).format('D')}</Text3>
                                                            </Container9>
                                                        </Container8>
                                                    );
                                                }
                                            })
                                        }
                                    </Container7>
                                    {
                                        _.map(_.range(0, 5), index => (
                                            <Container7 key={index}>
                                                {
                                                    _.map(_.range(0, 7), index => {
                                                        const dateParam = _.clone(date[dateIndex]);
                                                        if (_.gte(dateIndex, _.size(date))) {
                                                            return (
                                                                <Container8 key={index}></Container8>
                                                            );
                                                        }
                                                        const isStartDate = !_.isEmpty(selectedDates) && (_.isEqual(selectedDates[0], date[dateIndex]));
                                                        const isEndDate = !_.isEmpty(selectedDates) && (_.isEqual(selectedDates[_.size(selectedDates) - 1], date[dateIndex]));
                                                        const isBetween = _.includes(selectedDates, date[dateIndex]) && !isStartDate && !isEndDate;
                                                        const selected = isStartDate || isEndDate;
                                                        return (
                                                            <Container8 key={index} onPress={() => selectDate(dateParam)}>
                                                                <Container10 selected={isEndDate || isBetween}></Container10>
                                                                <Container11 selected={isStartDate || isBetween}></Container11>
                                                                <Container9 selected={selected}>
                                                                    <Text3 date={date[dateIndex]} selected={selected}>{moment(date[dateIndex++]).format('D')}</Text3>
                                                                </Container9>
                                                            </Container8>
                                                        );
                                                    })
                                                }
                                            </Container7>
                                        ))
                                    }
                                </Container5>
                            )
                        })
                    }
                </Container4>
            </Container>
        );
    }, [selectedDates]);
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