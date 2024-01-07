import { ApiResponse, DriverRes } from "@/src/types"
import Axios from "../axios"

export type CreateDriverInput = {
    surname: string
    othernames: string
    email: string
    phone: string
    gender: "MALE" | "FEMALE"
}

export const CREATE_DRIVER = async (info: CreateDriverInput, token: string) => {
    try {
        const response:  ApiResponse<DriverRes> = await Axios({
            method: "POST",
            url: `/driver`,
            data: info,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        } 
    } catch (error) {
        throw error
    }
}


export const GET_ALL_DRIVERS = async (token: string) => {
    try {
        const response:  ApiResponse<DriverRes[]> = await Axios({
            method: "GET",
            url: `/driver`,
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

export const DELETE_DRIVER = async (id: string, token: string) => {
    try {
        const response:  ApiResponse<DriverRes> = await Axios({
            method: "DELETE",
            url: `/driver/${id}`,
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