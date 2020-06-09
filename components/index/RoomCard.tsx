import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import { RoomCardProps } from "../types";
import _ from "lodash";
import { StarFilled, HeartOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";

const RoomCard: React.FunctionComponent<RoomCardProps> = ({
    roomCardType = '001',
    room,
    isVisibleHeart = false,
}) => {
    const [css, setCss] = useState('w-full h-full flex flex-col transform transition duration-500 ease-in-out');
    const RoomCard001 = useMemo(() => {
        return (
            <div className={css}>
                <div className="w-full h-70p rounded-lg">
                    <img src={`${room?.photo[0]?.file ?? ""}`} className="rounded-md h-32" />
                </div>
                <div className="w-full h-30p">
                    <div className="w-full h-50p flex flex-row items-center">
                        <div className="w-60p h-full flex items-center justify-between">
                            <div className="border border-black w-1/2 h-85p rounded-md flex items-center justify-center">
                                <span className="text-01 font-bold">슈퍼호스트</span>
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
    }, [css]);
    const RoomCard002 = useMemo(() => {
        return (
            <div className="w-full h-full relative">
                {
                    isVisibleHeart && (
                        <div className="w-8 h-8 rounded-full bg-white absolute z-10 right-5 top-3 flex justify-center items-center">
                            <HeartOutlined style={{ fontSize: 17 }} />
                        </div>
                    )
                }
                <div className="h-80p">
                    <Carousel
                        showArrows={false}
                        showStatus={false}
                        showIndicators={true}
                        infiniteLoop={true}
                        showThumbs={false}
                    >
                        {
                            room.photo.slice(0, 5).map(photo => {
                                return (
                                    <div key={photo.id} className="w-full h-56">
                                        <img src={`${photo.file ?? ""}`} className="rounded-md" />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <div className="w-full h-30p mt-3">
                    <div className="w-full h-50p flex flex-row items-center">
                        <div className="w-60p h-full flex items-center justify-between">
                            <div className="border border-black w-1/2 h-85p rounded-md flex items-center justify-center">
                                <span className="text-01 font-bold">슈퍼호스트</span>
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
    }, [css, room]);
    let RoomCard;
    switch (roomCardType) {
        case '001':
            RoomCard = _.clone(RoomCard001);
            break;
        case '002':
            RoomCard = _.clone(RoomCard002);
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