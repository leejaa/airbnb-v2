import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { TestDocument } from "../generated/graphql";
import Header from "../components/Header";
import Join from "../components/index/Join";
import { toggleShowJoinModal } from "../redux/indexSlice";

export default () => {
  const { showJoinModal } = useSelector(state => state.indexReducer);
  const dispatch = useDispatch();
  const joinRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (joinRef.current && !joinRef.current.contains(event.target)) {
        dispatch(toggleShowJoinModal({}));
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [joinRef]);
  return (
    <div className={`w-full h-full relative ${showJoinModal && 'bg-black bg-opacity-75'}`}>
      <div className="px-16">
        <Header />
      </div>
      <div className={`w-30 h-140 bg-white z-10 absolute right-35 top-10 p-6 ${!showJoinModal && 'hidden'}`} ref={showJoinModal ? joinRef : null}>
        <Join />
      </div>
    </div>
  );
};