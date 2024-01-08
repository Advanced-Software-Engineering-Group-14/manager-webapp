import UnderDevelopment from "@/src/components/core/under-development";
import AddManagerForm from "@/src/components/forms/add-manager-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card"

export default function SudoPage() {
    return (
        <div className="flex items-center justify-center  h-full">
            <Card className="w-full max-w-xl" >
                <CardHeader>
                    <CardTitle>Create A Manager</CardTitle>
                    <CardDescription className="">
                        Create a new manager account with either SUDO or ADMIN permissions
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <AddManagerForm />
                </CardContent>
            </Card>
        </div>
    )
}