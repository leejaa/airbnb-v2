
import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import styled from "styled-components";
import { toggleShowJoinModal, toggleShowLoginModal, toggleIsLogin } from "../redux/indexSlice";
import { useSelectUserQuery } from "../generated/graphql";
import { rootState } from "../redux/rootReducer";
import Input from "./common/Input";
import { WEBSCREEN_WIDTH, WEBSCREEN_HEIGHT } from "../utils/utils";

const HeaderContainer = styled.div`
  width: ${WEBSCREEN_WIDTH * 0.85}px;
  height: ${WEBSCREEN_HEIGHT / 12}px;
  position: fixed;
  top: 0;
  left: ${WEBSCREEN_WIDTH / 15}px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

type Props = {
  headerCssType: string,
};

const Header: React.FunctionComponent<Props> = ({
  headerCssType = "001",
}) => {
  const { isLogin = false } = useSelector((state: rootState) => state.indexReducer);
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(toggleIsLogin({ data: false }));
    document.cookie = 'jid=';
  }, [isLogin]);
  const Header001 = useMemo(() => {
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
  }, []);
  const Header002 = useMemo(() => {
    return (
      <HeaderContainer>
        <Input inputType="006" />
      </HeaderContainer>
    );
  }, []);
  let Header;
  switch (headerCssType) {
    case "001":
      Header = _.clone(Header001);
      break;
    case "002":
      Header = _.clone(Header002);
      break;
    default:
      Header = _.clone(Header001);
      break;
  }
  return (
    <>
      {Header}
    </>
  );
}

export default Header;