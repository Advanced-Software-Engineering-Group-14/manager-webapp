import { ApiResponse, HomeownerRes, PaymentRes } from "@/src/types"
import Axios from "../axios"

export const GET_ALL_PAYMENTS = async (token: string) => {
    try {
        const response: ApiResponse<PaymentRes[]> = await Axios({
            method: "GET",
            url: `/payment/`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            return response.data.data
        } else {
            throw new Error("oops")
        }
    } catch (error) {
        throw error
    }
}

export const GET_PAYMENTS_BY_HOMEOWNER = async (id: string,token: string) => {
    try {
        const response: ApiResponse<PaymentRes[]> = await Axios({
            method: "GET",
            url: `/payment/homeowner/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            return response.data.data
        } else {
            throw new Error("oops")
        }
    } catch (error) {
        throw error
    }
}