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
import ViewItem from "../core/view-item"
import { format } from "date-fns"
import _ from "lodash"

type Props = {
    driver: DriverRes
}

export default function ViewDriverDialog({ driver }: Props) {
    const { createdAt, email, gender, phone, surname, othernames, meta, } = driver
    return (
        <Dialog>
            <ActionTooltip label="View Driver">
                <DialogTrigger>
                    {tableIconsMap.view}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Driver Details</DialogTitle>
                </DialogHeader>
                <div className="w-full grid grid-cols-2 gap-4">
                    <ViewItem label="other names" value={othernames} />
                    <ViewItem label="surname" value={surname} />
                    <ViewItem label="email" value={email} />
                    <ViewItem label="phone" value={phone} />
                    <ViewItem label="gender" value={_.capitalize(gender)} />
                    <ViewItem label="status" value={meta.isSuspended ? "Suspended" : "Not Suspended"} />
                    <div className="col-span-2">
                        <ViewItem label="Created At" value={format(new Date(createdAt), "PPPP")} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}