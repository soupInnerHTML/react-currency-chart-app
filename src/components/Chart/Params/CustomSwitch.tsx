import React, { FC } from "react";
import { withStore } from "../../../hoc/withStore";
import { IStore } from "../../../store";
import cs from "classnames";
import { PRICE, VOLUME } from "../../../global/consts";

const CustomSwitch: FC<IStore> = ({
    streamer: {
        streamBy,
        setStreamBy,
    },
}) => {
    function volActive() {
        setStreamBy(VOLUME)
    }
    function priceActive() {
        setStreamBy(PRICE)
    }

    return (
        <div className={"switch"}>
            <div onClick={volActive} className={cs({ active: streamBy === VOLUME, })}>
                VOL
            </div>
            <div onClick={priceActive} className={cs({ active: streamBy === PRICE, })}>
                PRICE
            </div>
            {/*<span>VOL</span>*/}
            {/*<span>PRICE</span>*/}
        </div>
    );
};

export default withStore(CustomSwitch);
