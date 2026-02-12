"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { images } from "@/config/images"

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { t, isRTL } = useLanguage()
  const [heroImg, setHeroImg] = useState<string>(images.hero.main)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hero_image_url")
      if (stored) setHeroImg(stored)
    }
  }, [])

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center py-10 md:py-16 lg:py-20">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-hidden="true"
        ></div>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={images.hero.main}
          aria-hidden="true"
        >
          <source src={images.hero.background} type="video/mp4" />
          <source src={images.hero.background} type="video/quicktime" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/45 to-brand-blue/35 mix-blend-multiply backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative bg-white/5 border border-white/15 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/3 to-white/0 pointer-events-none"></div>
          <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none"></div>
          <div className={`relative flex flex-col items-center text-center gap-5 md:gap-7 p-6 md:p-10 ${isRTL ? "lg:text-right" : "lg:text-left"}`}>
            <h1
              className={`max-w-4xl mx-auto text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg ${
                isRTL ? "text-right" : ""
              }`}
            >
              <span className="text-brand-blue">{t("hero.title1")}</span>
              <br />
              <span className="text-brand-blue">{t("hero.title2")}</span>
              <br />
              <span className="text-brand-blue">{t("hero.title3")}</span>
            </h1>

            <p
              className={`text-sm md:text-base lg:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto ${
                isRTL ? "text-right" : ""
              }`}
            >
              Beyond Borders Empowerment (BBE) is a women-led, non-profit organisation dedicated to fostering systemic change in marginalized communities. By centering women, youth, and children as agents of their own development, BBE addresses entrenched inequities arising from conflict, poverty, and social exclusion. Through an integrated portfolio of initiatives—including inclusive quality education, equitable healthcare access, economic empowerment, and context-driven innovation. BBE cultivates sustainable pathways for resilience, social transformation, sustainability and long-term community prosperity.
            </p>

            <div className={`flex flex-col sm:flex-row gap-2 md:gap-3 max-w-md mx-auto justify-center ${isRTL ? "sm:flex-row-reverse" : ""}`}>
              <Button
                size="lg"
                variant="default"
                className="text-xs md:text-sm lg:text-base px-4 md:px-6 lg:px-8 py-2.5 md:py-3 h-auto"
                onClick={() => scrollToSection("donate")}
              >
                <Heart className={`h-3.5 w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5 ${isRTL ? "ml-1.5 md:ml-2" : "mr-1.5 md:mr-2"}`} />
                {t("hero.supportMission")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-xs md:text-sm lg:text-base px-4 md:px-6 lg:px-8 py-2.5 md:py-3 h-auto"
                onClick={() => scrollToSection("about")}
                aria-label="Learn more about our mission"
              >
                {t("hero.learnMore")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
