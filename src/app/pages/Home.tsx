// import { RequestInfo } from "rwsdk/worker";

import { Card } from "@/app/components/ui/card"
import UploadPhoto from "@/app/components/upload-photo"
import DailyPrompt from "@/app/components/daily-prompt"
import PhotoGallery from "@/app/components/photo-gallery"
import { Button } from "../components/ui/button"

export function Home() {
  return (
    <main className="min-h-screen bg-[#f8f3e3] text-[#1a1a1a] pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 px-4 md:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <div className="text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight">Over The Years</h1>
            <p className="mt-6 text-xl md:text-2xl font-medium">
              A prompt a day to capture and reflect on moments.
            </p>
            <p className="mt-4 text-xl text-[#f06543]">We will store your photos and  create a scrapbook of your memories for you at the end of a set period of time.</p>
            <Button variant="outline" className="mt-8 bg-[#1a1a1a] text-[#f8f3e3]">
              About the project
            </Button>
          </div>
          <div className="relative h-64 md:h-80 lg:h-96">
            <div className="absolute top-0 right-0 w-full h-full">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Polaroid Camera */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
                  {/* Camera Body */}
                  <div className="absolute inset-0 bg-[#d9d9d9] rounded-md shadow-lg transform rotate-3">
                    {/* Camera Top Section */}
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-[#c25b3f] rounded-t-md">
                      {/* Flash */}
                      <div className="absolute top-2 right-6 w-8 h-8 md:w-10 md:h-10 bg-[#f8c05f] rounded-sm shadow-inner flex items-center justify-center">
                        <div className="w-4 h-4 md:w-6 md:h-6 bg-[#f8f3e3] rounded-sm opacity-70"></div>
                      </div>

                      {/* Viewfinder */}
                      <div className="absolute top-3 left-6 w-6 h-6 md:w-8 md:h-8 bg-[#1a1a1a] rounded-sm"></div>

                      {/* Light Sensor */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#1a1a1a] rounded-full"></div>
                    </div>

                    {/* Lens */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#3a3a3a] rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 md:w-6 md:h-6 bg-[#4a4a4a] rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="absolute bottom-3 left-4 right-4 h-6 flex justify-between">
                      <div className="w-6 h-6 bg-[#f06543] rounded-full"></div>
                      <div className="w-12 h-4 bg-[#1a1a1a] rounded-sm"></div>
                    </div>
                  </div>

                  {/* Polaroid Output */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-40 md:w-40 md:h-48 bg-white rounded-sm shadow-md">
                    <div className="absolute top-2 left-2 right-2 bottom-10 bg-[#f8f3e3] rounded-sm"></div>
                    <div className="absolute bottom-2 left-0 right-0 h-6 flex items-center justify-center">
                      <div className="w-8 h-1 bg-[#d9d9d9] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Prompt Section */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <DailyPrompt />
      </section>

      {/* Upload Section */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-none shadow-lg">
          <h2 className="text-3xl font-serif font-bold mb-6">Upload Today&apos;s Photo</h2>
          <UploadPhoto />
        </Card>
      </section>

      {/* Gallery Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h2 className="text-4xl font-serif font-bold mb-8 text-center">Your Photo Journey</h2>
        <PhotoGallery />
      </section>
    </main>
  )
}

