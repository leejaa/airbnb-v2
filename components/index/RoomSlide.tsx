import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
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
    const [clientWidth, setClientWidth] = useState(-((screen?.width ?? 200) / 2 * data.selectRooms.length * 0.9));
    const slide001Ref = useRef(null);
    useEffect(() => {
        // setClientWidth(slide001Ref.current ? slide001Ref.current.clientWidth : 0);
    }, [slide001Ref.current]);
    console.log('clientWidth', clientWidth);
    const RoomSlide001 = useMemo(() => {
        return (
            <Draggable
                axis="x"
                handle=".handle"
                bounds={{ left: clientWidth, right: 0 }}
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                grid={[25, 25]}
                scale={1}
            // onStart={test1}
            // onDrag={test2}
            // onStop={test3}
            >
                <div className="h-56 flex flex-row absolute p-2 handle" ref={slide001Ref}>
                    {
                        (data?.selectRooms ?? []).map((room: Room) => {
                            return (
                                <div className="h-full mr-5" style={{ width: `${(screen?.width ?? 200) / 2}px` }}>
                                    <RoomCard key={room.id} room={room} />
                                </div>
                            )
                        })
                    }
                </div>
            </Draggable>
        );
    }, [clientWidth]);
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