import React from "react";
import Draggable from 'react-draggable';
import Layout from "../components/Layout";
import { useSelectRoomsQuery } from "../generated/graphql";
import Loading from "../components/common/Loading";
import RoomSlide from "../components/index/RoomSlide";

const Index = (props) => {
  const { data, loading } = useSelectRoomsQuery({
    variables: {
      first: 3,
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
      <RoomSlide
        data={data}
      />
    </Layout>
  );
};

export default Index;