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
import { LucideUser, LucideUsers, LucideGraduationCap, LucideUserPlus } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export function RegisterForm() {
  const router = useRouter()
  const [userType, setUserType] = useState("student")
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Sign up with Supabase Auth
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.name,
            user_type: userType,
          },
        },
      })

      if (error) {
        throw error
      }

      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account.",
      })

      // Redirect to login page
      router.push("/login")
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
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
            <h3 className="text-xl font-medium">Student Registration</h3>
            <p className="text-sm text-muted-foreground mt-1">Create your student account</p>
          </motion.div>
          <RegisterFormFields form={form} onSubmit={onSubmit} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="parent" className="mt-8 focus-visible:outline-none focus-visible:ring-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h3 className="text-xl font-medium">Parent Registration</h3>
            <p className="text-sm text-muted-foreground mt-1">Create a parent account to monitor your child</p>
          </motion.div>
          <RegisterFormFields form={form} onSubmit={onSubmit} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="admin" className="mt-8 focus-visible:outline-none focus-visible:ring-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h3 className="text-xl font-medium">Administrator Registration</h3>
            <p className="text-sm text-muted-foreground mt-1">Create an administrator account</p>
          </motion.div>
          <RegisterFormFields form={form} onSubmit={onSubmit} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface RegisterFormFieldsProps {
  form: any
  onSubmit: (values: z.infer<typeof formSchema>) => void
  isLoading: boolean
}

function RegisterFormFields({ form, onSubmit, isLoading }: RegisterFormFieldsProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your.email@example.com"
                  {...field}
                  type="email"
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
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  {...field}
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  {...field}
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
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl p-4 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm">
                  I accept the{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    terms and conditions
                  </a>
                </FormLabel>
                <FormMessage className="text-xs font-medium text-red-500" />
              </div>
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
                Creating account...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LucideUserPlus className="h-4 w-4" />
                Create account
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
