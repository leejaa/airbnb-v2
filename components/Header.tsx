
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowJoinModal, toggleShowLoginModal, toggleIsLogin } from "../redux/indexSlice";
import { useSelectUserQuery } from "../generated/graphql";
import { rootState } from "../redux/rootReducer";
import Input from "./common/Input";

type Props = {
};


const Header: React.FunctionComponent<Props> = ({
}) => {
  const { isLogin = false } = useSelector((state: rootState) => state.indexReducer);
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(toggleIsLogin({ data: false }));
    document.cookie = 'jid=';
  }, [isLogin]);
  return (
    <div className="flex-1 w-full h-16 flex items-center justify-center xl:justify-between">
      <img src="https://cdn4.iconfinder.com/data/icons/socialcones/508/Airbnb-512.png" className="hidden xl:inline" style={{ maxWidth: 45 }} />
      <div className="w-full h-full flex flex-row items-center xl:hidden">
        <Input />
      </div>
      <div className="hidden xl:inline xl:w-1/5 xl:h-full">
        <Input inputType="004" />
      </div>
      <div className="hidden xl:inline xl:h-full xl:w-1/4 xl:flex xl:items-center xl:justify-around">
        <div className="h-full w-1/5 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200">
          호스트되기
        </div>
        <div className="h-full w-1/5 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200">
          도움말
        </div>
        <div className="h-full w-1/5 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200" onClick={() => dispatch(toggleShowJoinModal({}))}>
          회원가입
        </div>
        {
          isLogin ? (
            <div className="border border-gray-400 h-full w-1/5 flex items-center justify-center rounded-full cursor-pointer" onClick={logout}>
              로그아웃
            </div>
          ) : (
              <div className="border border-gray-400 h-full w-1/5 flex items-center justify-center rounded-full cursor-pointer" onClick={() => dispatch(toggleShowLoginModal({}))}>
                로그인
            </div>
            )
        }
      </div>
    </div >
  );
}

export default Header;