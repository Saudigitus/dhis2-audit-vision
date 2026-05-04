import { atom } from "recoil";

export const SeverityRulesSchema = atom<any>({
    default: undefined,
    key: "rules-state"
})