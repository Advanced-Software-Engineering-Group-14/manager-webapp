import { Badge } from "@/src/components/ui/badge"
import { cn } from "@/src/lib/utils"
import { PickupStatus } from "@/src/types"
import { ClassValue } from "clsx"
import _ from "lodash"

type Props = {
    status: PickupStatus
    textCase?: "capitalize" | "uppercase"
    sm?: boolean
}

type VariantMap = {
    pending: ClassValue
    assigned: ClassValue
    ongoing: ClassValue
    completed: ClassValue
    cancelled: ClassValue
    paid: ClassValue
}

export default function PickupStatusBadge({ status, textCase, sm }: Props) {

    const variantsMap: VariantMap = {
        pending: "bg-neutral-500",
        assigned: "bg-yellow-500",
        ongoing: "bg-blue-500",
        completed: "bg-emerald-500",
        paid: "bg-violet-500",
        cancelled: "bg-destructive",
    }

    return (
        <Badge className={cn("w-max py-1 px-4 rounded-lg font-light", sm && "w-2 p-0 h-2   ", variantsMap[status])}>
            {
                !sm && <>
                    {
                        textCase === "uppercase" ? _.toUpper(status) : _.capitalize(status)
                    }
                </>
            }
        </Badge>
    )
}