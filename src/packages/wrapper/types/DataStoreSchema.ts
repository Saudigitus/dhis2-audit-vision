import { atom } from "recoil";
import { DataStoreType } from "../config";

export const DataStoreConfigState = atom<DataStoreType>({
    default: undefined,
    key: "data-store-config-state"
})