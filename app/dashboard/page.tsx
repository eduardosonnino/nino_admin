import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import Link from "next/link"
import { LucideSettings, LucideUsers, LucideMessageSquare, LucideGraduationCap } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = createClient()

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  if (!profile || profile.user_type !== "admin") {
    redirect("/login")
  }

  // Get counts for dashboard stats
  const { count: studentsCount } = await supabase.from("students").select("*", { count: "exact", head: true })

  const { count: classesCount } = await supabase.from("classes").select("*", { count: "exact", head: true })

  const { count: chatMessagesCount } = await supabase.from("chat_messages").select("*", { count: "exact", head: true })

  return (
    <div className="flex flex-col gap-6 dashboard-gradient min-h-screen pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-heading">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {profile.full_name || session.user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="rounded-full shadow-md hover:shadow-lg transition-shadow" asChild>
            <Link href="/dashboard/settings">
              <LucideSettings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/10 to-primary/5">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <LucideUsers className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold">{studentsCount || 0}</div>
                <div className="flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-green-500"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  <p className="text-xs text-green-500 ml-1">+12% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow animate-fade-in [animation-delay:100ms]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/10 to-primary/5">
                <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
                <LucideGraduationCap className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold">{classesCount || 0}</div>
                <div className="flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-green-500"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  <p className="text-xs text-green-500 ml-1">+2 new classes this week</p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow animate-fade-in [animation-delay:200ms]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/10 to-primary/5">
                <CardTitle className="text-sm font-medium">AI Interactions</CardTitle>
                <LucideMessageSquare className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold">{chatMessagesCount || 0}</div>
                <div className="flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-green-500"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  <p className="text-xs text-green-500 ml-1">+573 from yesterday</p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow animate-fade-in [animation-delay:300ms]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/10 to-primary/5">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold">1.2s</div>
                <div className="flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-green-500"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  <p className="text-xs text-green-500 ml-1">-0.1s from last week</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-none shadow-lg animate-fade-in [animation-delay:400ms]">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                <CardTitle>Usage Overview</CardTitle>
                <CardDescription>AI interactions over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Overview />
              </CardContent>
            </Card>

            <Card className="col-span-3 border-none shadow-lg animate-fade-in [animation-delay:500ms]">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest student interactions with Nino</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
