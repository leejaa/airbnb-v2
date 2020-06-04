import React, { useCallback, useMemo, useState, useEffect } from "react";
import { RoomCardProps } from "../types";
import _ from "lodash";
import { StarFilled } from "@ant-design/icons";

const RoomCard: React.FunctionComponent<RoomCardProps> = ({
    roomCardType = '001',
    room
}) => {
    const RoomCard001 = useMemo(() => {
        return (
            <div className="w-full h-full flex flex-col">
                <div className="border border-black w-full h-70p rounded-lg" style={{ backgroundImage: `url(${room?.photo[0]?.file ?? ""})` }}>

                </div>
                <div className="w-full h-30p">
                    <div className="w-full h-50p flex flex-row items-center">
                        <div className="w-60p h-full flex items-center justify-between">
                            <div className="border border-black w-1/2 h-85p rounded-md flex items-center justify-center">
                                <span className="text-xs font-bold">슈퍼호스트</span>
                            </div>
                            <div className="w-1/2 h-full rounded-md flex items-center justify-center">
                                <span className="text-xs text-gray-600">{room?.name ?? ""}</span>
                            </div>
                        </div>
                        <div className="w-40p h-full flex flex-row justify-end items-center">
                            <StarFilled style={{ fontSize: 15, color: '#FF385C' }} className="mr-1" />
                            <span className="text-sm">{room?.score ?? 0}</span>
                        </div>
                    </div>
                    <div className="w-full h-50p">
                        <span className="text-base">{(room?.description ?? "").slice(0, 20)}</span>
                    </div>
                </div>
            </div>
        );
    }, []);
    let RoomCard;
    switch (roomCardType) {
        case '001':
            RoomCard = _.clone(RoomCard001);
            break;
        default:
            RoomCard = _.clone(RoomCard001);
            break;
    }
    return (
        <>
            {RoomCard}
        </>
    );
}

export default RoomCard;