import { BinRes, ManagerRes } from "@/src/types"

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
import { DELETE_BIN } from "@/src/utils/server/bin";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";
import ActionTooltip from "../core/action-tooltip"



type Props = {
    bin: BinRes
}

export default function DeleteBinDialog({ bin }: Props) {
    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<ManagerRes | null>("user", null)

    const deleteBin = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return DELETE_BIN(bin._id, user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (deleted) => {
            queryClient.setQueryData(['bins'], (oldData: BinRes[]) => {
                return oldData ? oldData.filter((item) => item._id !== bin._id) : oldData
            })
            toast.success("Deleted bin successfully")
        },
        onError: (error: any) => {
            console.log(error.response)
            toast.error(error?.response?.data?.message || "Couldn't delete bin. Try again later")
        }
    })

    function onSubmit() {
        deleteBin.mutate(undefined)
    }

    return (
        <Dialog>
            <ActionTooltip label="Delete Bin">
                <DialogTrigger>
                    {tableIconsMap.delete}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this package
                        and remove its data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <Button disabled={deleteBin.isPending} onClick={onSubmit} variant="destructive">
                    {deleteBin.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}

                    Delete Bin
                </Button>
            </DialogContent>
        </Dialog>

    )
}