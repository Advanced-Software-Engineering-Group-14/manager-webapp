import { HomeownerRes, PaymentRes } from "@/src/types"

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
import PaymentResponseBadge from "../badges/payment-response-badge"

type Props = {
    payment: PaymentRes
}

export default function ViewPaymentDialog({ payment }: Props) {
    const { homeowner, createdAt,  paymentType, refNumber, paymentMethod, response, totalAmount } = payment
    return (
        <Dialog>
            <ActionTooltip label="View Pickup ">
                <DialogTrigger>
                    {tableIconsMap.view}
                </DialogTrigger>
            </ActionTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View Payment Details</DialogTitle>
                </DialogHeader>

                <p className="tracking-tighter text-neutral-500 text-sm uppercase">
                    Payment Details
                </p>
                <div className="w-full grid grid-cols-2 gap-4">
                    <ViewItem label="method" value={_.capitalize(_.replace(paymentMethod, "_", " "))} />
                    <PaymentResponseBadge status={response} textCase="uppercase" />
                    <ViewItem label="Amount" value={`GHC ${_.toString(totalAmount)}`} />
                    <ViewItem label="Type" value={_.capitalize(paymentType)} />
                    <ViewItem label="Reference Number" value={refNumber} />

                   
                    <div className="col-span-2 border-t">
                        <p className="tracking-tighter mt-1 text-neutral-500 text-sm uppercase">
                            Homeowner Details
                        </p>
                    </div>
                    <ViewItem label="other names" value={homeowner.othernames} />
                    <ViewItem label="surname" value={homeowner.surname} />
                    <ViewItem label="email" value={homeowner.email} />
                    <ViewItem label="phone" value={homeowner.phone} />
                   

                    <div className="col-span-2 border-t pt-1">
                        <ViewItem label="Created At" value={format(new Date(createdAt), "PPPP")} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}