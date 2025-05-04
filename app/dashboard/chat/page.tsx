import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatInterface } from "@/components/chat/chat-interface"

export default function ChatPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Nino Chat</h1>
      </div>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Chat with Nino</CardTitle>
          <CardDescription>Test the AI chat experience with different grade-level configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <ChatInterface />
        </CardContent>
      </Card>
    </div>
  )
}
