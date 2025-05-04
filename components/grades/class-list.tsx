"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LucidePencil, LucideTrash, LucidePlus } from "lucide-react"
import { useState } from "react"

interface ClassListProps {
  gradeId: number
}

export function ClassList({ gradeId }: ClassListProps) {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "5A",
      teacher: "Ms. Johnson",
      students: 26,
      subjects: ["Math", "Science", "English", "History"],
    },
    {
      id: 2,
      name: "5B",
      teacher: "Mr. Rodriguez",
      students: 24,
      subjects: ["Math", "Science", "English", "History"],
    },
    {
      id: 3,
      name: "5C",
      teacher: "Mrs. Williams",
      students: 25,
      subjects: ["Math", "Science", "English", "History"],
    },
    {
      id: 4,
      name: "5D",
      teacher: "Mr. Chen",
      students: 27,
      subjects: ["Math", "Science", "English", "History"],
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newClass, setNewClass] = useState({
    name: "",
    teacher: "",
    subjects: "",
  })

  const handleAddClass = () => {
    const newId = classes.length > 0 ? Math.max(...classes.map((c) => c.id)) + 1 : 1
    setClasses([
      ...classes,
      {
        id: newId,
        name: newClass.name,
        teacher: newClass.teacher,
        students: 0,
        subjects: newClass.subjects.split(",").map((s) => s.trim()),
      },
    ])
    setNewClass({ name: "", teacher: "", subjects: "" })
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Classes</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <LucidePlus className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>Create a new class for this grade level.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Class Name
                </Label>
                <Input
                  id="name"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teacher" className="text-right">
                  Teacher
                </Label>
                <Input
                  id="teacher"
                  value={newClass.teacher}
                  onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subjects" className="text-right">
                  Subjects
                </Label>
                <Input
                  id="subjects"
                  value={newClass.subjects}
                  onChange={(e) => setNewClass({ ...newClass, subjects: e.target.value })}
                  placeholder="Math, Science, English, History"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddClass}>Add Class</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell className="font-medium">{cls.name}</TableCell>
                <TableCell>{cls.teacher}</TableCell>
                <TableCell>{cls.students}</TableCell>
                <TableCell>{cls.subjects.join(", ")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <LucidePencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <LucideTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
