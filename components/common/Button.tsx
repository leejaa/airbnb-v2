import React, { useCallback, useMemo, useState } from "react";
import { InputProps, ButtonProps } from "../types";
import _ from "lodash";
import { SearchOutlined } from "@ant-design/icons";


const Button: React.FunctionComponent<ButtonProps> = ({
    buttonColor = 'bg-230',
    showIcon = false,
    buttonText = '검색',
}) => {

    const Button001 = useMemo(() => {
        return (
            <div className={`w-70p h-70p rounded-lg flex items-center justify-around ${buttonColor}`}>
                {
                    showIcon && (
                        <SearchOutlined style={{ fontSize: 15, color: 'white' }}/>
                    )
                }
                <span className="text-white">{buttonText}</span>
            </div>
        );
    }, []);
    let Button;
    switch (Button) {
        case '001':
            Button = _.clone(Button001);
            break;
        default:
            Button = _.clone(Button001);
            break;
    }
    return (
        <>
            {Button}
        </>
    );
}

export default Button;