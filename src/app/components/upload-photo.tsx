"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Upload, X } from "lucide-react"

export default function UploadPhoto() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [caption, setCaption] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = (event) => {
                if (event.target?.result) {
                    setSelectedImage(event.target.result as string)
                }
            }

            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedImage) return

        setIsUploading(true)

        // Simulate upload process
        setTimeout(() => {
            // Save to localStorage
            const today = new Date().toDateString()
            const photoData = {
                image: selectedImage,
                caption,
                date: today,
                timestamp: new Date().getTime(),
            }

            const savedPhotos = localStorage.getItem("dailyPhotos")
            let photosArray = savedPhotos ? JSON.parse(savedPhotos) : []

            // Check if we already have a photo for today
            const todayIndex = photosArray.findIndex((p: any) => p.date === today)
            if (todayIndex >= 0) {
                photosArray[todayIndex] = photoData
            } else {
                photosArray = [photoData, ...photosArray]
            }

            localStorage.setItem("dailyPhotos", JSON.stringify(photosArray))

            // Reset form
            setSelectedImage(null)
            setCaption("")
            setIsUploading(false)

            // Force a reload to update the gallery
            window.location.reload()
        }, 1500)
    }

    const clearSelection = () => {
        setSelectedImage(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                {!selectedImage ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#f06543] transition-colors"
                    >
                        <Upload className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg font-medium">Click to upload your photo</p>
                        <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF (max. 10MB)</p>
                    </div>
                ) : (
                    <div className="relative">
                        <img
                            src={selectedImage || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-auto max-h-96 object-contain rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={clearSelection}
                            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}
                <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>

            <div className="space-y-2">
                <label htmlFor="caption" className="text-sm font-medium">
                    Caption (optional)
                </label>
                <Textarea
                    id="caption"
                    placeholder="Add a caption to your photo..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="resize-none"
                    rows={3}
                />
            </div>

            <Button
                type="submit"
                disabled={!selectedImage || isUploading}
                className="w-full bg-[#f06543] hover:bg-[#d14f35] text-white"
            >
                {isUploading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Uploading...
                    </>
                ) : (
                    "Save Today's Photo"
                )}
            </Button>
        </form>
    )
}
