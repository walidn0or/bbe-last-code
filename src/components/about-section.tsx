"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Lightbulb, Users, Globe, Shield, Award, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { images, getImage } from "@/config/images"

export function AboutSection() {
  const { t, isRTL } = useLanguage()

  const coreValues = [
    {
      title: t("about.inclusiveness"),
      description: t("about.inclusivenessDesc"),
      icon: Users,
      color: "red",
      image: images.about.values.inclusiveness,
    },
    {
      title: t("about.sustainability"),
      description: t("about.sustainabilityDesc"),
      icon: Globe,
      color: "green",
      image: images.about.values.sustainability,
    },
    {
      title: t("about.accountability"),
      description: t("about.accountabilityDesc"),
      icon: Shield,
      color: "blue",
      image: images.about.values.accountability,
    },
    {
      title: t("about.empowerment"),
      description: t("about.empowermentDesc"),
      icon: Award, // replaced HandHeart with Award
      color: "purple",
      image: images.about.values.empowerment,
    },
    {
      title: t("about.dignity"),
      description: t("about.dignityDesc"),
      icon: Heart,
      color: "pink",
      image: images.about.values.dignity,
    },
  ]

  return (
    <>
      {/* About Section */}
      <section id="about" className="py-12 md:py-16 lg:py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("about.title")}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-10"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{t("about.subtitle")}</p>
          </div>

          {/* Story Section */}
          <div
            className={`max-w-4xl mx-auto mb-16 lg:mb-20 ${isRTL ? "text-right" : ""}`}
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Organizational Background</h3>
              <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed">
                Beyond Borders Empowerment (BBE) is a registered nonprofit organization founded in early 2023 by a dedicated team of professionals, including educators, university professors, writers, medical doctors, journalists, human rights defenders, and legal experts. BBE is built on the philosophy and principles of human rights, social justice, respect for human dignity, and collective efforts to foster growth and empowerment.
              </p>
              <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed">
                At BBE, we work tirelessly towards sustainable outcomes, and we believe in the principle that &quot;we teach our communities to fish, instead of giving them a fish.&quot; We are confident that such self-sufficiency and sustainability can only be achieved by ensuring equal rights and opportunities for all, enabling everyone to reach their maximum potential and make a difference — including women and girls, who make up half of the population.
              </p>
              <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed">
                That said, we prioritize not only meeting immediate needs but also fostering long-term sustainable development by equipping marginalized communities with the resources necessary for self-reliance. Since our founding, we have stood firmly committed to empowering marginalized communities by providing access to quality education, fostering economic independence through entrepreneurship and employment, and supporting access to essential healthcare, as well as providing humanitarian aid during crises. Through sustainable, community-led initiatives, we strive to close social gaps and equip individuals to become agents of lasting change.
              </p>
              <div className={`mt-6 flex ${isRTL ? "justify-end" : "justify-start"}`}>
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
                  <Link href="/about/background">Read Full Background</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div id="mission-vision" className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto scroll-mt-20">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-red-50 to-red-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <CardHeader className="relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                  <Target className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <CardTitle className={`text-xl md:text-2xl text-red-700 ${isRTL ? "text-right" : ""}`}>
                  {t("about.missionTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className={`text-gray-700 leading-relaxed text-sm md:text-base ${isRTL ? "text-right" : ""}`}>
                  {t("about.missionText")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <CardHeader className="relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <CardTitle className={`text-xl md:text-2xl text-blue-700 ${isRTL ? "text-right" : ""}`}>
                  {t("about.visionTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className={`text-gray-700 leading-relaxed text-sm md:text-base ${isRTL ? "text-right" : ""}`}>
                  {t("about.visionText")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="core-values" className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("about.valuesTitle")}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600">{t("about.valuesSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={getImage(value.image)}
                    alt={value.title}
                    width={300}
                    height={200}
                    className="w-full h-24 md:h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardContent className={`pt-4 md:pt-6 text-center p-4 ${isRTL ? "text-right" : ""}`}>
                  <div
                    className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform ${
                      value.color === "red"
                        ? "bg-red-100"
                        : value.color === "green"
                          ? "bg-green-100"
                          : value.color === "blue"
                            ? "bg-blue-100"
                            : value.color === "purple"
                              ? "bg-purple-100"
                              : value.color === "pink"
                                ? "bg-pink-100"
                                : "bg-gray-100"
                    }`}
                  >
                    <value.icon
                      className={`h-4 w-4 md:h-6 md:w-6 ${
                        value.color === "red"
                          ? "text-red-600"
                          : value.color === "green"
                            ? "text-green-600"
                            : value.color === "blue"
                              ? "text-blue-600"
                              : value.color === "purple"
                                ? "text-purple-600"
                                : value.color === "pink"
                                  ? "text-pink-600"
                                  : "text-gray-600"
                      }`}
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{value.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
