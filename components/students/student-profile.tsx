import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LucideCalendar, LucideUser, LucideMail, LucidePhone, LucideMapPin, LucideClock } from "lucide-react"

interface StudentProfileProps {
  student: {
    id: string
    name: string
    email: string
    grade: string
    class: string
    specialNeeds: string[]
    learningStyle: string
    status: string
    avatar: string
    dateOfBirth: string
    parentName: string
    parentEmail: string
    parentPhone: string
    address: string
    joinDate: string
  }
}

export function StudentProfile({ student }: StudentProfileProps) {
  // Format date of birth
  const dob = new Date(student.dateOfBirth)
  const formattedDob = dob.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calculate age
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }

  // Format join date
  const joinDate = new Date(student.joinDate)
  const formattedJoinDate = joinDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6">
        <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
          <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="mt-4 sm:mt-0 space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold">{student.name}</h2>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            <Badge className="rounded-full px-3">{student.grade}</Badge>
            <Badge variant="outline" className="rounded-full px-3">
              {student.class}
            </Badge>
            <Badge variant={student.status === "active" ? "default" : "secondary"} className="rounded-full px-3">
              {student.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{student.email}</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
            {student.specialNeeds.map((need, i) => (
              <Badge key={i} variant="outline" className="rounded-full px-3">
                {need}
              </Badge>
            ))}
            <Badge variant="secondary" className="rounded-full px-3">
              {student.learningStyle} Learner
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-primary/5">
            <h3 className="text-lg font-medium">Student Information</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                  <LucideCalendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Date of Birth</p>
                  <p className="text-sm text-muted-foreground">
                    {formattedDob} ({age} years old)
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                  <LucideClock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Enrolled Since</p>
                  <p className="text-sm text-muted-foreground">{formattedJoinDate}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                  <LucideMapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{student.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-primary/5">
            <h3 className="text-lg font-medium">Parent/Guardian Information</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                  <LucideUser className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Parent/Guardian Name</p>
                  <p className="text-sm text-muted-foreground">{student.parentName}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                  <LucideMail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{student.parentEmail}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                  <LucidePhone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{student.parentPhone}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
