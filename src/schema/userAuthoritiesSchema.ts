import { atom } from 'recoil'

export const UserAuthoritiesSchema = atom<string[]>({
    key: 'user-authorities-schema',
    default: [],
})
