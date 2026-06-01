import { atom } from "recoil";

export const ErrorsSchema = atom<{ sqlViews: { error: string, object: string }[], webHooks: { error: string, object: string }[] }>({
    default: undefined,
    key: "errors-state"
})