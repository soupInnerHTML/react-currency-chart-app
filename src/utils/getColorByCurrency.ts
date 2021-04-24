import currencyColors from "../global/currencyColors";

export default function (curr: string) {
    return currencyColors[curr] || currencyColors.DEFAULT
}
