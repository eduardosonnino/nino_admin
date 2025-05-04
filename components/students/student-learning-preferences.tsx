"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  learningStyle: z.string(),
  responseComplexity: z.number().min(1).max(10),
  responseLength: z.string(),
  enableVisualAids: z.boolean(),
  enableAudioSupport: z.boolean(),
  specialAccommodations: z.string(),
  advancedTopics: z.array(z.string()),
  restrictedTopics: z.string(),
})

interface StudentLearningPreferencesProps {
  student: {
    id: string
    name: string
    learningStyle: string
    specialNeeds: string[]
  }
}

const advancedTopicsList = [
  { id: "advanced-math", label: "Advanced Mathematics" },
  { id: "physics", label: "Physics" },
  { id: "chemistry", label: "Chemistry" },
  { id: "biology", label: "Advanced Biology" },
  { id: "literature", label: "Advanced Literature" },
  { id: "history", label: "Advanced History" },
  { id: "computer-science", label: "Computer Science" },
  { id: "foreign-languages", label: "Foreign Languages" },
]

export function StudentLearningPreferences({ student }: StudentLearningPreferencesProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learningStyle: student.learningStyle.toLowerCase(),
      responseComplexity: 5,
      responseLength: "300",
      enableVisualAids: true,
      enableAudioSupport: student.specialNeeds.includes("Dyslexia"),
      specialAccommodations: student.specialNeeds.join(", "),
      advancedTopics: [],
      restrictedTopics: "",
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
          name="learningStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Learning Style</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a learning style" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="visual">Visual</SelectItem>
                  <SelectItem value="auditory">Auditory</SelectItem>
                  <SelectItem value="reading/writing">Reading/Writing</SelectItem>
                  <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                  <SelectItem value="multimodal">Multimodal</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This determines how Nino will present information to the student.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responseComplexity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Response Complexity (1-10)</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              <FormDescription>
                Adjust how complex Nino's responses should be for this student. Current value: {field.value}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responseLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Response Length (words)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Limit how long Nino's responses can be for this student.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="enableVisualAids"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Visual Aids</FormLabel>
                  <FormDescription>Nino will include diagrams and images in responses.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="enableAudioSupport"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Audio Support</FormLabel>
                  <FormDescription>Nino will provide text-to-speech for responses.</FormDescription>
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
          name="specialAccommodations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Accommodations</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter any special accommodations needed..." {...field} />
              </FormControl>
              <FormDescription>
                List any learning disabilities or special needs that Nino should accommodate.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="advancedTopics"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Advanced Topics</FormLabel>
                <FormDescription>Select advanced topics this student is allowed to explore.</FormDescription>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                {advancedTopicsList.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="advancedTopics"
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(field.value?.filter((value) => value !== item.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
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
              <FormDescription>Topics that Nino should avoid discussing with this student.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Preferences</Button>
      </form>
    </Form>
  )
}
