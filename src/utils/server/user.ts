import { ApiResponse, ManagerRes } from "@/src/types"
import Axios from "../axios"
import _ from "lodash"

type UpdateUserDetailsInput = Pick<ManagerRes, "surname" | "othernames" | "phone">

type CreateManagerInput = Pick<ManagerRes, "email" | "othernames" | "phone" | "role" | "surname" >

type ChangePasswordInput = {
    email: string
    oldPassword: string
    newPassword: string
}

export const UPDATE_USER = async (info: UpdateUserDetailsInput,  token: string) =>{
    try {
        const response:  ApiResponse<ManagerRes> = await Axios({
            method: "PUT",
            url: `/manager/update-details`,
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

export const CHANGE_USER_PASSWORD = async (info: ChangePasswordInput,  token: string) =>{
    try {
        const response:  ApiResponse<ManagerRes> = await Axios({
            method: "POST",
            url: `/manager/change-password`,
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

export const CREATE_USER = async (info: CreateManagerInput,  token: string) =>{
    try {
        const response:  ApiResponse<ManagerRes> = await Axios({
            method: "POST",
            url: `/manager/`,
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