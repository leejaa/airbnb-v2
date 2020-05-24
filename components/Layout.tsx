import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch, DefaultRootState } from "react-redux";
import { useRouter } from 'next/router';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { toggleShowJoinModal, toggleShowLoginModal } from "../redux/indexSlice";
import Header from "./Header";
import Join from "./index/Join";
import Login from "./index/Login";
import Footer from "./Footer";
import Search from "./common/Search";
import { rootState } from "../redux/rootReducer";
import SearchPlace from "./common/SearchPlace";
import SearchCalendar from "./common/SearchCalendar";

type Props = {
  props: any
};


const Layout: React.FunctionComponent<Props> = ({ props, children }) => {
  const isAuth = props?.isAuth ?? true;
  const router = useRouter();
  const { showJoinModal, showLoginModal, showSearchModal, showHeader = true, showSearchPlace, showSearchCalendar } = useSelector((state: rootState) => state.indexReducer);
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
      <div className={`px-16 border-b border-gray-300 ${!showHeader && 'hidden'}`}>
        <Header />
      </div>
      <div className={`w-30 h-200 bg-white z-10 absolute right-35 top-10 p-6 ${!showJoinModal && 'hidden'}`} ref={showJoinModal ? joinRef : null}>
        <Join />
      </div>
      <div className={`w-full h-160 bg-white z-10 absolute right-0 top-10 p-6 xl:w-30 xl:right-35 ${!showLoginModal && 'hidden'}`} ref={showLoginModal ? loginRef : null}>
        <Login />
      </div>
      <div className={`w-full h-48 bg-white z-10 absolute top-0 border-b border-gray-300 p-3 ${!showSearchModal && 'hidden'}`}>
        <Search />
      </div>
      <div className={`w-full h-full bg-white z-10 absolute relative ${!showSearchPlace && 'hidden'}`}>
        <SearchPlace />
      </div>
      <div className={`w-full h-full bg-white z-10 absolute relative ${!showSearchCalendar && 'hidden'}`}>
        <SearchCalendar />
      </div>
      {children}
      <Footer />
    </div>
  );
}

export default Layout;