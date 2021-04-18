import { Instance, types } from "mobx-state-tree"


const App = types
    .model("App", {
        isReady: false,
        isDisconnect: false,
        isDisconnectHappened: false,
    })
    .actions(self => ({
        ready: (flag = true) => {
            self.isReady = flag
        },
        disconnect: (flag = true) => {
            self.isDisconnect = flag
            self.isDisconnectHappened = true
        },
    }))


export interface IApp extends Instance<typeof App> {}
export default App
