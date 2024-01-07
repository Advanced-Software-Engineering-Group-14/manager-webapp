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

export type Gender = "MALE" | "FEMALE"

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
    gender: Gender
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
        isVerified: boolean
    }
    verification: {
        code: string
        expiresAt: string
    }
    rating: number | 0
    profileImageUrl: string | ""
    gender: Gender
    residence: string
    identification: {
        idType: "VOTER" | "COUNTRY" | "DRIVER"
        no: string
        imageUrl: string
    }
    bins: Bin[]
    package: BinPackage
}

export type BinSizes =  "sm" | "md" | "lg"


export type BinPackage = {
    name: string
    price: number
    size: BinSizes
    binNum: number
    isCustom: boolean
}

export type BinPackagePayment = {
    package: BinPackage
    homeowner: Homeowner
    payment: Payment
}

export type Payment = {
    paymentType: "pickup" | "bin"
    paymentMethod: "card" | "mobile_money" | "bank"
    response: "success" | "failure"
    totalAmount: number
    refNumber: string
    homeowner: Homeowner
}

export type BinCategory = "recycling" | "trash"
export type BinStatus = "full" | "empty"

export type Bin = {
    category: BinCategory
    status: BinStatus
    price: number
    isCustom: boolean
    size: BinSizes
    homeowner: Homeowner
}

export type Pickup = {
    date: Date
    status: PickupStatus
    bins: Bin[]
    homeowner: Homeowner
    driver: Driver
    payment: Payment
}

export type EducationalContent = {
    title: string
    description: string
    content: string
    author: Manager
}

export type SupportTicket = {
    homeowner: Homeowner
    status: SupportTicketStatus
    title: string
    description: string
}


export type Issue = {
    title: string
    description: string
    driver: Driver
}

export type BinRequest = {
    binNum: number
    homeowner: Homeowner
    driver: Driver
    status: BinRequestStatus
    payment: Payment
}

export type PickupSettings = {
    dailyPickupLimitPerDriver: number
    pickupPrice: number
}

export type PickupStatus = "pending" | "assigned" | "ongoing" | "completed" | "cancelled" | "paid"
export type BinRequestStatus = "pending" | "processing" | "accepted" | "delivered" | "cancelled" | "paid"
export type SupportTicketStatus = "pending" | "ongoing" | "resolved" | "cancelled"

export type ManagerRes = Manager & MongoResponse
export type DriverRes = Driver & MongoResponse
export type HomeownerRes = Homeowner & MongoResponse
export type BinRes = Bin & MongoResponse
export type BinPackageRes = BinPackage & MongoResponse
export type BinPackagePaymentRes = BinPackagePayment & MongoResponse
export type BinRequestRes = BinRequest & MongoResponse
export type PaymentRes = Payment & MongoResponse
export type PickupRes = Pickup & MongoResponse
export type EducationalContentRes = EducationalContent & MongoResponse
export type SupportTicketRes = SupportTicket & MongoResponse
export type IssueRes = Issue & MongoResponse
export type PickupSettingsRes = PickupSettings & MongoResponse


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