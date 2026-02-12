"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Star, Sparkles, User } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { images } from "@/config/images"

export function TestimonialsSection() {
  const { t, isRTL } = useLanguage()

  const testimonials = [
    {
      quote: t("testimonials.quote1"),
      name: t("testimonials.name1"),
      role: t("testimonials.role1"),
      image: images.testimonials.person1,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
    },
    {
      quote: t("testimonials.quote2"),
      name: t("testimonials.name2"),
      role: t("testimonials.role2"),
      image: images.testimonials.person2,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
    },
    {
      quote: t("testimonials.quote3"),
      name: t("testimonials.name3"),
      role: t("testimonials.role3"),
      image: images.testimonials.person3,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-red-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-red-600 mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t("testimonials.title")}</h2>
            <Sparkles className="h-6 w-6 text-red-600 ml-2" />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((story, index) => (
            <Card
              key={index}
              className={`border-0 shadow-xl bg-gradient-to-br ${story.bgGradient} relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${story.gradient} opacity-10 rounded-full -translate-y-16 translate-x-16`}></div>
              <CardContent className="pt-6 md:pt-8 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  {/* Profile Image or Icon */}
                  {story.image && !story.image.includes('placeholder') ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={story.image}
                        alt={story.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center shadow-lg`}>
                      <User className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p
                  className={`text-gray-800 mb-6 leading-relaxed text-sm md:text-base font-medium ${isRTL ? "text-right" : ""}`}
                >
                  {"\u201C"}{story.quote}{"\u201D"}
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <p className={`font-bold text-gray-900 text-base ${isRTL ? "text-right" : ""}`}>{story.name}</p>
                  <p className={`text-sm text-gray-600 mt-1 ${isRTL ? "text-right" : ""}`}>{story.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
