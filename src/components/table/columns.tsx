"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DriverRes, HomeownerRes } from "@/src/types"
import { DataTableColumnHeader } from "./data-table-column-header"
import ViewDriverDialog from "../dialogs/view-driver-dialog"
import EditDriverDialog from "../dialogs/edit-driver-dialog"
import DeleteDriverDialog from "../dialogs/delete-driver-dialog"
import ViewHomeownerDialog from "../dialogs/view-homeowner-dialog"
import ApproveHomeownerDialog from "../dialogs/approve-homeowner-dialog"
import RejectHomeownerDialog from "../dialogs/reject-homeowner-dialog"
import SuspendHomeownerDialog from "../dialogs/suspend-homeowner-dialog"
import UnsuspendHomeownerDialog from "../dialogs/unsuspend-homeowner-dialog"


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
        accessorKey: "rating",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rating" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <ViewDriverDialog driver={row.original} />
                <EditDriverDialog driver={row.original} />
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
        accessorKey: "rating",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rating" />
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