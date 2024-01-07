"use client"
import UnderDevelopment from "@/src/components/core/under-development";
import { homeownerColumns, binColumns } from "@/src/components/table/columns";
import { DataTable } from "@/src/components/table/data-table";
import { Button } from "@/src/components/ui/button";
import { useLocalStorage } from "react-use";
import { ManagerRes } from '@/src/types';
import { useQuery } from "@tanstack/react-query"
import CustomLoader from "@/src/components/loaders/custom-loader";
import { GET_ALL_BINS } from "@/src/utils/server/bin";
import toast from "react-hot-toast"
import CustomError from "@/src/components/core/custom-error";
import Link from "next/link";
import AddBinDialog from "@/src/components/dialogs/add-bin-dialog"
import AddBinPackageDialog from "@/src/components/dialogs/add-bin-package-dialog";


export default function PaymentsPage() {
    const [user, setUser] = useLocalStorage<ManagerRes | null>("user", null)
    const { isPending, isError, data, error, isSuccess } = useQuery({
        queryKey: ['bins'],
        queryFn: async () => {
            if (user && user.token) {
                const homeowners = await GET_ALL_BINS(user.token)
                return homeowners
            }

        },
        retry: 3,
        staleTime: 300,
        refetchOnMount: true
    })

    if (isPending) {
        return (
            <section className="flex items-center justify-center w-full h-full">

                <CustomLoader />
            </section>
                
        )
    }

    if (isError || data === undefined) {
        toast.error("Something went wrong here")
        return (
            <CustomError />
                
        )
    }

    return (
        <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center ">
                <div className="">
                    <h1 className="font-semibold tracking-tighter text-4xl">
                        Bins
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/bins/packages">
                        <Button variant="secondary">
                            Bin Packages
                        </Button>
                    </Link>
                    <AddBinDialog />
                </div>
                
            </div>
            <>
                {
                    (isError || data === undefined) ? <CustomError /> :
                        <DataTable filterableCol="category" columns={binColumns} data={data} title="bins" />
                }
            </>
        </section>
    )
}