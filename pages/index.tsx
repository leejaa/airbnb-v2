import React from "react";
import Draggable from 'react-draggable';
import Layout from "../components/Layout";
import { useSelectRoomsQuery } from "../generated/graphql";
import Loading from "../components/common/Loading";
import RoomSlide from "../components/index/RoomSlide";
import RoomCard from "../components/index/RoomCard";

const Index = (props) => {
  const { data, loading } = useSelectRoomsQuery({
    variables: {
      first: 10,
      skip: 0,
    }
  });
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <Layout props={props}>
      <div className="w-full h-20 p-2 flex flex-col">
        <span className="text-xl font-bold">최고 평점을 받은 숙소</span>
        <span className="text-sm">최고의 평점을 받은 전세계 숙소를 둘러보세요</span>
      </div>
      <div className="w-full h-64">
        <RoomSlide
          data={data}
        />
      </div>
      <div className="w-full mb-10">
        {
          data.selectRooms.map(room => {
            return (
              <div key={room.id} className="w-full h-80 p-3">
                <RoomCard
                  room={room as any}
                  isVisibleHeart={true}
                />
              </div>
            )
          })
        }
      </div>
    </Layout>
  );
};

export default Index;