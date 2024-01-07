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
import { CREATE_BIN_PACKAGE } from "@/src/utils/server/bin-package"
import { useLocalStorage } from 'react-use';
import { ManagerRes, BinPackageRes, BinCategory, BinSizes } from '@/src/types';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select"
import { Label } from "../ui/label"


const formSchema = z.object({
    name: z.string().min(3, "Enter more than three characters"),
    price: z.coerce.number().min(1, "This field is required"),
    binNum: z.coerce.number().min(1, "This field is required"),
    category: z.custom<BinCategory>(),
    size: z.custom<BinSizes>(),
})

export default function AddBinPackageForm() {
    const [localUser, setLocalUser,] = useLocalStorage<ManagerRes | null>("user", null)
    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: 0,
            binNum: 0,
            category: "recycling",
            size: "md",
        },
    })

    const createBin = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => {
            if (localUser && localUser.token) {
                return CREATE_BIN_PACKAGE(values, localUser.token)
            }
            throw new Error("Please login again")
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const toastSubmitId = toast.loading("Creating package")

        createBin.mutate(values, {
            onSuccess: (newData) => {

                toast.success(`Package created`, {
                    id: toastSubmitId
                })

                queryClient.setQueryData([`bin-packages`], (oldData: BinPackageRes[]) => {
                    return [...oldData, newData]
                })
                location.reload()

                if (typeof window !== "undefined") {
                    location.reload()
                }
            },
            onError: (error: any) => {
                toast.error(error?.response?.data || "Couldn't create package", {
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                             <Label>
                                Package Name
                            </Label>
                            <FormControl>
                                <Input  className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={createBin.isPending} placeholder="e.g. Enterprise Large" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                             <Label>
                                Price
                            </Label>
                            <FormControl>
                                <Input type="number" className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={createBin.isPending} placeholder="Price (GHC)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="binNum"
                    render={({ field }) => (
                        <FormItem>
                             <Label>
                                No of Bins
                            </Label>
                            <FormControl>
                                <Input type="number" className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={createBin.isPending} placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
               

                <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                        <FormItem>
                            <Label>
                                Bin Size
                            </Label>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a size" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Size</SelectLabel>
                                        <SelectItem value="sm">Small</SelectItem>
                                        <SelectItem value="md">Medium</SelectItem>
                                        <SelectItem value="lg">Large</SelectItem>

                                    </SelectGroup>

                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <Label>
                                Category
                            </Label>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="recycling">Recycling</SelectItem>
                                        <SelectItem value="trash">Trash</SelectItem>

                                    </SelectGroup>

                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={createBin.isPending} className=" w-full" type="submit">
                    {createBin.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                    Submit
                </Button>
            </form>
        </Form>
    )

}