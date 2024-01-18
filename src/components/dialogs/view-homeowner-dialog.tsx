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
import ViewItem from "../core/view-item"
import { format } from "date-fns"
import _ from "lodash"
import UserAvatar from "../core/user-avatar"
import { cn } from "@/src/lib/utils"

type Props = {
    homeowner: HomeownerRes
}

export default function ViewHomeownerDialog({ homeowner }: Props) {
    const { bins, createdAt, email, gender, identification, meta, othernames, package: hmPackage, phone, surname, residence, profileImageUrl } = homeowner
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
                </DialogHeader>
                <p className="tracking-tighter text-neutral-500 text-sm uppercase">
                    Personal Details
                </p>
                <div className="w-full grid grid-cols-2 gap-4">
                    <div className="row-span-3 w-full flex items-center justify-center">
                        <UserAvatar
                            name={`${othernames} ${surname}`}
                            img={profileImageUrl}
                            size="2xl"
                        />
                    </div>
                    <div className={cn("text-white px-4 py-2 text-xs rounded-lg uppercase w-max", meta.isApproved ? "bg-emerald-500" : "bg-destructive")}>
                        {meta.isApproved ? "Approved" : "Rejected"}
                    </div>

                    <ViewItem label="other names" value={othernames} />
                    <ViewItem label="surname" value={surname} />
                    <ViewItem label="email" value={email} />
                    <ViewItem label="phone" value={phone} />
                    <ViewItem label="residence" value={residence || "N/A"} />
                    <ViewItem label="ID Type" value={_.capitalize(identification.idType) || "N/A"} />
                    <ViewItem label="ID number" value={_.capitalize(identification.no) || "N/A"} />
                    <ViewItem label="gender" value={_.capitalize(gender)} />
                    <ViewItem label="status" value={meta.isSuspended ? "Suspended" : "Not Suspended"} />
                    <div className="col-span-2 border-t">
                        <p className="tracking-tighter mt-1 text-neutral-500 text-sm uppercase">
                            Package Details
                        </p>
                    </div>
                    <ViewItem label="Package Name" value={hmPackage?.name || "N/A"} />
                    <ViewItem label="Bin Number" value={_.toString(bins.length)} />

                    <div className="col-span-2 border-t">
                        
                    </div>
                    <div className="col-span-2">
                        <ViewItem label="Created At" value={format(new Date(createdAt), "PPPP")} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}