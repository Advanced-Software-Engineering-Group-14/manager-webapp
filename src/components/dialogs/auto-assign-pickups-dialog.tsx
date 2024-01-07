"use client"
import UnderDevelopment from "@/src/components/core/under-development";
import { homeownerColumns, pickupColumns } from "@/src/components/table/columns";
import { DataTable } from "@/src/components/table/data-table";
import { useLocalStorage } from "react-use";
import { ManagerRes, PickupRes } from '@/src/types';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import CustomLoader from "@/src/components/loaders/custom-loader";
import { ASSIGN_PICKUPS_AUTO } from "@/src/utils/server/pickup";
import toast from "react-hot-toast"
import CustomError from "@/src/components/core/custom-error";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/src/components/ui/dialog"
import ActionTooltip from "../core/action-tooltip"
import { Button } from "../ui/button"



export default function AutoAssignPickupsDialog() {
    const queryClient = useQueryClient()

    const [user, setUser] = useLocalStorage<ManagerRes | null>("user", null)

    const autoAssignPickup = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return ASSIGN_PICKUPS_AUTO(user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (edited) => {
            queryClient.setQueryData(['pickups'], (oldData: PickupRes[]) => {
                return edited
            })
            toast.success("Approved homeowner successfully")
        },
        onError: (error: any) => {
            console.log(error)
            toast.error(error?.response?.data || "Couldn't approve homeowner. Try again later")
            return error?.response?.data || "Couldn't approve homeowner. Try again later"

        }
    })

    function onSubmit() {
        autoAssignPickup.mutate(undefined)
    }






    return (
        <Dialog>
            <ActionTooltip label="Automatically assign pickups to drivers">
                <DialogTrigger asChild>
                    <Button>
                        Auto Assign
                    </Button>

                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Auto Assign Pickups</DialogTitle>
                    <DialogDescription className="py-4">
                        {autoAssignPickup.isError ? `Could not auto-assign pickups. ${autoAssignPickup.error?.response?.data?.message}` : `Automatically assign pending pickups to available drivers. This can only be done if there are unassigned pickups`}

                    </DialogDescription>
                </DialogHeader>

                {
                    autoAssignPickup.isError ? <DialogClose>

                    </DialogClose> :
                        <Button disabled={autoAssignPickup.isPending} onClick={!autoAssignPickup.isError ? onSubmit : location.reload}>

                            Auto Assign{autoAssignPickup.isPending && "ing"}

                        </Button>
                }

            </DialogContent>
        </Dialog>

    )
}