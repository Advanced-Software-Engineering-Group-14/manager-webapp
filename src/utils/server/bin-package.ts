import { ApiResponse, DriverRes, BinPackage, BinPackageRes } from "@/src/types"
import Axios from "../axios"

type CreateBinInput = Omit<BinPackage, "isCustom">

export const CREATE_BIN_PACKAGE = async (info: CreateBinInput, token: string) => {
    try {
        const response: ApiResponse<BinPackageRes> = await Axios({
            method: "POST",
            url: `/bin-package/`,
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

export const CREATE_CUSTOM_PACKAGE = async (info: CreateBinInput, token: string) => {
    try {
        const response: ApiResponse<BinPackageRes> = await Axios({
            method: "POST",
            url: `/bin-package/custom`,
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

export const GET_BIN_PACKAGES = async (token: string) => {
    try {
        const response: ApiResponse<BinPackageRes[]> = await Axios({
            method: "GET",
            url: `/bin-package/`,
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

export const GET_SINGLE_PACKAGE = async (id: string, token: string) => {
    try {
        const response: ApiResponse<BinPackageRes> = await Axios({
            method: "GET",
            url: `/bin-package/${id}`,
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

export const DELETE_PACKAGE = async (id: string, token: string) => {
    try {
        const response: ApiResponse<BinPackageRes> = await Axios({
            method: "DELETE",
            url: `/bin-package/${id}`,
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