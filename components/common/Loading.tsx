import React, { useCallback, useMemo, useState } from "react";
import { Spin } from 'antd';
import { LoadingProps } from "../types";
import { LoadingOutlined } from "@ant-design/icons";
import _ from "lodash";


const Loading: React.FunctionComponent<LoadingProps> = ({
    loadingType = '001',
}) => {
    const antIcon = useMemo(() => {
        return (
            <LoadingOutlined style={{ fontSize: 24 }} spin />
        );
    }, []);
    const Loading001 = useMemo(() => {
        return (
            <div>
                <Spin indicator={antIcon} />
            </div>
        );
    }, []);
    let Loading;
    switch (loadingType) {
        case '001':
            Loading = _.clone(Loading001);
            break;
        default:
            Loading = _.clone(Loading001);
            break;
    }
    return (
        <>
            {Loading}
        </>
    );
}

export default Loading;