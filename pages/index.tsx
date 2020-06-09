import React, { useMemo } from "react";
import Draggable from 'react-draggable';
import Layout from "../components/Layout";
import { useSelectRoomsQuery } from "../generated/graphql";
import Loading from "../components/common/Loading";
import RoomSlide from "../components/index/RoomSlide";
import RoomCard from "../components/index/RoomCard";
import _ from "lodash";

const cntForOneRow = 5;
const Index = (props) => {
  const { data, loading } = useSelectRoomsQuery({
    variables: {
      first: 30,
      skip: 0,
    }
  });
  const roomList = useMemo(() => {
    if (!loading) {
      return (
        <>
          {
            data.selectRooms.slice(0, 7).map(room => {
              return (
                <div key={room.id} className="w-full h-48 mr-6">
                  <RoomCard
                    room={room as any}
                    isVisibleHeart={true}
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
  }, [loading]);
  const roomList02 = useMemo(() => {
    if (!loading) {
      const array = _.range(0, _.size(data.selectRooms), cntForOneRow);
      return (
        <>
          {
            array.map(first => {
              return (
                <div className="h-90 pl-20 pt-3 w-full flex flex-row sm:hidden md:hidden lg:hidden">
                  {
                    data.selectRooms.slice(first, first + cntForOneRow).map(room => {
                      return (
                        <div key={room.id} className="w-full h-48 mr-6 mt">
                          <RoomCard
                            room={room as any}
                            isVisibleHeart={true}
                            roomCardType="002"
                            showDot={false}
                            imgHeight="h-64"
                            mt="mt-1"
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
  }, [loading]);
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
    </Layout>
  );
};

export default Index;