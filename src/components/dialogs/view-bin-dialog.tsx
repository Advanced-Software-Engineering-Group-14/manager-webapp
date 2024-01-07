import { HomeownerRes, BinRes } from "@/src/types"

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

type Props = {
    bin: BinRes
}

export default function ViewBinDialog({ bin }: Props) {
    const { category, createdAt, homeowner, isCustom, price, size, status } = bin
    return (
        <Dialog>
            <ActionTooltip label="View Pickup ">
                <DialogTrigger>
                    {tableIconsMap.view}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Bin Details</DialogTitle>
                </DialogHeader>

                <p className="tracking-tighter text-neutral-500 text-sm uppercase">
                    Bin Details
                </p>
                <div className="w-full grid grid-cols-2 gap-4">
                    <ViewItem label="Category" value={_.capitalize(category)} />
                    <ViewItem label="Status" value={_.capitalize(status)} />
                    <ViewItem label="Size" value={_.toUpper(size)} />
                    <ViewItem label="Price" value={`GHC ${_.toString(price)}`} />
                    <ViewItem label="Custom Status" value={isCustom ? "Custom" : "Default"} />
                  
                    {/* homeowner */}
                    <div className="col-span-2 border-t">
                        <p className="tracking-tighter mt-1 text-neutral-500 text-sm uppercase">
                            Homeowner Details
                        </p>
                    </div>
                    <ViewItem label="other names" value={homeowner?.othernames || "N/A"} />
                    <ViewItem label="surname" value={homeowner?.surname || "N/A"} />
                    <ViewItem label="email" value={homeowner?.email || "N/A"} />
                    <ViewItem label="phone" value={homeowner?.phone || "N/A"} />
                   
                    <div className="col-span-2 border-t pt-1">
                        <ViewItem label="Created At" value={format(new Date(createdAt), "PPPP")} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}