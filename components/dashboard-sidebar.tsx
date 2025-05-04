"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LucideHome,
  LucideUsers,
  LucideGraduationCap,
  LucideMessageSquare,
  LucideSettings,
  LucideLogOut,
  LucideMenu,
  LucideX,
  LucideSchool,
  LucideUser,
  LucideLoader2,
} from "lucide-react"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)
  const { user, profile, signOut, isLoading } = useAuth()
  const router = useRouter()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  // Determine sidebar items based on user type
  let sidebarItems = []

  if (profile?.user_type === "admin") {
    sidebarItems = [
      {
        href: "/dashboard",
        title: "Dashboard",
        icon: <LucideHome className="h-5 w-5" />,
      },
      {
        href: "/dashboard/students",
        title: "Students",
        icon: <LucideUsers className="h-5 w-5" />,
      },
      {
        href: "/dashboard/grades",
        title: "Grades",
        icon: <LucideGraduationCap className="h-5 w-5" />,
      },
      {
        href: "/dashboard/chat",
        title: "Chat",
        icon: <LucideMessageSquare className="h-5 w-5" />,
      },
      {
        href: "/dashboard/settings",
        title: "Settings",
        icon: <LucideSettings className="h-5 w-5" />,
      },
    ]
  } else if (profile?.user_type === "teacher") {
    sidebarItems = [
      {
        href: "/teacher-dashboard",
        title: "Dashboard",
        icon: <LucideHome className="h-5 w-5" />,
      },
      {
        href: "/teacher-dashboard/students",
        title: "Students",
        icon: <LucideUsers className="h-5 w-5" />,
      },
      {
        href: "/teacher-dashboard/classes",
        title: "Classes",
        icon: <LucideGraduationCap className="h-5 w-5" />,
      },
      {
        href: "/teacher-dashboard/chat",
        title: "Chat",
        icon: <LucideMessageSquare className="h-5 w-5" />,
      },
    ]
  } else if (profile?.user_type === "student") {
    sidebarItems = [
      {
        href: "/student-dashboard",
        title: "Dashboard",
        icon: <LucideHome className="h-5 w-5" />,
      },
      {
        href: "/student-dashboard/chat",
        title: "Chat with Nino",
        icon: <LucideMessageSquare className="h-5 w-5" />,
      },
      {
        href: "/student-dashboard/profile",
        title: "My Profile",
        icon: <LucideUser className="h-5 w-5" />,
      },
    ]
  } else if (profile?.user_type === "parent") {
    sidebarItems = [
      {
        href: "/parent-dashboard",
        title: "Dashboard",
        icon: <LucideHome className="h-5 w-5" />,
      },
      {
        href: "/parent-dashboard/children",
        title: "My Children",
        icon: <LucideUsers className="h-5 w-5" />,
      },
      {
        href: "/parent-dashboard/progress",
        title: "Progress Reports",
        icon: <LucideGraduationCap className="h-5 w-5" />,
      },
    ]
  }

  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <div className="hidden border-r bg-background md:flex md:w-64 items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full py-8">
          <LucideLoader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Update the sidebar content styling
  const sidebarContent = (
    <>
      <div className="flex h-16 items-center px-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <LucideSchool className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Nino</span>
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" className="ml-auto" onClick={toggleSidebar}>
            <LucideX className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Main Menu</h2>
          <SidebarNav items={sidebarItems} />
        </div>
      </div>
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-3 mb-4 px-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || "User"} />
            <AvatarFallback>
              {profile?.full_name
                ? profile.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : user?.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{profile?.full_name || user?.email}</span>
            <span className="text-xs text-muted-foreground capitalize">{profile?.user_type}</span>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
          <LucideLogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  )

  if (isMobile) {
    return (
      <>
        <Button variant="outline" size="icon" className="fixed top-4 left-4 z-40 md:hidden" onClick={toggleSidebar}>
          <LucideMenu className="h-5 w-5" />
        </Button>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden" onClick={toggleSidebar}>
            <div
              className="fixed left-0 top-0 h-full w-3/4 max-w-xs border-r bg-background p-0"
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    )
  }

  return <div className="hidden border-r bg-background md:block md:w-64">{sidebarContent}</div>
}

// Update the SidebarNav function
function SidebarNav({ items, className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          {item.icon}
          <span className="ml-3">{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}
