import { atom } from 'recoil'

export interface UserType {
    id: string
    displayName: string
    username: string
    authorities: string[]
    userGroups: { id: string; code?: string; displayName?: string }[]
}

export const UserSchema = atom<UserType | null>({
    key: 'user-schema',
    default: null
})
