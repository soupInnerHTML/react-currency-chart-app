export default function (date = new Date()): string {
    const minutes: number = new Date(date).getMinutes()
    return `${new Date(date).getHours()}:${minutes < 10 ? 0 : ""}${minutes}`
//    :${new Date(date).getSeconds()}
}
// example output 23:59 | 00:01
