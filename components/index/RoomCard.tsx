import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import { RoomCardProps } from "../types";
import _ from "lodash";
import { StarFilled, HeartOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

const RoomCard: React.FunctionComponent<RoomCardProps> = ({
    roomCardType = '001',
    room,
    isVisibleHeart = false,
    showDot = true,
    imgHeight = 'h-56',
    mt = 'mt-1',
    showArrows = false,
}) => {
    const [css, setCss] = useState('w-full h-full flex flex-col transform transition duration-500 ease-in-out');
    const [showLikeButton, setShowLikeButton] = useState(isVisibleHeart);
    const arrowPrev = useCallback((clickHandler) => {
        return (
            <>
                {
                    showLikeButton && (
                        <div onClick={clickHandler} className="bg-221 absolute cursor-pointer left-2 top-40 z-10 w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition ease-in-out duration-300 hover:bg-white transform hover:scale-110">
                            <LeftOutlined style={{ fontSize: 12 }} />
                        </div>
                    )
                }
            </>
        );
    }, [showLikeButton]);
    const arrowNext = useCallback((clickHandler) => {
        return (
            <>
                {
                    showLikeButton && (
                        <div onClick={clickHandler} className="bg-221 absolute cursor-pointer right-2 top-40 z-10 w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition ease-in-out duration-300 hover:bg-white transform hover:scale-110">
                            <RightOutlined style={{ fontSize: 12 }} />
                        </div>

                    )
                }
            </>
        );
    }, [showLikeButton]);
    const onMouseOver = useCallback(() => {
        setShowLikeButton(true);
    }, []);
    const onMouseLeave = useCallback(() => {
        setShowLikeButton(false);
    }, []);
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
            <div className="w-full h-full relative" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
                {
                    showLikeButton && (
                        <div className="w-8 h-8 rounded-full bg-221 absolute z-10 right-5 top-3 flex justify-center items-center cursor-pointer transition ease-in-out duration-300 hover:bg-white transform hover:scale-110">
                            <HeartOutlined style={{ fontSize: 17 }} />
                        </div>
                    )
                }
                <div className={`${imgHeight}`}>
                    <Carousel
                        showArrows={showArrows}
                        showStatus={false}
                        showIndicators={showDot}
                        infiniteLoop={true}
                        showThumbs={false}
                        renderArrowPrev={arrowPrev}
                        renderArrowNext={arrowNext}
                    >
                        {
                            room.photo.slice(0, 5).map(photo => {
                                return (
                                    <div key={photo.id} className="w-full">
                                        <img src={`${photo.file ?? ""}`} className={`rounded-md ${imgHeight}`} />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <div className={`w-full h-30p ${mt}`}>
                    <div className="w-full h-50p flex flex-row items-center">
                        <div className="w-60p h-full flex items-center justify-between">
                            <div className="border border-black  w-1/2 h-85p rounded-md flex items-center justify-center">
                    <span className="text-05 font-bold">{`슈퍼호스트`}</span>
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
    }, [css, room, showDot, imgHeight, mt, showArrows, showLikeButton]);
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