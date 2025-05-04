"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

const formSchema = z.object({
  systemPrompt: z.string().min(10, {
    message: "System prompt must be at least 10 characters.",
  }),
  complexityLevel: z.number().min(1).max(10),
  enableCitations: z.boolean(),
  enableImages: z.boolean(),
  maxResponseLength: z.string(),
  restrictedTopics: z.string(),
})

export function GradeConfigForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      systemPrompt:
        "You are Nino, an educational AI assistant for 5th grade students. Provide age-appropriate explanations for pre-algebra, research papers, U.S. history, and science topics. Use simple language and examples that 10-11 year old students can understand. Always encourage critical thinking and provide step-by-step explanations when solving problems.",
      complexityLevel: 5,
      enableCitations: true,
      enableImages: true,
      maxResponseLength: "500",
      restrictedTopics: "violence, inappropriate content, advanced politics",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // In a real app, you would save these values to your backend
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="systemPrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>System Prompt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the system prompt for this grade level..."
                  className="min-h-[200px] resize-none rounded-lg border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the base instruction set that defines how Nino responds to students in this grade.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="complexityLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complexity Level (1-10)</FormLabel>
              <div className="space-y-4">
                <FormControl>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="py-4"
                  />
                </FormControl>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Simple</span>
                  <span className="text-xs font-medium">Current: {field.value}</span>
                  <span className="text-xs text-muted-foreground">Complex</span>
                </div>
              </div>
              <FormDescription>Adjust how complex Nino's responses should be for this grade level.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="enableCitations"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable Citations</FormLabel>
                  <FormDescription>Nino will provide sources for information when available.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="enableImages"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable Images</FormLabel>
                  <FormDescription>Nino will include relevant images in responses when helpful.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="maxResponseLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Response Length (words)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Limit how long Nino's responses can be for this grade level.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="restrictedTopics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restricted Topics</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter comma-separated topics to restrict..." {...field} />
              </FormControl>
              <FormDescription>Topics that Nino should avoid discussing with students in this grade.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-full">
          Save Configuration
        </Button>
      </form>
    </Form>
  )
}
