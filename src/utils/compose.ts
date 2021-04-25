export default function (...fn: any[]) {
    return (arg: any) => fn.reduce( (callStack, current) => current(callStack), arg)
}
