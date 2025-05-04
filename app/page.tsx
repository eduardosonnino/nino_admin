import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LucideSchool, LucideUsers, LucideMessageSquare, LucideSettings } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b glass-effect supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm"></div>
                <LucideSchool className="h-6 w-6 text-primary relative" />
              </div>
              <span className="font-heading font-bold text-xl">Nino</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 mx-6">
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary relative group">
              Dashboard
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link href="/students" className="text-sm font-medium transition-colors hover:text-primary relative group">
              Students
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link href="/grades" className="text-sm font-medium transition-colors hover:text-primary relative group">
              Grades
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link href="/chat" className="text-sm font-medium transition-colors hover:text-primary relative group">
              Chat
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button
              size="sm"
              className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
              asChild
            >
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 hero-gradient overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4 animate-slide-up">
                <div className="inline-block">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                    <span>New Release</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-heading">
                    <span className="text-gradient">Nino:</span> AI-Powered Learning for Schools
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Personalized AI chat experiences with customizable permissions for every student's unique learning
                    journey.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1"
                    asChild
                  >
                    <Link href="/dashboard">Get Started</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-primary/20 hover:border-primary/40 transition-all hover:-translate-y-1"
                    asChild
                  >
                    <Link href="/demo">View Demo</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[550px] aspect-square animate-slide-down">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-3xl blur-3xl opacity-50"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-800/50">
                    <img
                      src="/placeholder.svg?height=550&width=550"
                      alt="Nino Platform Preview"
                      width={550}
                      height={550}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                          <LucideSchool className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Nino AI Assistant</p>
                          <p className="text-white/80 text-sm">Personalized learning for every student</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
          <div className="absolute inset-0 mesh-pattern opacity-50"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-[800px]">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                  <span>Powerful Features</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading">
                  Everything You Need for AI-Powered Education
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Nino provides a comprehensive platform for managing AI-powered learning experiences in your school
                  district
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="feature-card group flex flex-col items-center space-y-4 rounded-xl border bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-950 card-hover-effect">
                <div className="rounded-full bg-primary/10 p-4 feature-icon">
                  <LucideUsers className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Student Management</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Easily manage student rosters and customize permissions for each grade level.
                </p>
              </div>
              <div className="feature-card group flex flex-col items-center space-y-4 rounded-xl border bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-950 card-hover-effect">
                <div className="rounded-full bg-primary/10 p-4 feature-icon">
                  <LucideMessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Customizable AI Chat</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Configure system prompts for each grade level and tailor the AI experience.
                </p>
              </div>
              <div className="feature-card group flex flex-col items-center space-y-4 rounded-xl border bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-950 card-hover-effect">
                <div className="rounded-full bg-primary/10 p-4 feature-icon">
                  <LucideSettings className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Personalized Learning</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Adapt to individual learning styles, disabilities, and advanced topic interests.
                </p>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <Button
                className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1"
                asChild
              >
                <Link href="/features">Explore All Features</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                  <span>Testimonials</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading">
                  Trusted by Educators Worldwide
                </h2>
                <p className="text-gray-500 md:text-xl dark:text-gray-400">
                  See what teachers and administrators are saying about Nino's impact on their schools.
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800 relative">
                  <div className="absolute -top-4 -left-4 text-4xl text-primary opacity-30">"</div>
                  <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                    Nino has transformed how we support students with different learning needs. The ability to customize
                    AI responses based on grade level and individual requirements has been a game-changer for our
                    district.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">Dr. Jane Davis</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Superintendent, Lincoln School District
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800 relative animate-fade-in">
                  <div className="absolute -top-4 -left-4 text-4xl text-primary opacity-30">"</div>
                  <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                    Our students love interacting with Nino. The personalized learning experience has significantly
                    improved engagement and academic outcomes across all grade levels.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">MR</span>
                    </div>
                    <div>
                      <p className="font-medium">Michael Rodriguez</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Principal, Westview Elementary</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800 relative animate-fade-in [animation-delay:200ms]">
                  <div className="absolute -top-4 -left-4 text-4xl text-primary opacity-30">"</div>
                  <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                    The ability to tailor AI responses for students with special needs has been invaluable. Nino
                    provides accessibility options that truly support inclusive education.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">SC</span>
                    </div>
                    <div>
                      <p className="font-medium">Sarah Chen</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Special Education Director, Oakridge Schools
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 md:py-16 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm"></div>
                  <LucideSchool className="h-6 w-6 text-primary relative" />
                </div>
                <span className="font-heading font-bold text-xl">Nino</span>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Transforming education with AI-powered personalized learning experiences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-primary">
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
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
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
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
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
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 Nino AI. All rights reserved.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 md:mt-0">
              Made with ❤️ for educators and students worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
