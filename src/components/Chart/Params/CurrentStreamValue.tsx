import React, { FC, useEffect, useState } from "react";
import cs from "classnames";
import { withStore } from "../../../hoc/withStore";
import { IStore } from "../../../store";

const CurrentStreamValue: FC<IStore> = ({
    streamer: {
        subscribedCurrency: {
            streamValue,
        },
    },
}) => {
    const [prevStreamValue, setPrevStreamValue] = useState(0)
    const [priceClass, setPriceClass] = useState("")

    useEffect(() => {
        if (streamValue >= prevStreamValue) {
            setPriceClass("green")
        }
        else {
            setPriceClass("red")
        }

        setPrevStreamValue(streamValue)

    }, [streamValue])


    return (
        <>
            {
                !!streamValue && <p
                    onAnimationEnd={() => setPriceClass("")}
                    className={cs("price-lighten", priceClass)}
                >
                    curr: {streamValue}
                </p>
            }
        </>
    );
};

export default withStore(CurrentStreamValue)
