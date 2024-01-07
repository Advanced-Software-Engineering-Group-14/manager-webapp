"use client"
import UnderDevelopment from "@/src/components/core/under-development";
import { homeownerColumns, binPackageColumns,  } from "@/src/components/table/columns";
import { DataTable } from "@/src/components/table/data-table";
import { Button } from "@/src/components/ui/button";
import { useLocalStorage } from "react-use";
import { ManagerRes } from '@/src/types';
import { useQuery } from "@tanstack/react-query"
import CustomLoader from "@/src/components/loaders/custom-loader";
import { GET_BIN_PACKAGES } from "@/src/utils/server/bin-package";
import toast from "react-hot-toast"
import CustomError from "@/src/components/core/custom-error";
import Link from "next/link";
import AddBinDialog from "@/src/components/dialogs/add-bin-dialog"
import AddBinPackageDialog from "@/src/components/dialogs/add-bin-package-dialog";


export default function PackagesPage() {
    const [user, setUser] = useLocalStorage<ManagerRes | null>("user", null)
    const { isPending, isError, data, error, isSuccess } = useQuery({
        queryKey: ['bin-packages'],
        queryFn: async () => {
            if (user && user.token) {
                const homeowners = await GET_BIN_PACKAGES(user.token)
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
                        Bin Packages
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <AddBinPackageDialog />
                    <Link href="/bins/">
                        <Button >
                            View Bins
                        </Button>
                    </Link>
                </div>
                
            </div>
            <>
                {
                    (isError || data === undefined) ? <CustomError /> :
                        <DataTable filterableCol="name" columns={binPackageColumns} data={data} title="bin packages" />
                }
            </>
        </section>
    )
}