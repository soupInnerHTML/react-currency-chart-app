function _parseDozens(val: number) {
    return val < 10 ? "0" + val : val
}

export default function (date = new Date(), isWithSeconds = false) {
    const d = new Date(date)
    return [
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    ]
        .filter((_, i) => isWithSeconds ? i !== 2 : true)
        .map(i => _parseDozens(i))
        .join(":")
}
// example output 23:59:59 | 00:01:01
