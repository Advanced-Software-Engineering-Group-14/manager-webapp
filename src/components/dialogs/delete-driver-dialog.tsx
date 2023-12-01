import { DriverRes, ManagerRes } from "@/src/types"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog"
import { tableIconsMap } from "../table/table-icons-map"
import { Button } from "../ui/button"
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { DELETE_DRIVER } from "@/src/utils/server/driver";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";
import ActionTooltip from "../core/action-tooltip"



type Props = {
    driver: DriverRes
}

export default function DeleteDriverDialog({ driver }: Props) {
    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<ManagerRes | null>("user", null)

    const deleteDriver = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return DELETE_DRIVER(driver._id, user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (deleted) => {
            queryClient.setQueryData(['drivers'], (oldData: DriverRes[]) => {
                return oldData ? oldData.filter((item) => item._id !== driver._id) : oldData
            })
            toast.success("Deleted driver successfully")
        },
        onError: (error: any) => {
            toast.error(error?.response?.data || "Couldn't delete driver. Try again later")
        }
    })

    function onSubmit() {
        deleteDriver.mutate(undefined)
    }

    return (
        <Dialog>
            <ActionTooltip label="Delete Driver">
                <DialogTrigger>
                    {tableIconsMap.delete}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this account
                        and remove their data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <Button onClick={onSubmit} variant="destructive">
                    Delete Driver
                </Button>
            </DialogContent>
        </Dialog>

    )
}