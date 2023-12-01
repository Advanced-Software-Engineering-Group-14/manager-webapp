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
import { APPROVE_HOMEOWNER, } from "@/src/utils/server/homeowner";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "react-use";
import ActionTooltip from "../core/action-tooltip"



type Props = {
    homeowner: HomeownerRes
}

export default function ApproveHomeownerDialog({ homeowner }: Props) {
    const queryClient = useQueryClient()
    const [user, setUser] = useLocalStorage<ManagerRes | null>("user", null)

    const deleteHomeowner = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return APPROVE_HOMEOWNER(homeowner._id, user.token)
            }
            throw new Error("Please login again")
        },

        onSuccess: (edited) => {
            queryClient.setQueryData(['homeowners'], (oldData: HomeownerRes[]) => {
                const removeOldHomeowner = oldData ? oldData.filter((item) => item._id !== homeowner._id) : oldData
                return removeOldHomeowner ? [...removeOldHomeowner, edited] : removeOldHomeowner
            })
            toast.success("Approved homeowner successfully")
        },
        onError: (error: any) => {
            toast.error(error?.response?.data || "Couldn't approve homeowner. Try again later")
        }
    })

    function onSubmit() {
        deleteHomeowner.mutate(undefined)
    }

    return (
        <Dialog>
            <ActionTooltip label="Approve Homeowner">
                <DialogTrigger>
                    {tableIconsMap.approve}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Approve this Homeowner?</DialogTitle>
                    <DialogDescription>
                        You are about to approve this homeowner to be able to use your application. You can always reject again them later
                    </DialogDescription>
                </DialogHeader>
                <Button onClick={onSubmit}>
                    Approve Homeowner
                </Button>
            </DialogContent>
        </Dialog>

    )
}