import React, { FC, useEffect, useState } from "react";
import cs from "classnames";
import { withStore } from "../../../hoc/withStore";

const CurrentPrice: FC<any> = ({
    streamer: {
        subscribedCurrency: {
            price,
        },
    },
}) => {
    const [prevPrice, setPrevPrice] = useState<number>(0)
    const [priceClass, setPriceClass] = useState<string>("")

    useEffect(() => {
        if (price >= prevPrice) {
            setPriceClass("green")
        }
        else {
            setPriceClass("red")
        }

        setPrevPrice(price)

    }, [price])
    return (
        <p
            onAnimationEnd={() => setPriceClass("")}
            className={cs("price-lighten", priceClass)}
        >
            curr: {price}
        </p>
    );
};

export default withStore(CurrentPrice)
