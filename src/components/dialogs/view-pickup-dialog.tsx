import { HomeownerRes, PickupRes } from "@/src/types"

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
import { cn } from "@/src/lib/utils"
import PickupStatusBadge from "../badges/pickup-status-badge"

type Props = {
    pickup: PickupRes
}

export default function ViewPickupDialog({ pickup }: Props) {
    const { bins, createdAt, date, driver, homeowner, payment, status, } = pickup
    return (
        <Dialog>
            <ActionTooltip label="View Pickup ">
                <DialogTrigger>
                    {tableIconsMap.view}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Pickup Details</DialogTitle>
                </DialogHeader>

                <p className="tracking-tighter text-neutral-500 text-sm uppercase">
                    Pickup Details
                </p>
                <div className="w-full grid grid-cols-2 gap-4">
                    <ViewItem label="Bin Number" value={_.toString(bins.length)} />
                    <PickupStatusBadge status={status} textCase="uppercase" />
                    <div className="col-span-2 ">
                        <ViewItem label="Pickup Date" value={format(new Date(date), "PPPP")} />
                    </div>
                    {/* homeowner */}
                    <div className="col-span-2 border-t">
                        <p className="tracking-tighter mt-1 text-neutral-500 text-sm uppercase">
                            Homeowner Details
                        </p>
                    </div>
                    <ViewItem label="other names" value={homeowner.othernames} />
                    <ViewItem label="surname" value={homeowner.surname} />
                    <ViewItem label="email" value={homeowner.email} />
                    <ViewItem label="phone" value={homeowner.phone} />
                    {/* driver */}
                    <div className="col-span-2 border-t">
                        <p className="tracking-tighter mt-1 text-neutral-500 text-sm uppercase">
                            Driver Details
                        </p>
                    </div>
                    <ViewItem label="other names" value={driver?.othernames || "N/A"} />
                    <ViewItem label="surname" value={driver?.surname || "N/A"} />
                    <ViewItem label="email" value={driver?.email || "N/A"} />
                    <ViewItem label="phone" value={driver?.phone || "N/A"} />

                    <div className="col-span-2 border-t pt-1">
                        <ViewItem label="Created At" value={format(new Date(createdAt), "PPPP")} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}