import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { RoomSlideProps } from "../types";
import _ from "lodash";
import { Room } from "../../generated/graphql";
import RoomCard from "./RoomCard";
import Draggable from "react-draggable";

const RoomSlide: React.FunctionComponent<RoomSlideProps> = ({
    roomSlideType = '001',
    data,
}) => {
    const RoomSlide001 = useMemo(() => {
        return (
            <Draggable
                axis="x"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                grid={[25, 25]}
                scale={1}
            // onStart={test1}
            // onDrag={test2}
            // onStop={test3}
            >
                <div className="border border-black h-56 flex flex-row absolute p-2 handle">
                    {
                        (data?.selectRooms ?? []).map((room: Room) => {
                            return (
                                <div className="h-full mr-5" style={{ width: `${(screen?.width ?? 200) / 2}px` }}>
                                    <RoomCard room={room} />
                                </div>
                            )
                        })
                    }
                </div>
            </Draggable>
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