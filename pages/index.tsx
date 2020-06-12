import React, { useMemo, useCallback, useState } from "react";
import Draggable from 'react-draggable';
import Layout from "../components/Layout";
import { useSelectRoomsQuery } from "../generated/graphql";
import Loading from "../components/common/Loading";
import RoomSlide from "../components/index/RoomSlide";
import RoomCard from "../components/index/RoomCard";
import _ from "lodash";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const cntForOneRow = 5;
const pageSize = 30;
const batchPageSize = 30;
const Index = (props) => {
  const [cursor, setCursor] = useState(0);
  const [accumulatedCnt, setAccumulatedCnt] = useState(batchPageSize);
  const { data, loading, fetchMore } = useSelectRoomsQuery({
    variables: {
      first: batchPageSize,
      skip: 0,
    },
    fetchPolicy: "cache-first",
  });
  const [loading2, setLoading2] = useState(false);
  const rooms = useMemo(() => {
    let rooms = _.clone(data?.selectRooms ?? []);
    rooms = rooms.slice(cursor, cursor + pageSize);
    return rooms;
  }, [data, cursor]);
  const movePage = useCallback((flag) => {
    setLoading2(true);
    let newCursor = _.clone(cursor);
    if (_.isEqual(flag, 'prev')) {
      newCursor -= pageSize;
      setCursor(newCursor);
      setLoading2(false);
      return;
    } else if (_.isEqual(flag, 'next')) {
      newCursor += pageSize;
      if (!_.gte(newCursor, _.size(data.selectRooms))) {
        setCursor(newCursor);
        setLoading2(false);
        return;
      }
    }
    setCursor(newCursor);
    fetchMore({
      variables: {
        first: batchPageSize,
        skip: newCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setAccumulatedCnt(_.clone(accumulatedCnt) + batchPageSize);
        setLoading2(false);
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          selectRooms: [...prev.selectRooms, ...fetchMoreResult.selectRooms]
        });
      }
    });
  }, [cursor, data, accumulatedCnt]);
  const roomList = useMemo(() => {
    if (!loading) {
      return (
        <>
          {
            rooms.slice(0, 7).map(room => {
              return (
                <div key={room.id} className="w-full h-48 mr-6">
                  <RoomCard
                    room={room as any}
                    isVisibleHeart={false}
                    roomCardType="002"
                    showDot={false}
                    imgHeight="h-40"
                  />
                </div>
              )
            })
          }
        </>
      );
    }
  }, [loading, rooms]);
  const roomList02 = useMemo(() => {
    if (!loading) {
      if (loading2) {
        return (
          <div className="w-full h-full flex items-center justify-center">
            <Loading />
          </div>
        );
      }
      const array = _.range(0, _.size(rooms), cntForOneRow);
      return (
        <>
          {
            array.map(first => {
              return (
                <div className="h-90 pl-20 pt-3 w-full flex flex-row sm:hidden md:hidden lg:hidden">
                  {
                    rooms.slice(first, first + cntForOneRow).map(room => {
                      return (
                        <div key={room.id} className="w-full h-48 mr-6 mt">
                          <RoomCard
                            room={room as any}
                            isVisibleHeart={false}
                            roomCardType="002"
                            showDot={true}
                            imgHeight="h-64"
                            mt="mt-1"
                            showArrows={false}
                          />
                        </div>
                      )
                    })
                  }
                </div>
              );
            })
          }
        </>
      );
    }
  }, [loading, rooms, loading2]);
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <Layout props={props}>
      <div className="w-full h-20 p-2 flex flex-col xl:p-20">
        <span className="text-xl font-bold">최고 평점을 받은 숙소</span>
        <span className="text-sm">최고의 평점을 받은 전세계 숙소를 둘러보세요</span>
      </div>
      <div className="w-full h-64 xl:hidden">
        <RoomSlide
          data={data}
        />
      </div>
      <div className="w-full mb-10 xl:hidden">
        {
          data.selectRooms.map(room => {
            return (
              <div key={room.id} className="w-full h-80 p-6">
                <RoomCard
                  room={room as any}
                  isVisibleHeart={true}
                  roomCardType="002"
                  imgHeight="h-56"
                />
              </div>
            )
          })
        }
      </div>
      <div className="w-full h-64 pl-20 pt-3 flex flex-row sm:hidden md:hidden lg:hidden">
        {
          roomList
        }
      </div>
      {
        roomList02
      }
      <div className="w-full h-10p flex items-center justify-center">
        <div className="w-17p h-60p flex flex-row items-center justify-between">
          {
            !_.isEqual(cursor, 0) && (
              <div className="rounded-md w-35p h-full flex flex-row items-center justify-around cursor-pointer hover:bg-221" onClick={() => movePage('prev')}>
                <LeftOutlined style={{ fontSize: 16 }} className="font-bold" />
                <span className="font-bold"><u>이전페이지</u></span>
              </div>
            )
          }
          {
            !_.lt(_.size(rooms), pageSize) && (
              <div className="rounded-md w-35p h-full flex flex-row items-center justify-around cursor-pointer hover:bg-221" onClick={() => movePage('next')}>
                <span className="font-bold"><u>다음페이지</u></span>
                <RightOutlined style={{ fontSize: 16 }} className="font-bold" />
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  );
};

export default Index;