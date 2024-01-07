"use client"
import { Button } from "@/src/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { useState } from "react"
import { CREATE_DRIVER } from "@/src/utils/server/driver"
import { useLocalStorage } from 'react-use';
import { ForgotStoreType, ManagerRes, Gender, DriverRes } from '@/src/types';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select"
import Link from "next/link"


const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email"
    }).min(10, {
        message: "Please enter more than 10 characters"
    }),
    othernames: z.string().min(2, "Othernames should be more than 2 characters"),
    surname: z.string().min(2, "Surname should be more than 2 characters"),
    phone: z.string().min(10, "Phone number should be at least 10 characters"),
    gender: z.custom<Gender>(),
})

export default function AddDriverForm() {
    const [localUser, setLocalUser,] = useLocalStorage<ManagerRes | null>("user", null)
    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            othernames: "",
            surname: "",
            phone: "",
            gender: "MALE",
        },
    })

    const createDriver = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => {
            if (localUser && localUser.token) {
                return CREATE_DRIVER(values, localUser.token)
            }
            throw new Error("Please login again")
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const toastSubmitId = toast.loading("Creating driver")

        createDriver.mutate(values, {
            onSuccess: (newData) => {

                toast.success(`Driver created`, {
                    id: toastSubmitId
                })

                queryClient.setQueryData([`drivers`], (oldData: DriverRes[]) => {
                    return [...oldData, newData]
                })
                location.reload()
    
                if (typeof window !== "undefined") {
                    location.reload()
                }
            },
            onError: (error: any) => {
                toast.error(error?.response?.data || "Couldn't create driver", {
                    id: toastSubmitId
                })
                console.log(error);

            }

        })

    }


    return (

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
                    <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={createDriver.isPending} placeholder="Surname" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="othernames"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={createDriver.isPending} placeholder="Other names" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={createDriver.isPending} placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={createDriver.isPending} placeholder="Phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                />
                
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a gender" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Gender</SelectLabel>
                                        <SelectItem value="MALE">Male</SelectItem>
                                        <SelectItem value="FEMALE">Female</SelectItem>

                                    </SelectGroup>

                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
               
                    <Button disabled={createDriver.isPending} className=" w-full" type="submit">
                        {createDriver.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                        Submit
                    </Button>
                </form>
            </Form>
    )

}