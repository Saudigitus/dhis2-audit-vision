export interface SqlViewAccess {
    manage: boolean;
    externalize: boolean;
    write: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    data: {
        write: boolean;
        read: boolean;
    };
}

export interface SqlViewAttributeValue {
    attribute: string;
    value: string;
}

export interface SqlView {
    name: string;
    translations: any[];
    externalAccess: boolean;
    publicAccess: string;
    userGroupAccesses: any[];
    userAccesses: any[];
    access: SqlViewAccess;
    favorites: any[];
    sqlQuery: string;
    type: string;
    cacheStrategy: string;
    displayName: string;
    favorite: boolean;
    id: string;
    attributeValues: SqlViewAttributeValue[];
    description?: string;
}
