import { Badge } from "@/src/components/ui/badge"
import { cn } from "@/src/lib/utils"
import { ClassValue } from "clsx"
import _ from "lodash"

type Props = {
    status: "success" | "failure"
    textCase?: "capitalize" | "uppercase"
    sm?: boolean
}

type VariantMap = {
    success: ClassValue
    failure: ClassValue
}

export default function PaymentResponseBadge({ status, textCase, sm }: Props) {

    const variantsMap: VariantMap = {
        success: "bg-emerald-500",
        failure: "bg-destructive",
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