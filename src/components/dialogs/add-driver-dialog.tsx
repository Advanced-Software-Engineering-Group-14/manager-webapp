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
import { Button } from "../ui/button"
import AddDriverForm from "../forms/add-driver-form"




export default function AddDriverDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="">
                    Add Driver
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Driver </DialogTitle>
                </DialogHeader>
                <AddDriverForm />
            </DialogContent>
        </Dialog>

    )
}