
import React, { useCallback } from "react";
import { AppleOutlined, HeartOutlined, ShoppingOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { toggleShowLoginModal, toggleIsLogin } from "../redux/indexSlice";
import { rootState } from "../redux/rootReducer";

type Props = {
};


const Footer: React.FunctionComponent<Props> = ({
}) => {
  const { isLogin = false } = useSelector((state: rootState) => state.indexReducer);
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(toggleIsLogin({ data: false }));
    document.cookie = 'jid=';
  }, [ isLogin ]);
  return (
    <div className="border-t border-gray-300 z-20 fixed bottom-0 w-full h-16 flex flex-row bg-white xl:hidden">
      <div className="w-1/5 h-full flex flex-col justify-center items-center">
        <AppleOutlined style={{ fontSize: 30, color: 'pink' }} />
        <span className="text-xs text-pink-400">둘러보기</span>
      </div>
      <div className="w-1/5 h-full flex flex-col justify-center items-center">
        <HeartOutlined style={{ fontSize: 30 }} />
        <span className="text-xs">저장목록</span>
      </div>
      <div className="w-1/5 h-full flex flex-col justify-center items-center">
        <ShoppingOutlined style={{ fontSize: 30 }} />
        <span className="text-xs">여행</span>
      </div>
      <div className="w-1/5 h-full flex flex-col justify-center items-center">
        <MessageOutlined style={{ fontSize: 30 }} />
        <span className="text-xs">메시지</span>
      </div>
      {
        isLogin ? (
          <div className="w-1/5 h-full flex flex-col justify-center items-center" onClick={logout}>
            <UserOutlined style={{ fontSize: 30 }} />
            <span className="text-xs">로그아웃</span>
          </div>
        ) : (
            <div className="w-1/5 h-full flex flex-col justify-center items-center" onClick={() => dispatch(toggleShowLoginModal({ data: true }))}>
              <UserOutlined style={{ fontSize: 30 }} />
              <span className="text-xs">로그인</span>
            </div>
          )
      }
    </div>
  );
}

export default Footer;