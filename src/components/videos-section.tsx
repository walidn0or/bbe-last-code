"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, ChevronRight, Eye, Clock, Share2, X, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { images, getImage } from "@/config/images"
import { VideoPlayer } from "@/components/video-player"

export function IntroSection() {
  const { isRTL } = useLanguage()
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${isRTL ? "lg:grid-flow-col-dense" : ""}`}>
          <div className={isRTL ? "lg:order-2 text-right" : "lg:order-1"}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Beyond Borders Empowerment</h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              We are dedicated to empowering girls and helping communities through education, healthcare, and
              economic opportunity. Our programs span virtual learning, on‑ground schools, mobile health clinics,
              and targeted humanitarian support.
            </p>
          </div>
          <div className={isRTL ? "lg:order-1" : "lg:order-2"}>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
              <VideoPlayer 
                src={getImage(images.videos.featured)}
                className="absolute inset-0 w-full h-full"
                poster={images.videos.featured}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function VideosSection() {
  const { t, isRTL } = useLanguage()
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [showAllVideos, setShowAllVideos] = useState(false)

  type VideoItem = {
    id: number
    title: string
    thumbnail: string
    duration: string
    views: string
    description: string
    featured?: boolean
  }

  const videos: VideoItem[] = [
    {
      id: 1,
      title: "Virtual Education Project Launch Event - London 2025",
      thumbnail: images.videos.featured,
      duration: "15:32",
      views: "2.1K",
      description:  
        "Highlights from our Virtual Education Project launch event in London, featuring speeches from community leaders and beneficiaries.",
      featured: true,
    },
    {
      id: 2,
      title: "Student Success Stories - Fatima's Journey",
      thumbnail: images.videos.video1,
      duration: "8:45",
      views: "1.8K",
      description:
        "Follow Fatima's inspiring journey from our virtual English classes to securing a remote job opportunity.",
    },
    {
      id: 3,
      title: "On-Ground Schools: Hope, Commitment & Change",
      thumbnail: images.videos.video2,
      duration: "12:20",
      views: "3.2K",
      description:
        "A documentary showcasing our three on-ground schools and the impact they're making in students' lives.",
    },
    {
      id: 4,
      title: "Orphanage Visit - Bringing Joy and Education",
      thumbnail: images.videos.video3,
      duration: "6:15",
      views: "1.5K",
      description:
        "Our recent visit to support orphaned children with educational activities, clothing, and celebrations.",
    },
    {
      id: 5,
      title: "Women's Entrepreneurship Training Program",
      thumbnail: images.videos.video4,
      duration: "10:30",
      views: "2.7K",
      description: "See how our business training programs are empowering women to start their own enterprises.",
    },
    {
      id: 6,
      title: "Mobile Health Clinic in Action",
      thumbnail: images.videos.video5,
      duration: "7:55",
      views: "1.9K",
      description: "Our mobile health clinic providing essential medical care in remote communities.",
    },
  ]

  const featuredVideo = videos.find((video) => video.featured) || videos[0]
  const otherVideos = videos.filter((video) => !video.featured)

  return (
    <>
      <section id="videos" className="py-12 md:py-16 lg:py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("videos.title")}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{t("videos.subtitle")}</p>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Featured Video */}
            <div className="mb-8 md:mb-12">
              <Card className="border-0 shadow-2xl bg-white overflow-hidden">
                <div className={`grid lg:grid-cols-3 gap-0 ${isRTL ? "lg:grid-flow-col-dense" : ""}`}>
                  <div
                    className={`lg:col-span-2 relative group cursor-pointer order-2 lg:order-1 ${isRTL ? "lg:order-2" : ""}`}
                    onClick={() => setSelectedVideo(featuredVideo.id.toString())}
                  >
                    <VideoPlayer 
                      src={getImage(featuredVideo.thumbnail)}
                      className="w-full h-64 md:h-full"
                      poster={`/images/video-posters/${featuredVideo.id}.jpg`}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                        <Play className={`h-6 w-6 md:h-8 md:w-8 text-white ${isRTL ? "mr-1" : "ml-1"}`} />
                      </div>
                    </div>
                    <div
                      className={`absolute bottom-3 ${isRTL ? "left-3 md:left-4" : "right-3 md:right-4"} md:bottom-4 bg-black/70 text-white px-2 py-1 rounded text-xs md:text-sm`}
                    >
                      {featuredVideo.duration}
                    </div>
                  </div>
                  <div
                    className={`p-6 md:p-8 flex flex-col justify-center order-1 lg:order-2 ${isRTL ? "lg:order-1 text-right" : ""}`}
                  >
                    <Badge className="bg-red-600 text-white w-fit mb-4 text-xs md:text-sm">
                      {t("videos.featured")}
                    </Badge>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{featuredVideo.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                      {featuredVideo.description}
                    </p>
                    <div
                      className={`flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Eye className={`h-3 w-3 md:h-4 md:w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                        {featuredVideo.views} {t("videos.views")}
                      </div>
                      <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Clock className={`h-3 w-3 md:h-4 md:w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                        {featuredVideo.duration}
                      </div>
                    </div>
                    <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setSelectedVideo(featuredVideo.id.toString())}
                        leftIcon={<Play className="h-3 w-3 md:h-4 md:w-4" />}
                      >
                        {t("videos.watchNow")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700"
                      >
                        <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Other Videos */}
            <div className="mb-8">
              <div className={`flex items-center justify-between mb-6 md:mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">{t("videos.moreVideos")}</h3>
                <Button
                  variant="ghost"
                  onClick={() => setShowAllVideos(!showAllVideos)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {showAllVideos ? t("common.showLess") : t("common.showMore")}
                  <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showAllVideos ? "rotate-180" : ""}`} />
                </Button>
              </div>

              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-500 ${
                  showAllVideos ? "max-h-none" : "max-h-96 overflow-hidden"
                }`}
              >
                {otherVideos.slice(0, showAllVideos ? otherVideos.length : 3).map((video) => (
                  <Card
                    key={video.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden hover:-translate-y-1 cursor-pointer"
                    onClick={() => setSelectedVideo(video.id.toString())}
                  >
                    <div className="relative overflow-hidden">
                      <VideoPlayer 
                        src={getImage(video.thumbnail)}
                        className="w-full h-40 md:h-48"
                        poster={`/images/video-posters/${video.id}.jpg`}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all flex items-center justify-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <Play className={`h-4 w-4 md:h-5 md:w-5 text-white ${isRTL ? "mr-0.5" : "ml-0.5"}`} />
                        </div>
                      </div>
                      <div
                        className={`absolute bottom-2 ${isRTL ? "left-2" : "right-2"} bg-black/70 text-white px-2 py-1 rounded text-xs`}
                      >
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-3 md:p-4">
                      <h4
                        className={`font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2 text-sm md:text-base ${isRTL ? "text-right" : ""}`}
                      >
                        {video.title}
                      </h4>
                      <p className={`text-xs md:text-sm text-gray-600 mb-3 line-clamp-2 ${isRTL ? "text-right" : ""}`}>
                        {video.description}
                      </p>
                      <div
                        className={`flex items-center justify-between text-xs text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                          <Eye className={`h-3 w-3 ${isRTL ? "ml-1" : "mr-1"}`} />
                          {video.views} {t("videos.views")}
                        </div>
                        <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                          <Clock className={`h-3 w-3 ${isRTL ? "ml-1" : "mr-1"}`} />
                          {video.duration}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
            <div className={`flex items-center justify-between p-4 md:p-6 border-b ${isRTL ? "flex-row-reverse" : ""}`}>
              <h3 className={`text-lg md:text-xl font-bold text-gray-900 pr-4 ${isRTL ? "text-right pl-4 pr-0" : ""}`}>
                {videos.find((v) => v.id.toString() === selectedVideo)?.title}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className={`text-white text-center p-4 ${isRTL ? "text-right" : ""}`}>
                <Play className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 opacity-50" />
                <p className="text-base md:text-lg mb-2">Video Player Placeholder</p>
                <p className="text-sm opacity-75 max-w-md mx-auto">
                  {videos.find((v) => v.id.toString() === selectedVideo)?.description}
                </p>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <div
                className={`flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Eye className={`h-3 w-3 md:h-4 md:w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                  {videos.find((v) => v.id.toString() === selectedVideo)?.views} {t("videos.views")}
                </div>
                <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Clock className={`h-3 w-3 md:h-4 md:w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                  {videos.find((v) => v.id.toString() === selectedVideo)?.duration}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
