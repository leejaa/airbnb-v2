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
    const [clientWidth, setClientWidth] = useState(-((screen?.width ?? 200) / 2 * (data.selectRooms.length)));
    const cardRef = useRef(null);
    useEffect(() => {
        console.log('cardRef', cardRef);
        const newClientWidth = (cardRef.current.offsetLeft * -1) + (screen.width / 2);
        setClientWidth(newClientWidth);
    }, [cardRef.current]);
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
                <div className="h-56 flex flex-row absolute p-2 handle">
                    {
                        (data?.selectRooms ?? []).map((room: Room, index) => {
                            return (
                                <div className="h-full mr-5" style={{ width: `${(screen?.width ?? 200) / 2}px` }} ref={_.isEqual(index, _.size(data.selectRooms) - 1) ? cardRef : null}>
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