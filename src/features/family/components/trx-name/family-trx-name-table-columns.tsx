'use client'
import { Badge } from '@/components/ui/badge'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Family, FamilyTrxName, } from '@/drizzle/type'
import { dateFormatter } from '@/lib/date-formatter'
import { ColumnDef } from '@tanstack/react-table'
import { Ban, Check, Clock3, Tag, Users } from 'lucide-react'
import { FamilyTrxNameActionCell } from './family-trx-name-action-cell'
import { useAppDispatch } from '@/hooks/redux'
import { MODAL_TYPE } from '@/constant'
import { onOpen } from '@/lib/redux/slice/modal-slice'

export type FamilyTrxNameColumn = FamilyTrxName & { family: Family }

export const familyTrxNameTableColumns: ColumnDef<FamilyTrxNameColumn>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row: { original } }) => {
            const formattedDate = dateFormatter(original?.createdAt)
            const isDeleted = original?.isDeleted
            return (
                <>
                    <CardTitle className='flex items-center gap-1.5'>
                        <span>{original?.name}</span>
                        {isDeleted
                            ? <Ban size={16} fontWeight={400} className='text-destructive' />
                            : <Check size={16} fontWeight={400} className='text-success' />
                        }
                    </CardTitle>
                    <CardDescription className='flex items-center gap-1 text-xs'>
                        <Clock3 size={12} />
                        <span>{formattedDate}</span>
                    </CardDescription>
                </>
            )
        }
    },
    {
        accessorKey: 'variant',
        header: 'Variant',
        cell: ({ row: { original } }) => {

            return (
                <Badge className='flex items-center justify-between' variant='secondary'>
                    <span>{original?.variant}</span>
                    <Tag />
                </Badge>
            )
        }
    },
    {
        accessorKey: 'family',
        header: 'Family',
        cell: ({ row: { original } }) => {

            return (
                <Badge className='flex items-center justify-between'>
                    <span>{original?.family?.name}</span>
                    <Users />
                </Badge>
            )
        }
    },
    {
        accessorKey: 'updatedAt',
        header: 'Last Updated',
        cell: ({ row: { original } }) => {
            const formattedDate = dateFormatter(original?.updatedAt)
            return (
                <Badge className='flex items-center justify-between'>
                    <span>{formattedDate}</span>
                    <Clock3 />
                </Badge>)
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row: { original } }) => {
            return (
                <FamilyTrxNameActionCell trxName={original} />
            )
        },
    },
]