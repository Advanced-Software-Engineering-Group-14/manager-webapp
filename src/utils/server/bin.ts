import { ApiResponse, DriverRes, Bin, BinRes } from "@/src/types"
import Axios from "../axios"

type CreateBinInput = Pick<Bin, "category" | "price" | "size">
type CreateMultipleBinInput = CreateBinInput & {
    count: number
}

export const GET_ALL_BINS = async (token: string) => {
    try {
        const response: ApiResponse<BinRes[]> = await Axios({
            method: "GET",
            url: `/bin/`,
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

export const CREATE_SINGLE_BIN = async (info: CreateBinInput, token: string) => {
    try {
        const response: ApiResponse<BinRes> = await Axios({
            method: "POST",
            url: `/bin/`,
            data: info,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 201 || response.status === 200) {
            return response.data.data
        } else {
            throw new Error("oops")
        }
    } catch (error) {
        throw error
    }
}

export const CREATE_MULTIPLE_BINS = async (info: CreateMultipleBinInput, token: string) => {
    try {
        const response: ApiResponse<BinRes[]> = await Axios({
            method: "POST",
            url: `/bin/multiple`,
            data: info,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 201 || response.status === 200) {
            return response.data.data
        } else {
            throw new Error("oops")
        }
    } catch (error) {
        throw error
    }
}

export const DELETE_BIN = async (id: string, token: string) => {
    try {
        const response: ApiResponse<BinRes> = await Axios({
            method: "DELETE",
            url: `/bin/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 201 || response.status === 200) {
            return response.data.data
        } else {
            throw new Error("oops")
        }
    } catch (error) {
        throw error
    }
}

