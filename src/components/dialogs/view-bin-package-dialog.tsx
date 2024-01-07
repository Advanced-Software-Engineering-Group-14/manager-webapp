import { HomeownerRes, BinPackageRes } from "@/src/types"

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
    binPackage: BinPackageRes
}

export default function ViewBinPackageDialog({ binPackage }: Props) {
    const { name, createdAt, binNum, isCustom, price, size } = binPackage
    return (
        <Dialog>
            <ActionTooltip label="View Package ">
                <DialogTrigger>
                    {tableIconsMap.view}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Package Details</DialogTitle>
                </DialogHeader>

                <p className="tracking-tighter text-neutral-500 text-sm uppercase">
                    Package Details
                </p>
                <div className="w-full grid grid-cols-2 gap-4">
                    <ViewItem label="Name" value={_.capitalize(name)} />
                    <ViewItem label="Size" value={_.toUpper(size)} />
                    <ViewItem label="Price" value={`GHC ${_.toString(price)}`} />
                    <ViewItem label="No of bins" value={`${_.toString(binNum)}`} />
                    <ViewItem label="Custom Status" value={isCustom ? "Custom" : "Default"} />
                    {/* <PickupStatusBadge status={status} textCase="uppercase" /> */}
                  
                    
                    <div className="col-span-2 border-t pt-1">
                        <ViewItem label="Created At" value={format(new Date(createdAt), "PPPP")} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}