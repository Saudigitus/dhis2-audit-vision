import { atom } from "recoil";

export const ErrorsSchema = atom<{ 
    sqlViews: { error: any, object: any }[], 
    webHooks: { error: any, object: any }[], 
    routes?: { error: any, object: any }[],
    access?: { error: any, object: any }[] 
}>({
    default: undefined,
    key: "errors-state"
})