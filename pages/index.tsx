import React from "react";
import Layout from "../components/Layout";
import { useSelectRoomsQuery } from "../generated/graphql";
import Loading from "../components/common/Loading";
import RoomSlide from "../components/index/RoomSlide";

const Index = (props) => {
  const { data, loading } = useSelectRoomsQuery({
    variables: {
      first: 1,
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
    <Layout props={ props }>
      <div className="w-full h-56">
        <RoomSlide
          data={data}
        />
      </div>
    </Layout>
  );
};

export default Index;