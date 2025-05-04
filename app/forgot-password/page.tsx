import type { Metadata } from "next"
import Link from "next/link"
import { LucideSchool, LucideArrowLeft } from "lucide-react"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password | Nino School AI",
  description: "Reset your Nino School AI password",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03] pointer-events-none"></div>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative">
        <div className="absolute top-8 left-8">
          <Link href="/" className="group flex items-center gap-2 transition-opacity hover:opacity-70">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm group-hover:bg-primary/30 transition-all"></div>
              <LucideSchool className="h-8 w-8 text-primary relative" />
            </div>
            <span className="font-heading font-bold text-2xl">Nino</span>
          </Link>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 px-8 py-10 shadow-xl sm:rounded-2xl border border-gray-100 dark:border-gray-800/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <ForgotPasswordForm />

              <div className="mt-8 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/90 transition-colors"
                >
                  <LucideArrowLeft className="h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
