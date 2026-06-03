import { atom } from 'recoil'

export interface UserAuthoritiesType {
    user: string[]
    all: string[]
}

export const UserAuthoritiesSchema = atom<UserAuthoritiesType>({
    key: 'user-authorities-schema',
    default: {
        user: [],
        all: []
    },
})
