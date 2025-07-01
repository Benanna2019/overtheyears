"use client"

import { useState, useEffect } from "react"
import { Card } from "@/app/components/ui/card"
import { Calendar, ImageIcon } from "lucide-react"

type PhotoData = {
    image: string
    caption: string
    date: string
    timestamp: number
}

export default function PhotoGallery() {
    const [photos, setPhotos] = useState<PhotoData[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Load photos from localStorage
        const savedPhotos = localStorage.getItem("dailyPhotos")
        if (savedPhotos) {
            setPhotos(JSON.parse(savedPhotos))
        }
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f06543]"></div>
            </div>
        )
    }

    if (photos.length === 0) {
        return (
            <Card className="p-12 bg-white/80 backdrop-blur-sm border-none shadow-lg text-center">
                <ImageIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-medium mb-2">No photos yet</h3>
                <p className="text-gray-500">Upload your first photo to start your visual journey!</p>
            </Card>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => {
                const date = new Date(photo.timestamp)
                const formattedDate = date.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })

                return (
                    <Card key={index} className="overflow-hidden bg-white/80 backdrop-blur-sm border-none shadow-lg">
                        <div className="aspect-square relative">
                            <img
                                src={photo.image || "/placeholder.svg"}
                                alt={photo.caption || `Photo from ${formattedDate}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formattedDate}
                            </div>
                            {photo.caption && <p className="text-gray-700">{photo.caption}</p>}
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
