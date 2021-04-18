export default function (date = new Date()) {
    const minutes = new Date(date).getMinutes()
    return `${new Date(date).getHours()}:${minutes < 10 ? 0 : ""}${minutes}`
}
