import { ApiResponse, HomeownerRes, PickupRes } from "@/src/types"
import Axios from "../axios"



export const ASSIGN_PICKUPS_AUTO = async (token: string) => {
    try {
        const response: ApiResponse<PickupRes[]> = await Axios({
            method: "PATCH",
            url: `/pickup/assign/auto`,
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


export const GET_OVERDUE_PICKUPS = async (token: string) => {
    try {
        const response: ApiResponse<PickupRes[]> = await Axios({
            method: "GET",
            url: `/pickup/overdue`,
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
export const GET_PICKUPS_BY_DATE = async (date: string, token: string) => {
    try {
        const response: ApiResponse<PickupRes[]> = await Axios({
            method: "GET",
            url: `/pickup/date/${date}`,
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

export const GET_ALL_PICKUPS = async (token: string) => {
    try {
        const response: ApiResponse<PickupRes[]> = await Axios({
            method: "GET",
            url: `/pickup/`,
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




