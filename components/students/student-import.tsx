"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LucideUpload, LucideFile, LucideCheck, LucideAlertCircle } from "lucide-react"

export function StudentImport() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadStatus("idle")
      setErrorMessage("")
    }
  }

  const handleUpload = () => {
    if (!file) return

    setUploading(true)

    // Simulate upload process
    setTimeout(() => {
      // Check file extension (in a real app, you'd do more validation)
      const fileExt = file.name.split(".").pop()?.toLowerCase()
      if (fileExt === "csv" || fileExt === "xlsx" || fileExt === "xls") {
        setUploadStatus("success")
      } else {
        setUploadStatus("error")
        setErrorMessage("Invalid file format. Please upload a CSV or Excel file.")
      }
      setUploading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <LucideUpload className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-medium">Upload Student Data</h3>
            <p className="text-sm text-muted-foreground">Drag and drop your CSV or Excel file, or click to browse</p>
            <p className="text-xs text-muted-foreground">Supported formats: CSV, XLSX, XLS</p>
          </div>
          <input type="file" id="file-upload" className="hidden" accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
          <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
            Browse Files
          </Button>
        </div>
      </div>

      {file && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <LucideFile className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {uploadStatus === "success" ? (
                  <div className="flex items-center text-green-500">
                    <LucideCheck className="mr-1 h-4 w-4" />
                    <span>Upload successful</span>
                  </div>
                ) : uploadStatus === "error" ? (
                  <div className="flex items-center text-red-500">
                    <LucideAlertCircle className="mr-1 h-4 w-4" />
                    <span>{errorMessage}</span>
                  </div>
                ) : (
                  <Button onClick={handleUpload} disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Import Instructions</h3>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Your CSV or Excel file should include the following columns:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Student ID (required)</li>
            <li>First Name (required)</li>
            <li>Last Name (required)</li>
            <li>Email (required)</li>
            <li>Grade Level (required)</li>
            <li>Class (required)</li>
            <li>Special Needs (optional)</li>
            <li>Learning Style (optional)</li>
          </ul>
        </div>
        <Button variant="outline" asChild>
          <a href="#" download>
            Download Template
          </a>
        </Button>
      </div>
    </div>
  )
}
