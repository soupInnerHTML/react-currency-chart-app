import { types } from "mobx-state-tree";

const ChartParams = types.model("ChartParams", {
    activeCryptoSelect: -1,
})
    .actions((self) => ({
        setActiveCryptoSelect(activeCryptoSelect: number) {
            self.activeCryptoSelect = activeCryptoSelect;
        },
    }))
export default ChartParams
