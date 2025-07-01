"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Sparkles } from "lucide-react"

const DEFAULT_PROMPTS = [
    "Capture something that made you smile today",
    "Find a splash of color in an unexpected place",
    "Document a moment of connection",
    "Photograph something old and something new",
    "Capture light and shadow playing together",
    "Find beauty in the ordinary",
    "Frame a moment of peace in your day",
    "Photograph a texture that tells a story",
    "Capture a glimpse of nature in your environment",
    "Document a small detail others might miss",
]

export default function DailyPrompt() {
    const [currentPrompt, setCurrentPrompt] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [savedPrompts, setSavedPrompts] = useState<string[]>([])

    useEffect(() => {
        // Load saved prompts from localStorage
        const saved = localStorage.getItem("dailyPrompts")
        if (saved) {
            setSavedPrompts(JSON.parse(saved))
        }

        // Set today's prompt
        const today = new Date().toDateString()
        const savedToday = localStorage.getItem("promptDate")

        if (savedToday === today && saved) {
            const prompts = JSON.parse(saved)
            if (prompts.length > 0) {
                setCurrentPrompt(prompts[0])
            } else {
                generateNewPrompt()
            }
        } else {
            generateNewPrompt()
        }
    }, [])

    const generateNewPrompt = () => {
        setIsGenerating(true)

        // Simulate AI generation with a random prompt from our defaults
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * DEFAULT_PROMPTS.length)
            const newPrompt = DEFAULT_PROMPTS[randomIndex]

            setCurrentPrompt(newPrompt)

            // Save to localStorage
            const updatedPrompts = [newPrompt, ...savedPrompts].slice(0, 7) // Keep last 7 prompts
            setSavedPrompts(updatedPrompts)
            localStorage.setItem("dailyPrompts", JSON.stringify(updatedPrompts))
            localStorage.setItem("promptDate", new Date().toDateString())

            setIsGenerating(false)
        }, 1500)
    }

    return (
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-none shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-3xl font-serif font-bold">Today&apos;s Prompt</h2>
                <Button
                    onClick={generateNewPrompt}
                    disabled={isGenerating}
                    className="bg-[#f06543] hover:bg-[#d14f35] text-white"
                >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate New Prompt"}
                </Button>
            </div>

            <div className="bg-[#f8f3e3] border border-[#e6e0d0] rounded-md p-6 min-h-24 flex items-center justify-center">
                {isGenerating ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f06543]"></div>
                    </div>
                ) : (
                    <p className="text-xl md:text-2xl font-medium text-center">{currentPrompt}</p>
                )}
            </div>

            {savedPrompts.length > 1 && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Previous Prompts</h3>
                    <div className="space-y-2">
                        {savedPrompts.slice(1).map((prompt, index) => (
                            <div key={index} className="text-sm text-gray-600 bg-[#f8f3e3]/50 p-2 rounded">
                                {prompt}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    )
}
