import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { LucidePlus } from "lucide-react"

export default function GradesPage() {
  const grades = [
    {
      id: 1,
      name: "Kindergarten",
      students: 120,
      classes: 5,
      promptConfig: "Basic learning, simple vocabulary, visual aids",
    },
    {
      id: 2,
      name: "1st Grade",
      students: 115,
      classes: 5,
      promptConfig: "Early reading, basic math, guided exploration",
    },
    {
      id: 3,
      name: "2nd Grade",
      students: 118,
      classes: 5,
      promptConfig: "Reading comprehension, addition/subtraction, science basics",
    },
    {
      id: 4,
      name: "3rd Grade",
      students: 112,
      classes: 4,
      promptConfig: "Multiplication, division, paragraph writing, history",
    },
    {
      id: 5,
      name: "4th Grade",
      students: 108,
      classes: 4,
      promptConfig: "Fractions, essay writing, state history, science experiments",
    },
    {
      id: 6,
      name: "5th Grade",
      students: 105,
      classes: 4,
      promptConfig: "Pre-algebra, research papers, U.S. history, advanced science",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Grade Management</h1>
        <Button>
          <LucidePlus className="mr-2 h-4 w-4" />
          Add Grade
        </Button>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Grades</TabsTrigger>
          <TabsTrigger value="elementary">Elementary</TabsTrigger>
          <TabsTrigger value="middle">Middle School</TabsTrigger>
          <TabsTrigger value="high">High School</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grades.map((grade) => (
              <Card key={grade.id} className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
                <CardHeader className="bg-primary/5">
                  <CardTitle>{grade.name}</CardTitle>
                  <CardDescription>
                    {grade.students} students • {grade.classes} classes
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">System Prompt Configuration:</h4>
                    <p className="text-sm text-muted-foreground">{grade.promptConfig}</p>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 dark:bg-gray-900/50 p-4">
                  <Button variant="outline" className="w-full rounded-full" asChild>
                    <Link href={`/dashboard/grades/${grade.id}`}>Configure</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="elementary" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grades.slice(0, 6).map((grade) => (
              <Card key={grade.id} className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
                <CardHeader className="bg-primary/5">
                  <CardTitle>{grade.name}</CardTitle>
                  <CardDescription>
                    {grade.students} students • {grade.classes} classes
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">System Prompt Configuration:</h4>
                    <p className="text-sm text-muted-foreground">{grade.promptConfig}</p>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 dark:bg-gray-900/50 p-4">
                  <Button variant="outline" className="w-full rounded-full" asChild>
                    <Link href={`/dashboard/grades/${grade.id}`}>Configure</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
