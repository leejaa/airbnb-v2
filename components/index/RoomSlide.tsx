import React, { useCallback, useMemo, useState, useEffect } from "react";
import { RoomSlideProps } from "../types";
import _ from "lodash";
import { Room } from "../../generated/graphql";
import RoomCard from "./RoomCard";

const RoomSlide: React.FunctionComponent<RoomSlideProps> = ({
    roomSlideType = '001',
    data,
}) => {
    const RoomSlide001 = useMemo(() => {
        return (
            <div className="w-full h-full flex flex-row relative overflow-x-hidden">
                {
                    (data?.selectRooms ?? []).map((room: Room) => {
                        return (
                            <div className="w-55p h-full absolute left-0">
                                <RoomCard room={room} />
                            </div>
                        )
                    })
                }
            </div>
        );
    }, []);
    let RoomSlide;
    switch (roomSlideType) {
        case '001':
            RoomSlide = _.clone(RoomSlide001);
            break;
        default:
            RoomSlide = _.clone(RoomSlide001);
            break;
    }
    return (
        <>
            {RoomSlide}
        </>
    );
}

export default RoomSlide;