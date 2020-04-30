
import React from "react"

type Props = {
};


const Header: React.FunctionComponent<Props> = ({
}) => {
  return (
    <div className="border flex-1 border-gray-900 w-full h-16 flex items-center justify-between">
      <img src="https://cdn4.iconfinder.com/data/icons/socialcones/508/Airbnb-512.png" style={ { maxWidth: 45 } }/>
      <div className="border border-gray-900 h-full w-1/4 flex items-center justify-center">
        <div className="border border-gray-400 h-full w-1/5 flex items-center justify-center rounded-full cursor-pointer">
          로그인
        </div>
      </div>
    </div>
  );
}

export default Header;