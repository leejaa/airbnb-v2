import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch, DefaultRootState } from "react-redux";
import { useRouter } from 'next/router';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { toggleShowJoinModal, toggleShowLoginModal } from "../redux/indexSlice";
import Header from "./Header";
import Join from "./index/Join";
import Login from "./index/Login";

type Props = {
  props: any
};


const Layout: React.FunctionComponent<Props> = ({ props, children }) => {
  const isAuth = props?.isAuth ?? true;
  const router = useRouter();
  const { showJoinModal, showLoginModal } = useSelector((state: any) => state.indexReducer);
  const dispatch = useDispatch();
  const joinRef = useRef(null);
  const loginRef = useRef(null);
  useEffect(() => {
    if ( (router?.query?.action ?? '') === 'login'  ) {
      dispatch(toggleShowLoginModal({ data: true }));
    }
    if (!isAuth) {
      router.push({
        pathname: '/',
        query: {
          action: 'login'
        }
      });
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (joinRef.current && !joinRef.current.contains(event.target)) {
        dispatch(toggleShowJoinModal({}));
      }
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        dispatch(toggleShowLoginModal({}));
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [joinRef, loginRef]);
  return (
    <div className={`w-full h-full relative ${(showJoinModal || showLoginModal) && 'bg-black bg-opacity-75'}`}>
      <div className="px-16">
        <Header />
      </div>
      <div className={`w-30 h-140 bg-white z-10 absolute right-35 top-10 p-6 ${!showJoinModal && 'hidden'}`} ref={showJoinModal ? joinRef : null}>
        <Join />
      </div>
      <div className={`w-30 h-140 bg-white z-10 absolute right-35 top-10 p-6 ${!showLoginModal && 'hidden'}`} ref={showLoginModal ? loginRef : null}>
        <Login />
      </div>
      {children}
    </div>
  );
}

export default Layout;