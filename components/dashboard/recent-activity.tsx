import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentActivities = [
  {
    id: 1,
    student: {
      name: "Emma Johnson",
      grade: "5th Grade",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EJ",
    },
    activity: "Asked about the solar system",
    time: "2 minutes ago",
  },
  {
    id: 2,
    student: {
      name: "Michael Chen",
      grade: "8th Grade",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    activity: "Completed math homework assistance",
    time: "15 minutes ago",
  },
  {
    id: 3,
    student: {
      name: "Sophia Rodriguez",
      grade: "3rd Grade",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SR",
    },
    activity: "Practiced spelling with AI",
    time: "32 minutes ago",
  },
  {
    id: 4,
    student: {
      name: "Ethan Williams",
      grade: "10th Grade",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EW",
    },
    activity: "Researched history project",
    time: "1 hour ago",
  },
  {
    id: 5,
    student: {
      name: "Olivia Davis",
      grade: "7th Grade",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "OD",
    },
    activity: "Worked on science experiment",
    time: "2 hours ago",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-6">
      {recentActivities.map((activity, index) => (
        <div
          key={activity.id}
          className="flex items-center gap-4 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage src={activity.student.avatar || "/placeholder.svg"} alt={activity.student.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {activity.student.initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {activity.student.name}
                <span className="ml-2 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  {activity.student.grade}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            <p className="text-sm text-muted-foreground">{activity.activity}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
