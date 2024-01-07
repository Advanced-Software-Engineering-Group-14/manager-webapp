import { BinPackageRes, ManagerRes } from "@/src/types"

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
import { DELETE_PACKAGE } from "@/src/utils/server/bin-package";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";
import ActionTooltip from "../core/action-tooltip"



type Props = {
    binPackage: BinPackageRes
}

export default function DeleteBinPackageDialog({ binPackage }: Props) {
    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<ManagerRes | null>("user", null)

    const deleteBin = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return DELETE_PACKAGE(binPackage._id, user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (deleted) => {
            queryClient.setQueryData(['bin-packages'], (oldData: BinPackageRes[]) => {
                return oldData ? oldData.filter((item) => item._id !== binPackage._id) : oldData
            })
            toast.success("Deleted package successfully")
        },
        onError: (error: any) => {
            console.log(error.response)
            toast.error(error?.response?.data?.message || "Couldn't delete package. Try again later")
        }
    })

    function onSubmit() {
        deleteBin.mutate(undefined)
    }

    return (
        <Dialog>
            <ActionTooltip label="Delete Package">
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

                    Delete Package
                </Button>
            </DialogContent>
        </Dialog>

    )
}