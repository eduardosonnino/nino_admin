"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LucideSend, LucideRefreshCw } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm Nino, your AI learning assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState("5")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (input.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      // Generate different responses based on grade level
      if (input.toLowerCase().includes("planet") || input.toLowerCase().includes("solar system")) {
        if (Number.parseInt(selectedGrade) <= 3) {
          response =
            "The planets in our solar system are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Earth is where we live!"
        } else if (Number.parseInt(selectedGrade) <= 6) {
          response =
            "Our solar system has 8 planets that orbit around the Sun. From closest to farthest, they are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. The first 4 are rocky planets, while the last 4 are gas giants (Jupiter and Saturn) or ice giants (Uranus and Neptune)."
        } else {
          response =
            "Our solar system consists of 8 planets orbiting our star, the Sun. The inner terrestrial planets (Mercury, Venus, Earth, and Mars) are primarily composed of rock and metal. The outer planets include gas giants Jupiter and Saturn (composed mainly of hydrogen and helium) and ice giants Uranus and Neptune (containing water, ammonia, and methane ices). Each planet has unique characteristics, such as Earth's life-supporting atmosphere, Jupiter's Great Red Spot, and Saturn's extensive ring system."
        }
      } else if (
        input.toLowerCase().includes("math") ||
        input.toLowerCase().includes("add") ||
        input.toLowerCase().includes("subtract")
      ) {
        if (Number.parseInt(selectedGrade) <= 3) {
          response = "Math is fun! We can count, add, and subtract numbers. For example, 2 + 2 = 4 and 5 - 3 = 2."
        } else if (Number.parseInt(selectedGrade) <= 6) {
          response =
            "In math, we work with numbers, shapes, and patterns. We can add, subtract, multiply, and divide. We also learn about fractions, decimals, and measurements. Would you like help with a specific math problem?"
        } else {
          response =
            "Mathematics encompasses various fields including arithmetic, algebra, geometry, and calculus. It involves the study of numbers, quantities, shapes, and patterns. Mathematical concepts are fundamental to science, engineering, economics, and many other disciplines. What specific area of mathematics would you like to explore?"
        }
      } else {
        if (Number.parseInt(selectedGrade) <= 3) {
          response =
            "That's an interesting question! I'm here to help you learn new things. Would you like to know about animals, plants, or maybe hear a fun story?"
        } else if (Number.parseInt(selectedGrade) <= 6) {
          response =
            "Great question! I'm here to help with your schoolwork and answer questions about science, history, math, and more. What would you like to learn about today?"
        } else {
          response =
            "I appreciate your inquiry. I'm designed to assist with academic subjects across various disciplines including science, mathematics, literature, history, and more. I can provide explanations, examples, and guidance tailored to your grade level. How can I best support your learning objectives today?"
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm Nino, your AI learning assistant. How can I help you today?",
      },
    ])
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Grade Level:</span>
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-[180px] rounded-full">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent className="animate-scale-in">
              <SelectItem value="k">Kindergarten</SelectItem>
              <SelectItem value="1">1st Grade</SelectItem>
              <SelectItem value="2">2nd Grade</SelectItem>
              <SelectItem value="3">3rd Grade</SelectItem>
              <SelectItem value="4">4th Grade</SelectItem>
              <SelectItem value="5">5th Grade</SelectItem>
              <SelectItem value="6">6th Grade</SelectItem>
              <SelectItem value="7">7th Grade</SelectItem>
              <SelectItem value="8">8th Grade</SelectItem>
              <SelectItem value="9">9th Grade</SelectItem>
              <SelectItem value="10">10th Grade</SelectItem>
              <SelectItem value="11">11th Grade</SelectItem>
              <SelectItem value="12">12th Grade</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" className="rounded-full" onClick={clearChat}>
          <LucideRefreshCw className="mr-2 h-4 w-4" />
          Reset Chat
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto rounded-2xl p-4 mb-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/80 dark:to-gray-900/50 border shadow-inner">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8 border-2 border-white shadow-md">
                  {message.role === "user" ? (
                    <>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Nino AI" />
                      <AvatarFallback className="bg-secondary text-secondary-foreground">AI</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div
                  className={`rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground chat-message-user shadow-lg shadow-primary/20"
                      : "bg-white dark:bg-gray-800 shadow-md chat-message-ai"
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8 border-2 border-white shadow-md">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Nino AI" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">AI</AvatarFallback>
                </Avatar>
                <div className="rounded-2xl p-4 bg-white dark:bg-gray-800 shadow-md">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-primary/30 animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 rounded-full bg-primary/30 animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 rounded-full bg-primary/30 animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="min-h-[60px] resize-none rounded-full px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-md"
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || input.trim() === ""}
          className="rounded-full aspect-square p-3 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
        >
          <LucideSend className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
