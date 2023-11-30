import { AxiosResponse } from "axios"

export type MongoResponse = {
    _id: string
    createdAt: Date
    updatedAt: Date
    __v?: number
}

export type UserRoles = "SUDO" | "ADMIN" | "DRIVER" | "HOMEOWNER"


export type Action = {
    type: string;
    payload: any;
};

export type State = {
    user: any;
};

export type Manager = {
    surname: string
    othernames: string
    email: string
    password: string
    phone: string
    token: string | null
    role: "ADMIN" | "SUDO"
    meta: {
        isFirstLogin: boolean
    }
    verification: {
        code: string
        expiresAt: string
    }
}

export type Driver = {
    surname: string
    othernames: string
    email: string
    password: string
    phone: string
    token: string | null
    meta: {
        isFirstLogin: boolean
        isSuspended: boolean
    }
    verification: {
        code: string
        expiresAt: string
    }
    rating: number | 0
    profileImageUrl: string | ""
    gender: "MALE" | "FEMALE"
}

export type Homeowner = {
    surname: string
    othernames: string
    email: string
    password: string
    phone: string
    token: string | null
    meta: {
        isFirstLogin: boolean
        isSuspended: boolean
        isApproved: boolean
    }
    verification: {
        code: string
        expiresAt: string
    }
    rating: number | 0
    profileImageUrl: string | ""
    gender: "MALE" | "FEMALE"
    residence: string
    identification: {
        idType: "VOTER" | "COUNTRY" | "DRIVER"
        no: string
        imageUrl: string
    }
}

export type ManagerRes = Manager & MongoResponse
export type DriverRes = Driver & MongoResponse
export type HomeownerRes = Homeowner & MongoResponse


export type ApiResponse<T> = AxiosResponse<{
    success: boolean
    message: string
    data: T
}>

export type ForgotStoreType = {
    username?: string
    tab: "send-code" | "verify-code" | "reset-password"
    token?: string
}