"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideUser, LucideUsers, LucideGraduationCap, LucideLogIn } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export function LoginForm() {
  const router = useRouter()
  const [userType, setUserType] = useState("student")
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) {
        throw error
      }

      // Get user profile to check user type
      const { data: profile } = await supabase.from("profiles").select("user_type").single()

      // Redirect based on user type
      if (profile?.user_type === "admin") {
        router.push("/dashboard")
      } else if (profile?.user_type === "parent") {
        router.push("/parent-dashboard")
      } else if (profile?.user_type === "teacher") {
        router.push("/teacher-dashboard")
      } else {
        router.push("/student-dashboard")
      }

      toast({
        title: "Login successful",
        description: "Welcome back!",
      })
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="student" value={userType} onValueChange={setUserType} className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-gray-100/50 dark:bg-gray-800/30 p-1 rounded-xl">
          <TabsTrigger
            value="student"
            className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg transition-all"
          >
            <LucideGraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Student</span>
          </TabsTrigger>
          <TabsTrigger
            value="parent"
            className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg transition-all"
          >
            <LucideUser className="h-4 w-4" />
            <span className="hidden sm:inline">Parent</span>
          </TabsTrigger>
          <TabsTrigger
            value="admin"
            className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg transition-all"
          >
            <LucideUsers className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="mt-8 focus-visible:outline-none focus-visible:ring-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h3 className="text-xl font-medium">Student Login</h3>
            <p className="text-sm text-muted-foreground mt-1">Access your personalized learning experience</p>
          </motion.div>
          <LoginFormFields form={form} onSubmit={onSubmit} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="parent" className="mt-8 focus-visible:outline-none focus-visible:ring-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h3 className="text-xl font-medium">Parent Login</h3>
            <p className="text-sm text-muted-foreground mt-1">Monitor your child's progress and activities</p>
          </motion.div>
          <LoginFormFields form={form} onSubmit={onSubmit} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="admin" className="mt-8 focus-visible:outline-none focus-visible:ring-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h3 className="text-xl font-medium">Administrator Login</h3>
            <p className="text-sm text-muted-foreground mt-1">Manage school settings and user accounts</p>
          </motion.div>
          <LoginFormFields form={form} onSubmit={onSubmit} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface LoginFormFieldsProps {
  form: any
  onSubmit: (values: z.infer<typeof formSchema>) => void
  isLoading: boolean
}

function LoginFormFields({ form, onSubmit, isLoading }: LoginFormFieldsProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your.email@example.com"
                  {...field}
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </FormControl>
              <FormMessage className="text-xs font-medium text-red-500 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-primary hover:text-primary/90 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  {...field}
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </FormControl>
              <FormMessage className="text-xs font-medium text-red-500 mt-1" />
            </FormItem>
          )}
        />

        <div className="pt-3">
          <Button
            type="submit"
            className="w-full h-11 rounded-xl font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LucideLogIn className="h-4 w-4" />
                Sign in
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
