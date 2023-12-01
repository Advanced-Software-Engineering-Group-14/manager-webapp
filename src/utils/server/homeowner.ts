import { ApiResponse, HomeownerRes } from "@/src/types"
import Axios from "../axios"

type CreateHomeownerInput = {
    surname: string
    othernames: string
    email: string
    phone: string
    gender: "MALE" | "FEMALE"
    password: string
}

export const CREATE_HOMEOWNER = async (info: CreateHomeownerInput, token: string) => {
    try {
        const response:  ApiResponse<HomeownerRes> = await Axios({
            method: "POST",
            url: `/homeowner`,
            data: info,
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


export const GET_ALL_HOMEOWNERS = async (token: string) => {
    try {
        const response:  ApiResponse<HomeownerRes[]> = await Axios({
            method: "GET",
            url: `/homeowner`,
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

export const DELETE_HOMEOWNER = async (id: string, token: string) => {
    try {
        const response:  ApiResponse<HomeownerRes> = await Axios({
            method: "DELETE",
            url: `/homeowner/${id}`,
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

export const APPROVE_HOMEOWNER = async (id: string, token: string) => {
    try {
        const response:  ApiResponse<HomeownerRes> = await Axios({
            method: "PATCH",
            url: `/homeowner/approve/${id}`,
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

export const REJECT_HOMEOWNER = async (id: string, token: string) => {
    try {
        const response:  ApiResponse<HomeownerRes> = await Axios({
            method: "PATCH",
            url: `/homeowner/reject/${id}`,
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

export const SUSPEND_HOMEOWNER = async (id: string, token: string) => {
    try {
        const response:  ApiResponse<HomeownerRes> = await Axios({
            method: "PATCH",
            url: `/homeowner/suspend/${id}`,
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

export const UNSUSPEND_HOMEOWNER = async (id: string, token: string) => {
    try {
        const response:  ApiResponse<HomeownerRes> = await Axios({
            method: "PATCH",
            url: `/homeowner/unsuspend/${id}`,
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