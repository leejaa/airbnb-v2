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
const Container8: any = styled.View`
    width: 14.2857%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const Container9: any = styled.View`
    width: 80%;
    height: 100%;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    color: ${(props: any) => moment(props.date).isBefore(moment()) ? "#DAD8D8" : "black"};
`;

const format = 'YYYY-MM-DD';
const pageSize = 3;

const Calendar: React.FC<calendarProps> = ({
    cssType = "001"
}: any) => {
    // const [dates, setDates] = useState(getDates({startDate: moment().startOf('month').format(format), endDate: moment().add(pageSize, 'months').endOf('month').format(format)}));
    const [dates, setDates] = useState(getDatesEachMonths({ baseDate: moment().format(format), monthPageSize: pageSize }));
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
                                                        <Container8></Container8>
                                                    );
                                                } else {
                                                    return (
                                                        <Container8>
                                                            <Container9>
                                                                <Text3 date={date[dateIndex]}>{moment(date[dateIndex++]).format('D')}</Text3>
                                                            </Container9>
                                                        </Container8>
                                                    );
                                                }
                                            })
                                        }
                                    </Container7>
                                    <Container7>
                                        {
                                            _.map(_.range(0, 7), index => {
                                                return (
                                                    <Container8>
                                                        <Container9>
                                                            <Text3 date={date[dateIndex]}>{moment(date[dateIndex++]).format('D')}</Text3>
                                                        </Container9>
                                                    </Container8>
                                                );
                                            })
                                        }
                                    </Container7>
                                    <Container7>
                                        {
                                            _.map(_.range(0, 7), index => {
                                                return (
                                                    <Container8>
                                                        <Container9>
                                                            <Text3 date={date[dateIndex]}>{moment(date[dateIndex++]).format('D')}</Text3>
                                                        </Container9>
                                                    </Container8>
                                                );
                                            })
                                        }
                                    </Container7>
                                    <Container7>
                                        {
                                            _.map(_.range(0, 7), index => {
                                                return (
                                                    <Container8>
                                                        <Container9>
                                                            <Text3 date={date[dateIndex]}>{moment(date[dateIndex++]).format('D')}</Text3>
                                                        </Container9>
                                                    </Container8>
                                                );
                                            })
                                        }
                                    </Container7>
                                    <Container7>
                                        {
                                            _.map(_.range(0, 7), index => {
                                                if (_.gte(dateIndex, _.size(date))) {
                                                    return (
                                                        <Container8></Container8>
                                                    );
                                                }
                                                return (
                                                    <Container8>
                                                        <Container9>
                                                            <Text3 date={date[dateIndex]}>{moment(date[dateIndex++]).format('D')}</Text3>
                                                        </Container9>
                                                    </Container8>
                                                );
                                            })
                                        }
                                    </Container7>
                                    <Container7>
                                        {
                                            _.map(_.range(0, 7), index => {
                                                if (_.gte(dateIndex, _.size(date))) {
                                                    return (
                                                        <Container8></Container8>
                                                    );
                                                }
                                                return (
                                                    <Container8>
                                                        <Container9>
                                                            <Text3 date={date[dateIndex]}>{moment(date[dateIndex++]).format('D')}</Text3>
                                                        </Container9>
                                                    </Container8>
                                                );
                                            })
                                        }
                                    </Container7>
                                </Container5>
                            )
                        })
                    }
                </Container4>
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