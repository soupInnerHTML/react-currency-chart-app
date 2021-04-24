import currencyColors from "../global/currencyColors.json";
import { ECurrency } from "../global/types";

export default function (curr: ECurrency) {
    return currencyColors[curr] || currencyColors.DEFAULT
}
