import { DriverRes } from "@/src/types"

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
import ActionTooltip from "../core/action-tooltip"



type Props = {
    driver: DriverRes
}

export default function EditDriverDialog({ driver }: Props) {
    return (
        <Dialog>
            <ActionTooltip label="Edit Driver">
                <DialogTrigger>
                    {tableIconsMap.edit}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Driver Details</DialogTitle>
                    <DialogDescription className="py-4">
                        <UnderDevelopment />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}