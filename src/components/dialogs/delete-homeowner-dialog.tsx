import { HomeownerRes, ManagerRes } from "@/src/types"

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
import { DELETE_HOMEOWNER } from "@/src/utils/server/homeowner";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";



type Props = {
    homeowner: HomeownerRes
}

export default function DeleteHomeownerDialog({ homeowner }: Props) {
    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<ManagerRes | null>("user", null)

    const deleteHomeowner = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return DELETE_HOMEOWNER(homeowner._id, user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (deleted) => {
            queryClient.setQueryData(['homeowners'], (oldData: HomeownerRes[]) => {
                return oldData ? oldData.filter((item) => item._id !== homeowner._id) : oldData
            })
            toast.success("Deleted homeowner successfully")
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Couldn't delete homeowner. Try again later")
        }
    })

    function onSubmit() {
        deleteHomeowner.mutate(undefined)
    }

    return (
        <Dialog>
            <DialogTrigger>
                {tableIconsMap.delete}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this account
                        and remove their data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <Button onClick={onSubmit} variant="destructive">
                    Delete Homeowner
                </Button>
            </DialogContent>
        </Dialog>

    )
}