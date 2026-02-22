"use client"

import Image from "next/image"
import { useMemo, useState, useEffect } from "react"
import { X, Upload } from "lucide-react"
import { images, getImage } from "@/config/images"
import { InlineImageUpload } from "@/components/inline-image-upload"

interface WorkItem {
  key: keyof typeof images.ourWork
  title: string
  description: string
}

const workItems: WorkItem[] = [
  {
    key: "menstrualHygiene",
    title: "Breaking the Stereotypes",
    description:
      "Menstruation is a natural biological process and should never be treated as a taboo. Understanding it is essential for self-care, health, and empowerment. In October 2024, our team delivered comprehensive hygiene education and training for young girls in Qala Fatullah, Kabul, Afghanistan. Alongside the training, we provided essential menstrual hygiene supplies to support their health and well-being. These initiatives were made possible with the generous support of our partners and donors, enabling us to address critical gaps in knowledge and resources while promoting dignity, confidence, and resilience among vulnerable girls in marginalized communities.",
  },
  {
    key: "languageSkills",
    title: "Enhancing Language Skills",
    description:
      "Our free virtual English classes empower young girls and women from over 15 provinces in Afghanistan to strengthen their language abilities, access educational resources and information, and expand their professional and social networks. These classes are designed not only to improve communication skills but also to foster confidence, critical thinking, and opportunities for personal and economic growth in marginalized communities. We also offer a free, virtual IELTS preparation program taught by qualified British instructors. This initiative provides participants with the opportunity to strengthen their English proficiency and prepare for international study or professional opportunities abroad. The program delivers high-quality instruction at no cost, equipping learners with the skills and guidance necessary to achieve a recognized IELTS score upon completion, thereby opening doors to higher education, scholarships, and global career pathways.",
  },
  {
    key: "orphanSupport",
    title: "Orphan Support Program",
    description:
      "Beyond Borders Empowerment is honored to serve children in two orphanages in Qala Fatullah, Kabul, Afghanistan. Our compassionate team provides consistent care and creates a nurturing environment where children can thrive emotionally, socially, and creatively. Through activities such as art workshops, storytelling, and small celebrations during Ramadan, Eid, Children's Day, and other cultural events, we foster joy, laughter, and a sense of belonging. By combining care with opportunities for personal expression and social engagement, our program empowers these young lives to build resilience, confidence, and hope for a brighter future.",
  },
  {
    key: "scholarshipMentorship",
    title: "Scholarship and Mentorship Programs",
    description:
      "Beyond Borders Empowerment regularly provides scholarship guidance and mentorship sessions for women and girls, equipping them with the knowledge, skills, and confidence to pursue higher education and professional opportunities. Through these sessions, participants gain access to information on scholarship opportunities, receive personalized advice, and engage with mentors and alumni who offer guidance, encouragement, and support. By fostering both knowledge and empowerment, these programs help women and girls navigate educational pathways and realize their full potential.",
  },
  {
    key: "artClub",
    title: "Our Art Club",
    description:
      "Beyond Borders Empowerment's Art Club offers a vital creative outlet in the restrictive environment of Afghanistan, where opportunities for artistic expression are limited for women, girls, and even men. These classes provide beneficiaries with a safe and supportive space to come together, learn new skills, and connect with peers. Meeting twice a week, participants can explore their artistic talents, express themselves freely, and cultivate confidence and resilience. Through this program, art becomes not only a means of personal development but also a powerful tool for empowerment, self-discovery, and community engagement.",
  },
  {
    key: "healthSupport",
    title: "Our Health Support Program",
    description:
      "We organize free health camps in partnership with a network of professional doctors, providing critical healthcare services to those who need them most. These camps specifically target vulnerable populations, including women, children, the elderly, and forced returnees from neighboring countries. Participants receive access to quality medical care, essential medications, and health guidance, ensuring that basic healthcare needs are met. By combining professional expertise with community outreach, these health camps play a vital role in promoting well-being, resilience, and improved quality of life among marginalized communities. Our health team also provides critical support to individuals facing severe financial hardship, ensuring access to essential healthcare even when resources are limited. In emergency cases, they assist with hospital visit fees and the purchase of necessary medications, helping vulnerable community members overcome financial barriers and receive timely medical care.",
  }
]

export function OurWork() {
  const [activeKey, setActiveKey] = useState<keyof typeof images.ourWork | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [workImages, setWorkImages] = useState<Record<string, string>>({})
  const [selectedModalImage, setSelectedModalImage] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(new URLSearchParams(window.location.search).get("admin") === "1")
      // Load saved images from localStorage
      workItems.forEach((item) => {
        const key = String(item.key)
        const mainImg = localStorage.getItem(`our_work_${key}_image_url`)
        if (mainImg) {
          setWorkImages((prev) => ({ ...prev, [key]: mainImg }))
        }
      })
    }
  }, [])

  const activeItem = useMemo(() => workItems.find((w) => w.key === activeKey) || null, [activeKey])
  const activeImage = useMemo(() => {
    if (!activeItem) return images.fallback.placeholder
    const key = String(activeItem.key)
    return workImages[key] || getImage(images.ourWork[activeItem.key], images.fallback.placeholder)
  }, [activeItem, workImages])

  const closeModal = () => {
    setActiveKey(null)
    setSelectedModalImage(null)
  }

  useEffect(() => {
    if (!activeItem) {
      setSelectedModalImage(null)
      return
    }

    setSelectedModalImage(activeImage)
  }, [activeItem, activeImage])

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Work</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 font-semibold leading-relaxed">
            Programs that move our communities forward
          </p>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            From health and dignity to language skills and creative expression, each initiative is built with and for the people we serve.
          </p>
        </div>

        <div className="grid gap-4 md:gap-5 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item) => {
            const key = String(item.key)
            const mainImage = workImages[key] || getImage(images.ourWork[item.key], images.fallback.placeholder)
            // Truncate description to 2 lines
            const truncatedDesc = item.description.length > 120 
              ? item.description.substring(0, 120) + "..." 
              : item.description

            return (
              <div
                key={key}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setActiveKey(item.key)
                }}
              >
                <div className="relative h-32 md:h-36 lg:h-40 overflow-hidden">
                  <Image
                    src={getImage(mainImage, images.fallback.placeholder)}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"></div>
                  <span className="absolute top-2 right-2 bg-white/90 text-red-600 text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full shadow text-center max-w-[80%] truncate">
                    {item.title}
                  </span>
                  {isAdmin && (
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <InlineImageUpload
                        storageKey={`our_work_${key}_image_url`}
                        onUploaded={(url) => {
                          setWorkImages((prev) => ({ ...prev, [key]: url }))
                          if (typeof window !== "undefined") {
                            localStorage.setItem(`our_work_${key}_image_url`, url)
                          }
                        }}
                      >
                        <div className="bg-white/90 hover:bg-white text-red-600 px-2 py-1 rounded text-[10px] flex items-center gap-1 shadow cursor-pointer">
                          <Upload className="h-3 w-3" />
                          Change
                        </div>
                      </InlineImageUpload>
                    </div>
                  )}
                </div>
                <div className="p-3 md:p-4 space-y-2">
                  <h3 className="text-sm md:text-base font-bold text-gray-900 truncate">{item.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>{truncatedDesc}</p>
                  <button 
                    className="text-red-600 text-xs font-semibold hover:text-red-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveKey(item.key)
                    }}
                  >
                    Read more →
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex justify-between items-start gap-4 z-10">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-red-600 font-semibold mb-2">Our Work</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{activeItem.title}</h3>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 flex-shrink-0"
                aria-label="Close"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 whitespace-pre-line">
                {activeItem.description}
              </p>
              
              <div className="relative rounded-lg overflow-hidden shadow-lg bg-black mb-4">
                <div className="relative h-64 md:h-80 bg-black flex items-center justify-center">
                  <Image
                    src={getImage(selectedModalImage || activeImage, images.fallback.placeholder)}
                    alt={`${activeItem.title} image`}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 800px, 100vw"
                  />
                </div>
                {isAdmin && (
                  <div className="absolute bottom-3 left-3">
                    <InlineImageUpload
                      storageKey={`our_work_${String(activeItem.key)}_image_url`}
                      onUploaded={(url) => {
                        const key = String(activeItem.key)
                        setWorkImages((prev) => ({ ...prev, [key]: url }))
                        if (typeof window !== "undefined") {
                          localStorage.setItem(`our_work_${key}_image_url`, url)
                        }
                      }}
                    >
                      <div className="bg-white/90 hover:bg-white text-red-600 px-3 py-1.5 rounded text-xs flex items-center gap-1.5 shadow cursor-pointer">
                        <Upload className="h-3.5 w-3.5" />
                        Change Main Image
                      </div>
                    </InlineImageUpload>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
