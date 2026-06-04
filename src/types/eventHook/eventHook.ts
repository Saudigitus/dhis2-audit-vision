export interface EventHookSource {
    path: string
    fields: string
}

export interface EventHookTarget {
    type: string
    clientId: string
    url: string
    contentType: string
    headers: Record<string, string>
    auth: {
        type: string
        token: string
    }
}

export interface EventHookAccess {
    manage: boolean
    externalize: boolean
    write: boolean
    read: boolean
    update: boolean
    delete: boolean
}

export interface EventHook {
    id: string
    name: string
    displayName: string
    translations: any[]
    externalAccess: boolean
    publicAccess: string
    userGroupAccesses: any[]
    userAccesses: any[]
    access: EventHookAccess
    favorites: any[]
    disabled: boolean
    source: EventHookSource
    targets: EventHookTarget[]
    favorite: boolean
    attributeValues: any[]
}
