
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowJoinModal, toggleShowLoginModal } from "../redux/indexSlice";
import { useSelectUserQuery } from "../generated/graphql";

type Props = {
};


const Header: React.FunctionComponent<Props> = ({
}) => {
  const dispatch = useDispatch();
  const { loading, data } = useSelectUserQuery({
    variables: {
      id: 211
    }
  });
  console.log('data', JSON.stringify(data));
  return (
    <div className="flex-1 w-full h-16 flex items-center justify-between">
      <img src="https://cdn4.iconfinder.com/data/icons/socialcones/508/Airbnb-512.png" style={{ maxWidth: 45 }} />
      <div className="h-full w-1/4 flex items-center justify-around">
        <div className="h-full w-1/5 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200">
          호스트되기
        </div>
        <div className="h-full w-1/5 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200">
          도움말
        </div>
        <div className="h-full w-1/5 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200" onClick={() => dispatch(toggleShowJoinModal({}))}>
          회원가입
        </div>
        <div className="border border-gray-400 h-full w-1/5 flex items-center justify-center rounded-full cursor-pointer" onClick={() => dispatch(toggleShowLoginModal({}))}>
          로그인
        </div>
      </div>
    </div>
  );
}

export default Header;