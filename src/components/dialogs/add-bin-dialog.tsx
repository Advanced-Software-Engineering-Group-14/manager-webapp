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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import AddSingleBinForm from "../forms/add-single-bin-form"
import AddMultipleBinForm from "../forms/add-multiple-bin-form"




export default function AddBinDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="">
                    Add Bin
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Add New Bin(s) </DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="single" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger className="w-full" value="single">Single</TabsTrigger>
                        <TabsTrigger className="w-full" value="multiple">Multiple</TabsTrigger>
                    </TabsList>
                    <TabsContent value="single">
                        <AddSingleBinForm />
                    </TabsContent>
                    <TabsContent value="multiple">
                       <AddMultipleBinForm />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>

    )
}