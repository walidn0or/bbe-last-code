"use client"

import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BookOpen, Users, Download } from "lucide-react"
import { images } from "@/config/images"
import { useLanguage } from "@/contexts/language-context"

function PublicationsContent() {
  const { t, isRTL } = useLanguage()

  return (
    <main className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{t("publications.title")}</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{t("publications.subtitle")}</p>
        </div>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-8 w-8 text-red-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t("publications.annualReports")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  {t("publications.financialReports")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{t("publications.financialReportsDesc")}</p>
                <a
                  href={images.publications?.annualReports?.financialReportsPdf}
                  download
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                >
                  <Download className="h-4 w-4" />
                  {t("publications.downloadReports")}
                </a>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  {t("publications.narrativeReports")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{t("publications.narrativeReportsDesc")}</p>
                <a
                  href={images.publications?.annualReports?.narrativeReportsPdf}
                  download
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                >
                  <Download className="h-4 w-4" />
                  {t("publications.downloadReports")}
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t("publications.libraryTitle")}</h2>
          </div>
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 md:p-8">
              <p className="text-gray-700 leading-relaxed mb-4">{t("publications.libraryDesc")}</p>
              <p className="text-gray-600 text-sm">{t("publications.libraryNote")}</p>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <Users className="h-8 w-8 text-purple-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t("publications.narrativesTitle")}</h2>
          </div>
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 md:p-8">
              <p className="text-gray-700 leading-relaxed mb-4">{t("publications.narrativesDesc")}</p>
              <p className="text-gray-600 text-sm">{t("publications.narrativesNote")}</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

export default function PublicationsPage() {
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
        <Header activeSection="publications" scrollToSection={handleNavigation} />
        <PublicationsContent />
        <Footer scrollToSection={handleNavigation} />
      </div>
    </LanguageProvider>
  )
}
