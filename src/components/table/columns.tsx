"use client"
import _ from "lodash"
import { ColumnDef } from "@tanstack/react-table"
import { BinPackageRes, BinRes, DriverRes, HomeownerRes, PaymentRes, PickupRes } from "@/src/types"
import { DataTableColumnHeader } from "./data-table-column-header"
import ViewDriverDialog from "../dialogs/view-driver-dialog"
import EditDriverDialog from "../dialogs/edit-driver-dialog"
import DeleteDriverDialog from "../dialogs/delete-driver-dialog"
import ViewHomeownerDialog from "../dialogs/view-homeowner-dialog"
import ApproveHomeownerDialog from "../dialogs/approve-homeowner-dialog"
import RejectHomeownerDialog from "../dialogs/reject-homeowner-dialog"
import SuspendHomeownerDialog from "../dialogs/suspend-homeowner-dialog"
import UnsuspendHomeownerDialog from "../dialogs/unsuspend-homeowner-dialog"
import ViewPickupDialog from "../dialogs/view-pickup-dialog"
import PickupStatusBadge from "../badges/pickup-status-badge"
import ViewPaymentDialog from "../dialogs/view-payment-dialog"
import ViewBinDialog from "../dialogs/view-bin-dialog"
import ViewBinPackageDialog from "../dialogs/view-bin-package-dialog"
import DeleteBinPackageDialog from "../dialogs/delete-bin-package-dialog"
import DeleteBinDialog from "../dialogs/delete-bin-dialog"



export const driversColumns: ColumnDef<DriverRes>[] = [
    {
        accessorKey: "othernames",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Full Name" />
        ),
        cell: ({ row }) => (
            <>
                {row.original.othernames} {row.original.surname}
            </>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone Number" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <ViewDriverDialog driver={row.original} />
                {/* <EditDriverDialog driver={row.original} /> */}
                <DeleteDriverDialog driver={row.original} />

            </div>
        ),
    }

]

export const homeownerColumns: ColumnDef<HomeownerRes>[] = [
    {
        accessorKey: "othernames",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Full Name" />
        ),
        cell: ({ row }) => (
            <>
                {row.original.othernames} {row.original.surname}
            </>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone Number" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <ViewHomeownerDialog homeowner={row.original} />

                {
                    row.original.meta.isApproved ? <RejectHomeownerDialog homeowner={row.original} /> :
                        <ApproveHomeownerDialog homeowner={row.original} />
                }
                {
                    row.original.meta.isSuspended ? <UnsuspendHomeownerDialog homeowner={row.original} /> :
                        <SuspendHomeownerDialog homeowner={row.original} />
                }


            </div>
        ),
    }

]


export const pickupColumns: ColumnDef<PickupRes>[] = [
    {
        id: "homeowner-name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Homeowner" />
        ),
        cell: ({ row }) => (
            <div className="flex gap-2 items-center">
                {row.original.homeowner.othernames} {row.original.homeowner.surname} 
                <PickupStatusBadge status={row.original.status} sm />

            </div>
        ),
    },
    {
        id: "homeowner-email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Homeowner Email" />
        ),
        cell: ({ row }) => (
            <>
                {row.original.homeowner?.email || "N/A"} 
            </>
        ),
    },
    {
        accessorKey: "driver",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Driver" />
        ),
        cell: ({ row }) => (
            <>
                {row.original.driver?.othernames || "N/A"} {row.original.driver?.surname || ""} 
            </>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
               <ViewPickupDialog pickup={row.original} />
            </div>
        ),
    }

]


export const paymentColumns: ColumnDef<PaymentRes>[] = [
    {
        id: "homeowner-name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Homeowner" />
        ),
        cell: ({ row }) => (
            <div className="flex gap-2 items-center">
                {row.original.homeowner.othernames} {row.original.homeowner.surname} 

            </div>
        ),
    },
    {
        accessorKey: "totalAmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => (
            <>
              GHC  {_.toString(row.original.totalAmount)} 
            </>
        ),
    },
    {
        accessorKey: "refNumber",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ref Number" />
        ),
        cell: ({ row }) => (
            <>
                {row.original.refNumber} 
            </>
        ),
    },
    {
        accessorKey: "paymentType",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => (
            <>
                {_.capitalize(row.original.paymentType)} 
            </>
        ),
    },
    {
        accessorKey: "response",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Response" />
        ),
        cell: ({ row }) => (
            <>
                {_.capitalize(row.original.response)} 
            </>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <ViewPaymentDialog payment={row.original} />
            </div>
        ),
    }

]

export const binColumns: ColumnDef<BinRes>[] = [
    
    {
        accessorKey: "category",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => (
            <>
             {_.capitalize(row.original.category)} 
            </>
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => (
            <>
            GHC {_.toString(row.original.price)} 
            </>
        ),
    },
    {
        accessorKey: "size",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Size" />
        ),
        cell: ({ row }) => (
            <>
             {_.toUpper(row.original.size)} 
            </>
        ),
    },
    
   
    {
        id: "homeowner-name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Homeowner" />
        ),
        cell: ({ row }) => (
            <div className="flex gap-2 items-center">
                {row.original.homeowner?.othernames || "N/A"} {row.original.homeowner?.surname || ""} 

            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <ViewBinDialog bin={row.original} />
                <DeleteBinDialog bin={row.original} />
            </div>
        ),
    }

]


export const binPackageColumns: ColumnDef<BinPackageRes>[] = [
    
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Package Name" />
        ),
        cell: ({ row }) => (
            <>
             {_.capitalize(row.original.name)} 
            </>
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => (
            <>
            GHC {_.toString(row.original.price)} 
            </>
        ),
    },
    {
        accessorKey: "size",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Size" />
        ),
        cell: ({ row }) => (
            <>
             {_.toUpper(row.original.size)} 
            </>
        ),
    },
    
   
    {
        accessorKey: "binNum",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No of bins" />
        ),
        cell: ({ row }) => (
            <div className="flex gap-2 items-center">
                {row.original.binNum}  

            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <ViewBinPackageDialog binPackage={row.original} />
                <DeleteBinPackageDialog binPackage={row.original} />
            </div>
        ),
    }

]

