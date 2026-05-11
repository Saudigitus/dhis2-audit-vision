import { atom } from "recoil";
import { DataStoreType } from "./DataStoreType";

export const DataStoreConfigState = atom<DataStoreType>({
    default: undefined,
    key: "data-store-config-state"
})