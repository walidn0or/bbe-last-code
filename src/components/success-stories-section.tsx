"use client"

import Image from "next/image"
import { Quote, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect, useRef } from "react"
import { getAssetPath, images } from "@/config/images"

interface SuccessStory {
  name: string
  title: string
  quote: string
  image?: string
  video?: string
  storageKey?: string
}

function VideoCircleThumb({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onLoadedMetadata = () => {
      try {
        el.currentTime = 0.01
      } catch {}
    }

    el.addEventListener("loadedmetadata", onLoadedMetadata)
    return () => el.removeEventListener("loadedmetadata", onLoadedMetadata)
  }, [src])

  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 flex-shrink-0 ring-2 ring-red-100 border-2 border-white shadow-md bg-black">
      <video
        ref={ref}
        src={getAssetPath(src)}
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        aria-label={label}
      />
      <div className="absolute inset-0 bg-black/15" />
    </div>
  )
}

function getStoryImage(key: "barin" | "bakhti" | "moheba" | "ozra" | "wasiya"): string | undefined {
  const entry = images.successStories?.[key]
  const path = entry && "image" in entry ? entry.image : undefined
  return path && path.trim() !== "" ? path : undefined
}
function getStoryVideo(key: "barin" | "bakhti" | "moheba" | "ozra" | "wasiya"): string | undefined {
  const entry = images.successStories?.[key]
  const path = entry && "video" in entry ? entry.video : undefined
  return path && path.trim() !== "" ? path : undefined
}

const successStoriesData: SuccessStory[] = [
  {
    name: "Barin Jebran",
    title: "11th-grade student and participant in BBE-Advance English language course",
    quote:
      "My name is Barin Jebran. I am an 11th-grade student and a participant in the English language course (BBE-Advance). Unfortunately, the recent developments in our country have deprived girls of their fundamental right to education. My mother, who was a government employee, lost her job. Amid economic hardships and social pressures, after consulting with my mother and other family members, we decided—despite all difficulties to pursue education through migration, which forced us to leave our homeland.\n\nMy sister, Beshetta Jebran, who was in 7th grade, my mother, and I spent two years in Iran, where we successfully completed two academic years. However, difficult conditions, lack of educational resources, and changes in Iranian government policies toward migrants forced us to return.\n\nEven though hope seemed lost and we faced many hardships, we did not give up. Our efforts were focused on finding even a small opportunity to continue our education.\n\nDuring this time, one of my mother’s colleagues, who lives in the UK, introduced us to this online English language course. This program became a valuable opportunity and a light in the darkness for us. Today, we are doing our best to make the most of this chance.\n\nI never imagined that even a small pathway to continue my education could exist, and now I am deeply grateful that this course has brought new hope for my sister and me.\n\nI am confident that the path to progress is opening before us, and with perseverance, a bright future awaits.\n\nWith sincere gratitude,\nBarin Jebran",
    image: getStoryImage("barin"),
    video: getStoryVideo("barin"),
    storageKey: "success_story_barin_image"
  },
  {
    name: "Bakhti Ahmadi",
    title: "Master’s student in Software Engineering",
    quote:
      "When Afghanistan fell to the Taliban in 2021, my life changed forever. In that moment, I didn’t just lose my homeland—I lost the future I had once dreamed of. Along with my father, mother, and younger sister, we were forced to flee and seek refuge in Iran.\n\nMigration wasn’t just a change of place—it was the beginning of a struggle to hold onto education, to keep hope alive, and to rebuild a shattered identity. Despite the hardships, I chose not to give up. I resumed my education in Iran and today, I am pursuing my Master’s degree in Software Engineering.\n\nAlong this journey, I discovered Beyond Borders Empowerment—an organization that has done more than just offer online education to displaced Afghan girls. It has reignited hope, built community, and empowered women who were once silenced. By joining this program, I’ve strengthened my English skills, gained access to quality learning, and most importantly, felt seen and heard. This is more than a classroom—it is a home, a support system, and a platform for growth.\n\nMy story is the story of thousands of Afghan girls—girls who may have lost their country, but never their courage. Beyond Borders Empowerment has given us wings, and I am proud to be one of many flying toward a brighter, stronger future.\n\nMy purpose in enhancing my English proficiency is to open new doors for pursuing education at an international level and advancing my knowledge and skills. I sincerely hope that with the support of the esteemed organization Beyond Borders Empowerment, I will gain valuable opportunities for personal and professional growth. Their encouragement inspires me to overcome challenges and build a bright and successful future.\n\nBakhti Ahmadi",
    image: getStoryImage("bakhti"),
    video: getStoryVideo("bakhti"),
    storageKey: "success_story_bakhti_image"
  },
  {
    name: "Moheba Karimi",
    title: "Student, Beyond Borders Empowerment",
    quote:
      "I am grateful to be part of the Beyond Borders Empowerment program. It has given me hope and the opportunity to continue my education even in difficult times. The teachers are supportive and the classes have helped me improve my skills and confidence. I believe education is the key to a better future, and this program is making that possible for girls like me in Afghanistan.",
    image: getStoryImage("moheba"),
    video: getStoryVideo("moheba"),
    storageKey: "success_story_moheba_image"
  },
  {
    name: "Ozra Penhan",
    title: "Student, Beyond Borders Empowerment",
    quote:
      "Being part of Beyond Borders Empowerment has changed my life. I lost hope when schools closed, but this program brought back my dream of education. The online classes are excellent and the teachers really care about our progress. I want to thank everyone who supports this program – you are giving us a chance to build a better future.",
    image: getStoryImage("ozra"),
    video: getStoryVideo("ozra"),
    storageKey: "success_story_ozra_image"
  },
  {
    name: "Wasiya Safi",
    title: "Student, Beyond Borders Empowerment",
    quote:
      "The Beyond Borders Empowerment program has been a lifeline for me and many other girls. When everything seemed dark, this program showed us that there is still hope. The quality of education and the support we receive is remarkable. I am determined to make the most of this opportunity and one day give back to my community.",
    image: getStoryImage("wasiya"),
    video: getStoryVideo("wasiya"),
    storageKey: "success_story_wasiya_image"
  }
]

export function SuccessStoriesSection() {
  const { t, isRTL } = useLanguage()
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null)
  const [storyImages, setStoryImages] = useState<Record<string, string>>({})

  useEffect(() => {
    if (typeof window !== "undefined") {
      successStoriesData.forEach((story) => {
        if (story.storageKey) {
          const savedImage = localStorage.getItem(story.storageKey)
          if (savedImage) {
            setStoryImages((prev) => ({ ...prev, [story.storageKey!]: savedImage }))
          }
        }
      })
    }
  }, [])

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("testimonials.title")}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-7xl mx-auto">
          {successStoriesData.map((story, index) => {
            const hasImage = !!(storyImages[story.storageKey || ""] || story.image)
            const hasVideo = !!story.video
            return (
              <div
                key={index}
                onClick={() => setSelectedStory(story)}
                className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl will-change-transform"
              >
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden h-full min-h-[260px] md:min-h-[280px] flex flex-col">
                  <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-blue-600 flex-shrink-0" />
                  <div className="p-5 md:p-6 flex flex-col items-center text-center flex-1">
                    {hasImage ? (
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 flex-shrink-0 ring-2 ring-red-100 border-2 border-white shadow-md">
                        <Image
                          src={storyImages[story.storageKey || ""] || story.image!}
                          alt={story.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 80px, 96px"
                        />
                      </div>
                    ) : hasVideo ? (
                      <VideoCircleThumb src={story.video!} label={`${story.name} video preview`} />
                    ) : (
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center mb-3 flex-shrink-0 ring-2 ring-red-100 border-2 border-white shadow-md">
                        <span className="text-white text-xl md:text-2xl font-bold">{story.name.charAt(0)}</span>
                      </div>
                    )}
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-0.5 group-hover:text-red-600 transition-colors leading-tight">
                      {story.name}
                    </h3>
                    {story.title && (
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-1 min-h-[2.5rem]">{story.title}</p>
                    )}
                    <div className="mt-auto pt-1">
                      <Quote className="h-5 w-5 md:h-6 md:w-6 text-red-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <p className="text-xs text-gray-500 font-medium">{t("testimonials.clickToReadMore")}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-blue-600/0 group-hover:from-red-600/5 group-hover:to-blue-600/5 transition-all duration-300 pointer-events-none rounded-xl" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedStory && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedStory(null)}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient */}
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-blue-600 text-white p-6 flex justify-between items-start gap-4 z-10">
              <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    {(storyImages[selectedStory.storageKey || ""] || selectedStory.image) ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/30">
                        <Image
                          src={getAssetPath(storyImages[selectedStory.storageKey || ""] || selectedStory.image || "/images/placeholder.jpg")}
                          alt={selectedStory.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : selectedStory.video ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/30 bg-black">
                        <video
                          src={getAssetPath(selectedStory.video)}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                          aria-label={`${selectedStory.name} video preview`}
                        />
                        <div className="absolute inset-0 bg-black/15" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30">
                        <span className="text-white text-xl font-bold">{selectedStory.name.charAt(0)}</span>
                      </div>
                    )}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-1">Meet {selectedStory.name}</h3>
                    {selectedStory.title && (
                      <p className="text-white/90 text-sm md:text-base">{selectedStory.title}</p>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStory(null)}
                className="text-white hover:text-gray-200 p-2 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 md:p-8">
              {(() => {
                const hasImage = !!(storyImages[selectedStory.storageKey || ""] || selectedStory.image)
                return (
                  <>
                    {hasImage && (
                      <div className="relative w-full h-52 md:h-64 rounded-xl overflow-hidden mb-6 shadow-lg">
                        <Image
                          src={storyImages[selectedStory.storageKey || ""] || selectedStory.image!}
                          alt={selectedStory.name}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 800px, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-3 left-4">
                          <Quote className="h-8 w-8 text-white/90" />
                        </div>
                      </div>
                    )}
                    {selectedStory.video && (
                      <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-xl overflow-hidden mb-6 shadow-lg bg-black">
                        <video
                          src={getAssetPath(selectedStory.video)}
                          controls
                          className="w-full h-full object-contain"
                          preload="metadata"
                        >
                          <source src={getAssetPath(selectedStory.video)} type="video/mp4" />
                          <source src={getAssetPath(selectedStory.video)} type="video/quicktime" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </>
                )
              })()}
              
              {/* Quote Text */}
              {selectedStory.quote && (
                <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-xl p-6 md:p-8 border-l-4 border-red-600">
                  <p className={`text-gray-800 leading-relaxed text-base md:text-lg whitespace-pre-line ${isRTL ? "text-right" : ""}`}>
                    {selectedStory.quote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
