import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog"
import { Button } from "../ui/button"
import AddBinPackageForm from "../forms/add-bin-package-form"




export default function AddBinPackageDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="">
                    Add Bin Package
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Add New Bin Package </DialogTitle>
                </DialogHeader>
                <AddBinPackageForm />
            </DialogContent>
        </Dialog>

    )
}