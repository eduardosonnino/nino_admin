"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { LucideArrowUpDown, LucideChevronDown, LucideMoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type Student = {
  id: string
  name: string
  email: string
  grade: string
  class: string
  specialNeeds: string[]
  learningStyle: string
  status: "active" | "inactive"
}

const data: Student[] = [
  {
    id: "STU001",
    name: "Emma Johnson",
    email: "emma.j@school.edu",
    grade: "5th Grade",
    class: "5A",
    specialNeeds: ["Dyslexia"],
    learningStyle: "Visual",
    status: "active",
  },
  {
    id: "STU002",
    name: "Michael Chen",
    email: "michael.c@school.edu",
    grade: "8th Grade",
    class: "8C",
    specialNeeds: [],
    learningStyle: "Kinesthetic",
    status: "active",
  },
  {
    id: "STU003",
    name: "Sophia Rodriguez",
    email: "sophia.r@school.edu",
    grade: "3rd Grade",
    class: "3B",
    specialNeeds: ["ADHD"],
    learningStyle: "Auditory",
    status: "active",
  },
  {
    id: "STU004",
    name: "Ethan Williams",
    email: "ethan.w@school.edu",
    grade: "10th Grade",
    class: "10A",
    specialNeeds: [],
    learningStyle: "Reading/Writing",
    status: "active",
  },
  {
    id: "STU005",
    name: "Olivia Davis",
    email: "olivia.d@school.edu",
    grade: "7th Grade",
    class: "7D",
    specialNeeds: ["Gifted"],
    learningStyle: "Visual",
    status: "active",
  },
  {
    id: "STU006",
    name: "Noah Martinez",
    email: "noah.m@school.edu",
    grade: "6th Grade",
    class: "6B",
    specialNeeds: [],
    learningStyle: "Multimodal",
    status: "inactive",
  },
  {
    id: "STU007",
    name: "Ava Thompson",
    email: "ava.t@school.edu",
    grade: "4th Grade",
    class: "4C",
    specialNeeds: ["Autism Spectrum"],
    learningStyle: "Visual",
    status: "active",
  },
  {
    id: "STU008",
    name: "William Garcia",
    email: "william.g@school.edu",
    grade: "9th Grade",
    class: "9A",
    specialNeeds: [],
    learningStyle: "Reading/Writing",
    status: "active",
  },
  {
    id: "STU009",
    name: "Isabella Brown",
    email: "isabella.b@school.edu",
    grade: "2nd Grade",
    class: "2D",
    specialNeeds: [],
    learningStyle: "Kinesthetic",
    status: "active",
  },
  {
    id: "STU010",
    name: "James Wilson",
    email: "james.w@school.edu",
    grade: "11th Grade",
    class: "11B",
    specialNeeds: ["Hearing Impaired"],
    learningStyle: "Visual",
    status: "active",
  },
]

export function StudentTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Student>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <LucideArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="font-medium">
          <Link href={`/dashboard/students/${row.original.id}`} className="hover:underline">
            {row.getValue("name")}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "grade",
      header: "Grade",
      cell: ({ row }) => <div>{row.getValue("grade")}</div>,
    },
    {
      accessorKey: "class",
      header: "Class",
      cell: ({ row }) => <div>{row.getValue("class")}</div>,
    },
    {
      accessorKey: "specialNeeds",
      header: "Special Needs",
      cell: ({ row }) => {
        const specialNeeds = row.original.specialNeeds
        return (
          <div className="flex flex-wrap gap-1">
            {specialNeeds.length > 0 ? (
              specialNeeds.map((need, i) => (
                <Badge key={i} variant="outline">
                  {need}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">None</span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "learningStyle",
      header: "Learning Style",
      cell: ({ row }) => <div>{row.getValue("learningStyle")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return <Badge variant={status === "active" ? "default" : "secondary"}>{status}</Badge>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <LucideMoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(student.id)}>
                Copy student ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/dashboard/students/${student.id}`}>View student</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/dashboard/students/${student.id}/edit`}>Edit student</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View AI chat history</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter students..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <LucideChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-full"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
