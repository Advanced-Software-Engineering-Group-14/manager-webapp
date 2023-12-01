import { HomeownerRes } from "@/src/types"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog"
import { tableIconsMap } from "../table/table-icons-map"
import UnderDevelopment from "../core/under-development"



type Props = {
    homeowner: HomeownerRes
}

export default function EditHomeownerDialog({ homeowner }: Props) {
    return (
        <Dialog>
            <DialogTrigger>
                {tableIconsMap.edit}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Homeowner Details</DialogTitle>
                    <DialogDescription className="py-4">
                        <UnderDevelopment />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}