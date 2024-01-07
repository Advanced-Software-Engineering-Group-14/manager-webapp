import UnderDevelopment from "@/src/components/core/under-development"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

export default function Tickets() {
    return (
        <>
            <Tabs defaultValue="tickets" className="w-full h-full mx-auto">
                <TabsList className="w-full max-w-2xl mx-auto">
                    <TabsTrigger className="w-full" value="tickets">Tickets</TabsTrigger>
                    <TabsTrigger className="w-full" value="issues">Issues</TabsTrigger>
                </TabsList>
                <TabsContent className="h-full" value="tickets">
                    <UnderDevelopment />
                </TabsContent>
                <TabsContent className="h-full" value="issues">
                    <UnderDevelopment />

                </TabsContent>
            </Tabs>
        </>
    )
}