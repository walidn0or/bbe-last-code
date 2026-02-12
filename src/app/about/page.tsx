"use client"

import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  // Simple navigation handler for separate pages
  const handleNavigation = (sectionId: string) => {
    switch (sectionId) {
      case "home":
        window.location.href = "/"
        break
      case "about":
        window.location.href = "/about"
        break
      case "programs":
        window.location.href = "/programs"
        break
      case "news":
        window.location.href = "/news"
        break
      case "impact":
        window.location.href = "/impact"
        break
      case "contact":
        window.location.href = "/contact"
        break
      default:
        window.location.href = "/"
    }
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header activeSection="about" scrollToSection={handleNavigation} />
        <main>
          <AboutSection />
        </main>
        <Footer scrollToSection={handleNavigation} />
      </div>
    </LanguageProvider>
  )
}
