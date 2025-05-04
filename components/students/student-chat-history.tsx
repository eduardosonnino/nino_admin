"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LucideChevronLeft, LucideChevronRight, LucideSearch } from "lucide-react"
import { Input } from "@/components/ui/input"

interface StudentChatHistoryProps {
  studentId: string
}

interface ChatSession {
  id: string
  date: string
  topic: string
  messages: {
    id: string
    sender: "student" | "ai"
    content: string
    timestamp: string
  }[]
}

export function StudentChatHistory({ studentId }: StudentChatHistoryProps) {
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - in a real app, you would fetch this from your backend
  const chatSessions: ChatSession[] = [
    {
      id: "session1",
      date: "2025-05-03",
      topic: "Solar System",
      messages: [
        {
          id: "msg1",
          sender: "student",
          content: "Can you tell me about the planets in our solar system?",
          timestamp: "2025-05-03T14:23:15",
        },
        {
          id: "msg2",
          sender: "ai",
          content:
            "Our solar system has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Each planet is unique in size, composition, and distance from the Sun. Would you like to learn more about a specific planet?",
          timestamp: "2025-05-03T14:23:20",
        },
        {
          id: "msg3",
          sender: "student",
          content: "Tell me more about Jupiter!",
          timestamp: "2025-05-03T14:23:45",
        },
        {
          id: "msg4",
          sender: "ai",
          content:
            "Jupiter is the largest planet in our solar system! It's a gas giant made mostly of hydrogen and helium. Jupiter is known for its Great Red Spot, which is a giant storm that has been going on for hundreds of years. It also has at least 79 moons, with the four largest being Io, Europa, Ganymede, and Callisto. These are called the Galilean moons because they were discovered by Galileo Galilei.",
          timestamp: "2025-05-03T14:23:55",
        },
      ],
    },
    {
      id: "session2",
      date: "2025-05-02",
      topic: "Fractions Homework",
      messages: [
        {
          id: "msg1",
          sender: "student",
          content: "I need help with my fractions homework. How do I add 1/4 and 2/3?",
          timestamp: "2025-05-02T15:45:10",
        },
        {
          id: "msg2",
          sender: "ai",
          content:
            "I'd be happy to help you with adding fractions! To add fractions with different denominators, we need to find a common denominator first. Let's work through this step by step.",
          timestamp: "2025-05-02T15:45:15",
        },
        {
          id: "msg3",
          sender: "ai",
          content:
            "Step 1: Find the least common multiple (LCM) of the denominators 4 and 3. The LCM of 4 and 3 is 12.\n\nStep 2: Convert each fraction to an equivalent fraction with the denominator 12.\n1/4 = 3/12 (multiply top and bottom by 3)\n2/3 = 8/12 (multiply top and bottom by 4)\n\nStep 3: Add the numerators while keeping the common denominator.\n3/12 + 8/12 = 11/12\n\nSo, 1/4 + 2/3 = 11/12",
          timestamp: "2025-05-02T15:45:30",
        },
        {
          id: "msg4",
          sender: "student",
          content: "Thank you! That makes sense now.",
          timestamp: "2025-05-02T15:46:00",
        },
      ],
    },
    {
      id: "session3",
      date: "2025-05-01",
      topic: "American Revolution",
      messages: [
        {
          id: "msg1",
          sender: "student",
          content: "Who were the important people in the American Revolution?",
          timestamp: "2025-05-01T13:12:05",
        },
        {
          id: "msg2",
          sender: "ai",
          content:
            "The American Revolution had many important figures! Here are some key people:\n\n1. George Washington - Commander of the Continental Army and later the first U.S. President\n2. Thomas Jefferson - Wrote the Declaration of Independence\n3. Benjamin Franklin - Diplomat who helped secure French support\n4. John Adams - Key advocate for independence and later the second U.S. President\n5. King George III - The British monarch against whom the colonies rebelled\n\nWould you like to learn more about any of these people or hear about others?",
          timestamp: "2025-05-01T13:12:15",
        },
      ],
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (timestampString: string) => {
    const timestamp = new Date(timestampString)
    return timestamp.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredSessions = chatSessions.filter(
    (session) =>
      session.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.messages.some((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const currentSession = selectedSession ? chatSessions.find((session) => session.id === selectedSession) : null

  return (
    <div className="space-y-4">
      <div className="relative">
        <LucideSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search chat history..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {!selectedSession ? (
        <div className="space-y-4">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <Card
                key={session.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setSelectedSession(session.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{session.topic}</h3>
                      <p className="text-sm text-muted-foreground">{formatDate(session.date)}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <LucideChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No chat sessions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setSelectedSession(null)}>
              <LucideChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="font-medium">{currentSession?.topic}</h3>
            <p className="text-sm text-muted-foreground ml-2">
              {currentSession ? formatDate(currentSession.date) : ""}
            </p>
          </div>
          <div className="space-y-4">
            {currentSession?.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "student" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.sender === "student" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8">
                    {message.sender === "student" ? (
                      <>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Student" />
                        <AvatarFallback>S</AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Nino AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "student" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
