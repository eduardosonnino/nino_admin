import type { ReactNode } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function StudentDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
