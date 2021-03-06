import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch, DefaultRootState } from "react-redux";
import { useRouter } from 'next/router';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { toggleShowJoinModal, toggleShowLoginModal, toggleSearchTotalModalIndex, toggleShowSearchTotalModal } from "../redux/indexSlice";
import Header from "./Header";
import Join from "./index/Join";
import Login from "./index/Login";
import Footer from "./Footer";
import Search from "./common/Search";
import { rootState } from "../redux/rootReducer";
import SearchPlace from "./common/SearchPlace";
import SearchCalendar from "./common/SearchCalendar";
import AddGuest from "./common/AddGuest";
import SearchTotalModal from "./common/SearchTotalModal";
import Modal from "./index/Modal";

type Props = {
  props: any,
  headerCssType?: string,
};

const Layout: React.FunctionComponent<Props> = ({ props, children, headerCssType = "001" }) => {
  const isAuth = props?.isAuth ?? true;
  const router = useRouter();
  const { showJoinModal, showLoginModal, showSearchModal, showHeader = true, showSearchPlace, showSearchCalendar, showAddGuest, showSearchTotalModal,
  } = useSelector((state: rootState) => state.indexReducer);
  const dispatch = useDispatch();
  const joinRef = useRef(null);
  const loginRef = useRef(null);
  const totalModalRef = useRef(null);
  useEffect(() => {
    if ((router?.query?.action ?? '') === 'login') {
      // dispatch(toggleShowLoginModal({ data: true }));
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
      if (totalModalRef.current && !totalModalRef.current.contains(event.target)) {
        dispatch(toggleShowSearchTotalModal({ data: false }));
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [joinRef, loginRef, totalModalRef]);
  return (
    <div className={`overflow-x-hidden overflow-y-scroll w-full h-full relative ${(showJoinModal || showLoginModal || showSearchTotalModal) && 'bg-black bg-opacity-75'}`}>
      <div className={`px-16 border-b border-gray-300 absolute top-0 ${!showHeader && 'hidden'}`}>
        <Header headerCssType={headerCssType}/>
      </div>
      <div className={`w-30 h-200 bg-white z-20 absolute right-35 top-10 p-6 ${!showJoinModal && 'hidden'}`} ref={showJoinModal ? joinRef : null}>
        <Join />
      </div>
      <div className={`w-full h-160 bg-white z-20 absolute right-0 top-10 p-6 xl:w-30 xl:right-35 ${!showLoginModal && 'hidden'}`} ref={showLoginModal ? loginRef : null}>
        <Login />
      </div>
      <div className={`w-full h-48 bg-white z-20 absolute top-0 border-b border-gray-300 p-3 ${!showSearchModal && 'hidden'}`}>
        <Search />
      </div>
      <div className={`w-full h-full bg-white z-20 absolute relative ${!showSearchPlace && 'hidden'}`}>
        <SearchPlace />
      </div>
      <div className={`w-full h-full bg-white z-20 absolute relative ${!showSearchCalendar && 'hidden'}`}>
        <SearchCalendar />
      </div>
      <div className={`w-full h-full bg-white z-20 absolute relative ${!showAddGuest && 'hidden'}`}>
        <AddGuest />
      </div>
      <div className={`w-full h-80p bg-white z-20 flex items-center justify-center absolute ${!showSearchTotalModal && 'hidden'} move003 `} ref={showSearchTotalModal ? totalModalRef : null}>
        <SearchTotalModal />
      </div>
      {children}
      <Modal />
      <Footer />
    </div>
  );
}

export default Layout;