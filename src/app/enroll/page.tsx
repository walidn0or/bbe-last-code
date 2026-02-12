"use client"

import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, ArrowRight } from "lucide-react"

export default function EnrollPage() {
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
        <Header activeSection="enroll" scrollToSection={handleNavigation} />
        <main className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Enroll Now</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Join our educational programs and start your journey towards empowerment and growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* School Enrollment */}
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-red-100">
                <CardHeader className="bg-gradient-to-br from-red-50 to-red-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">School</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Enroll in our accredited secondary and high school education program (Grades 7-12). 
                    We offer both internationally recognized diplomas and Afghan national curriculum 
                    through secure virtual classrooms.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✓</span>
                      <span>Accredited secondary and high school education</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✓</span>
                      <span>Grades 7-12</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✓</span>
                      <span>Secure virtual learning environment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✓</span>
                      <span>Internationally recognized credentials</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                    onClick={() => window.open("https://forms.google.com", "_blank")}
                  >
                    Enroll in School
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Language Course Enrollment */}
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-blue-100">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Language Course</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Join our free virtual English classes and IELTS preparation program. Open to young 
                    girls and women from over 15 provinces in Afghanistan. Classes are taught by 
                    qualified instructors including British-certified IELTS trainers.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>Free virtual English classes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>IELTS preparation program</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>Qualified British instructors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>Basic, Intermediate, and Advanced levels</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    onClick={() => window.open("https://forms.google.com", "_blank")}
                  >
                    Enroll in Language Course
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Have questions about enrollment? Contact us for more information.
              </p>
              <Button 
                variant="outline"
                onClick={() => handleNavigation("contact")}
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </main>
        <Footer scrollToSection={handleNavigation} />
      </div>
    </LanguageProvider>
  )
}
