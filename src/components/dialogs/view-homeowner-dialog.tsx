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
import ActionTooltip from "../core/action-tooltip"

type Props = {
    homeowner: HomeownerRes
}

export default function ViewHomeownerDialog({ homeowner }: Props) {
    return (
        <Dialog>
            <ActionTooltip label="View Homeowner">
                <DialogTrigger>
                    {tableIconsMap.view}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Homeowner Details</DialogTitle>
                    <DialogDescription className="py-4">
                        <UnderDevelopment />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}