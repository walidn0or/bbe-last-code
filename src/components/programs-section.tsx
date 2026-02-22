"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, Heart, Award, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { images, getImage } from "@/config/images"
import { InlineImageUpload } from "@/components/inline-image-upload"

type ProgramKey = Exclude<keyof typeof images.programs, "healthcare" | "rights">

export function ProgramsSection() {
  const { t, isRTL } = useLanguage()
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeKey, setActiveKey] = useState<ProgramKey | null>(null)
  const [selectedModalImage, setSelectedModalImage] = useState<string | null>(null)
  const [programImages, setProgramImages] = useState<Record<ProgramKey, string>>({
    education: images.programs.education,
    economic: images.programs.economic,
    orphans: images.programs.orphans,
    emergency: images.programs.emergency,
    refugeeSupport: images.programs.refugeeSupport,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(new URLSearchParams(window.location.search).get("admin") === "1")
      setProgramImages((prev) => ({
        education: localStorage.getItem("programs_education_image_url") || prev.education,
        economic: localStorage.getItem("programs_economic_image_url") || prev.economic,
        orphans: localStorage.getItem("programs_orphans_image_url") || prev.orphans,
        emergency: localStorage.getItem("programs_emergency_image_url") || prev.emergency,
        refugeeSupport: localStorage.getItem("programs_refugeeSupport_image_url") || prev.refugeeSupport,
      }))
    }
  }, [])

  const programs = useMemo(
    () => [
      {
        title: t("programs.education"),
        description: t("programs.educationDesc"),
        icon: GraduationCap,
        color: "blue",
        key: "education" as const,
        image: programImages.education,
        features: [
          t("programs.virtualClasses"),
          t("programs.onGroundSchools"),
          t("programs.stemEducation"),
          t("programs.certifiedPrograms"),
        ],
      },
      {
        title: t("programs.economic"),
        description: t("programs.economicDesc"),
        icon: Users,
        color: "purple",
        key: "economic" as const,
        image: programImages.economic,
        features: [
          t("programs.businessTraining"),
          t("programs.microfinanceAccess"),
          t("programs.freelancePlatforms"),
          t("programs.technicalSkills"),
        ],
      },
      {
        title: t("programs.orphans"),
        description: t("programs.orphansDesc"),
        icon: Heart,
        color: "red",
        key: "orphans" as const,
        image: programImages.orphans,
      },
      {
        title: t("programs.emergency"),
        description: t("programs.emergencyDesc"),
        icon: Award,
        color: "yellow",
        key: "emergency" as const,
        image: programImages.emergency,
      },
      {
        title: t("programs.refugeeSupport"),
        description: t("programs.refugeeSupportDesc"),
        icon: Users,
        color: "green",
        key: "refugeeSupport" as const,
        image: programImages.refugeeSupport,
      },
    ],
    [programImages, t]
  )

  const activeProgram = useMemo(() => programs.find((p) => p.key === activeKey) || null, [activeKey, programs])

  type ProgramContentBlock =
    | { type: "p"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] }
  type ProgramLongContent = Partial<Record<ProgramKey, readonly ProgramContentBlock[]>>

  const programLongContent: ProgramLongContent = useMemo(() => {
    return {
      education: [
        { type: "h3", text: "Pathways Towards Opportunities" },
        {
          type: "p",
          text: "Pathways Towards Opportunities is our flagship English and academic mobility program, created to connect resilient Afghan girls with the global education system. Since early 2025, we have supported over 300 students across Afghanistan, Iran, and Pakistan. The program is structured into Basic, Intermediate, and Advanced levels, allowing each student to receive instruction based on her academic background, learning pace, and long-term goals through need-based assessment.",
        },
        {
          type: "p",
          text: "At the core of this initiative is our IELTS Preparation Program, designed specifically for Afghan girls whose education has been interrupted by systemic exclusion. This program goes beyond teaching English. It is an academic empowerment pathway that helps students regain access to higher education, international scholarships, and future professional opportunities.",
        },
        {
          type: "p",
          text: "Classes are delivered by a carefully selected team of qualified mentors based both inside Afghanistan and internationally. All instruction takes place through secure and encrypted online platforms, ensuring student safety, privacy, and emotional well-being. These virtual classrooms are not only spaces for learning, but also safe environments for mentorship, where students receive individual guidance, connect with role models, and begin building international academic and professional networks, often for the first time.",
        },
        {
          type: "p",
          text: "Our mentors provide focused IELTS training aligned with official exam standards, alongside regular assessments, personalized feedback, and ongoing encouragement. This approach helps students work toward competitive band scores, opening doors to fully funded scholarships, university admissions, and academic mobility pathways.",
        },
        {
          type: "p",
          text: "We believe language learning can be a powerful tool for empowerment, and English in particular has proven to be a master-key that unlocks global opportunities. By transforming English proficiency into a practical and measurable pathway toward mobility and independence, Pathways Towards Opportunities does more than teach a language—it restores agency, rebuilds academic futures, and connects Afghan girls to a wider world that values their talent, resilience, and potential.",
        },
        { type: "h3", text: "Accredited Secondary and High School Education (Grades 7–12)" },
        {
          type: "p",
          text: "We are committed to ensuring that the education of Afghan girls does not end due to circumstance, displacement, or systemic exclusion. Our Accredited Secondary and High School Program is designed to protect academic continuity, preserve learning momentum, and keep future pathways to higher education open—regardless of where students are currently based.",
        },
        {
          type: "p",
          text: "The program operates through a carefully structured dual-pathway model. Through partnerships with accredited secondary institutions across Europe, Asia, and the United States, eligible students are supported to pursue internationally recognized diplomas and transferable academic credits. These credentials are essential for students seeking admission to universities abroad and ensure that their academic work is formally validated and portable.",
        },
        {
          type: "p",
          text: "At the same time, we deliver a comprehensive Afghan national curriculum for students in Grades 7 through 12, adapted for safe and remote learning environments. This parallel track ensures that students inside Afghanistan remain academically aligned with national learning standards, safeguarding their ability to re-enter formal education systems whenever local or international opportunities become available.",
        },
        {
          type: "p",
          text: "Instruction is delivered through secure virtual classrooms, supported by trained educators who understand both the academic and emotional realities facing Afghan students. Beyond subject teaching, the program includes regular assessments, academic monitoring, and documented progress tracking, allowing us to maintain educational quality and provide students with clear academic records for future use.",
        },
        {
          type: "p",
          text: "We place strong emphasis on student safeguarding, privacy, and psychological well-being. Learning environments are intentionally designed to be discreet, supportive, and flexible, allowing students to continue their studies without compromising their safety. Academic guidance and mentoring are embedded throughout the program to help students plan realistic next steps, whether toward university, alternative certification, or bridging programs.",
        },
        {
          type: "p",
          text: "By keeping students intellectually engaged, academically prepared, and credential-ready, this program ensures that Afghan girls do not lose years of education to forces beyond their control. Instead, they remain positioned to transition confidently into higher education, vocational training, or international study the moment opportunity arises.",
        },
      ],
      economic: [
        { type: "h3", text: "Empowerment Through Entrepreneurship" },
        {
          type: "p",
          text: "At Beyond Borders Empowerment, we believe that sustainable change begins within communities. When women are given the tools, trust, and opportunities to lead economically, they strengthen not only their own lives, but also their families and communities. Our Empowerment Through Entrepreneurship program is designed to advance marginalized women toward economic independence, resilience, and long-term stability.",
        },
        {
          type: "p",
          text: "The program focuses on building local capacity and community ownership through a combination of microfinance assistance, business training, financial literacy, and ongoing mentorship. Rather than offering one-time support, we work closely with women entrepreneurs to help them develop viable business models, strengthen decision-making skills, and adapt to challenging economic environments.",
        },
        {
          type: "p",
          text: "To date, Beyond Borders Empowerment has supported 11 women-led startups, many of which are rooted in traditional skills while embracing modern markets and innovation. These businesses create income opportunities not only for their founders, but also for other women within their communities.",
        },
        { type: "h3", text: "Women-Led Startups Supported by BBE" },
        {
          type: "ul",
          items: [
            "Dursa – Founded by Sheila Amiri, Dursa is a collective representing eight women-led ventures specializing in home décor, jewelry, scarves, and coffee art.",
            "Tough Hands Craft – Founded by Anita Noor, focusing on handmade crafts and jewelry.",
            "Nafis – Founded by Hadia Ghawsi, a youth-led Afghan clothing brand blending cultural identity with contemporary design.",
            "Home Decor Business – Led by Robia Zahida Faizan, highlighting traditional Nooristani woodwork and engraving.",
            "Azin – Founded by Parwana, offering traditional fashion pieces including hijabs and chapans.",
            "F.F Café – Founded by Farwa Farzan, known for homemade baked goods and beverages.",
            "Qizil – Founded by Jada, producing locally branded laptop bags and purses.",
            "Lalo – Founded by Hadia Nazare, providing handmade babywear essentials.",
            "Afghan Handmade Jewelry – Founded by Firoza Akbari, now involving over 60 young women in jewelry production and income generation.",
          ],
        },
        { type: "h3", text: "Impact Beyond Income" },
        {
          type: "p",
          text: "Each supported business represents more than an economic activity, it is a step toward dignity, self-reliance, and leadership. By investing in women entrepreneurs, we help preserve traditional skills, encourage innovation, and create pathways for women to participate meaningfully in local economies, even in highly constrained contexts. Through this program, Beyond Borders Empowerment continues to demonstrate that when women are supported as economic actors, entire communities benefit.",
        },
      ],
      orphans: [
        { type: "h3", text: "Bright Futures: Our Orphan Support Program" },
        {
          type: "p",
          text: "BBE has long served as a cornerstone for the community, particularly for those in dire need and the most marginalized. Guided by our commitment to reach, inspire, and create change, we are honored to run programs supporting orphaned children, not only as one of society’s most vulnerable groups but also as a core priority. While no initiative can fully replace the love and support of parents, our efforts aim to bring smiles to children’s faces and light the path toward a brighter future. Our support focuses on education, capacity building, emotional wellbeing, nutrition, clothing, and educational supplies, creating meaningful opportunities for children to learn, grow, and thrive.",
        },
        {
          type: "p",
          text: "On February 25, 2025, BBE had the privilege of visiting Arezo Ayenda and Mirza Hakimi Orphanages in Qala-e-Fathullah, Kabul, to bring warmth, nourishment, and happiness to 150 orphaned boys and girls.",
        },
        {
          type: "p",
          text: "The event began with the distribution of warm clothing, carefully selected to protect the children during the cold winter months. Each child also received a nutritious lunch, ensuring they had a satisfying meal and the energy to participate in the day’s activities.",
        },
        {
          type: "p",
          text: "Beyond meeting basic needs, BBE prioritized the emotional and creative well-being of the children. The day featured a series of arts and crafts activities, allowing the children to express themselves creatively, develop fine motor skills, and build confidence. The laughter and excitement that filled the orphanages reflected the positive impact of combining care with playful learning.",
        },
        {
          type: "p",
          text: "This outreach was more than a one-day event—it represented BBE’s ongoing commitment to improving the lives of vulnerable children in Afghanistan. By providing essential resources and creating moments of joy, BBE aims to nurture both the physical well-being and emotional resilience of orphaned children, helping them feel valued, supported, and empowered. The event highlighted the importance of community engagement and compassion, as every child left with not only tangible support but also a sense of inclusion, care, and encouragement for the future.",
        },
        {
          type: "p",
          text: "On the 25th of Ramadan, 24 March 2025, we had the honor of sharing Iftar with children at Mirza Hakimi and Arezo Ayenda Orphanages. On a night rooted in reflection, compassion, and togetherness, our team came together to ensure that these children were not alone at the moment of breaking their fast.",
        },
        {
          type: "p",
          text: "We provided warm, freshly prepared meals, but more importantly, we offered our presence. This initiative was not only about food, it was about standing beside these young girls and boys, acknowledging their dignity, and sharing a moment of care during one of the most spiritually meaningful times of the year.",
        },
        {
          type: "p",
          text: "In the series of “Bright Futures: Our Orphan Support Program,” on June 1, 2025, 108 orphaned children, 37 girls and 73 boys, celebrated Eid and Children’s Day at Arezo Ayenda and Mirza Hakimi Orphanages in Qala-e-Fathullah, Kabul. The celebrations were filled with joy, laughter, and a sense of community, providing the children with memorable moments of festivity and belonging.",
        },
        {
          type: "p",
          text: "After conducting a careful needs assessment, BBE ensured that each child received essential items they had requested, including shoes, school supplies, and personal necessities, supporting both their education and everyday well-being. Events like these reflect BBE’s ongoing commitment to nurturing and empowering orphaned children, giving them not only moments of happiness but also tools and support to build brighter futures. Through our initiatives, we strive to create lasting impact, hope, and opportunity in the lives of the most vulnerable children in our community.",
        },
      ],
      refugeeSupport: [
        { type: "h3", text: "Refugee Support Program" },
        {
          type: "p",
          text: "As refugee supportive organization, we believe in standing in solidarity with those seeking sanctuary in the UK, acting as a source of hope and unity. For this purpose we are pleased to had the opportunity to host refugee gathering and empowerment session in London in February 2024.",
        },
        {
          type: "p",
          text: "This event brought together over 100 participants from diverse backgrounds to foster a sense of community. During the session, we delivered specialized e-commerce training designed to give refugees the practical tools to start their own businesses or find employment, moving them closer to financial independence.",
        },
        {
          type: "p",
          text: "The event brought together people from all walks of life, including business leaders, solicitors, accountants, scholars, and students, to share their expertise and support. By connecting refugees with these professionals during our Q&A and networking segments, we helped bridge the gap between new arrivals and the wider UK community, creating a lasting support network for everyone involved.",
        },
      ],
    } as const satisfies ProgramLongContent
  }, [])

  const renderLongContent = (key: ProgramKey) => {
    const blocks = programLongContent[key]

    if (!blocks?.length) return null

    return (
      <div className="prose max-w-none">
        {blocks.map((b, idx) => {
          if (b.type === "h3") {
            return (
              <h3 key={idx} className="text-gray-900">
                {b.text}
              </h3>
            )
          }
          if (b.type === "ul") {
            return (
              <ul key={idx}>
                {b.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )
          }
          return (
            <p key={idx} className="text-gray-700 leading-relaxed">
              {b.text}
            </p>
          )
        })}
      </div>
    )
  }

  const activeGallery = useMemo(() => {
    if (!activeProgram) return []
    const fromConfig = images.programsGalleries?.[activeProgram.key] ?? []
    return Array.from(fromConfig).filter(Boolean)
  }, [activeProgram])

  const activeImage = useMemo(() => {
    if (!activeProgram) return images.fallback.placeholder
    return getImage(activeProgram.image, images.fallback.placeholder)
  }, [activeProgram])

  const modalImages = useMemo(() => {
    const base = [activeImage, ...activeGallery]
    const uniq: string[] = []
    for (const src of base) {
      if (!src) continue
      if (!uniq.includes(src)) uniq.push(src)
    }
    return uniq
  }, [activeImage, activeGallery])

  const closeModal = () => {
    setActiveKey(null)
    setSelectedModalImage(null)
  }

  useEffect(() => {
    if (!activeProgram) {
      setSelectedModalImage(null)
      return
    }

    setSelectedModalImage(activeImage)
  }, [activeProgram, activeImage])

  return (
    <section id="programs" className="py-12 md:py-16 lg:py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("programs.title")}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{t("programs.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden hover:-translate-y-1 cursor-pointer"
              onClick={() => setActiveKey(program.key)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={getImage(program.image, images.fallback.placeholder)}
                  alt={program.title}
                  width={400}
                  height={250}
                  className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                {isAdmin && (
                  <div className={`absolute bottom-3 ${isRTL ? "right-3" : "left-3"}`}>
                    <InlineImageUpload
                      label="Change program image"
                      storageKey={`programs_${program.key}_image_url`}
                      onUploaded={(url) =>
                        setProgramImages((prev) => ({ ...prev, [program.key]: url }))
                      }
                    />
                  </div>
                )}
                <div
                  className={`absolute top-3 ${isRTL ? "right-3 md:right-4" : "left-3 md:left-4"} md:top-4 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg ${
                    program.color === "blue"
                      ? "bg-blue-600"
                      : program.color === "green"
                        ? "bg-green-600"
                        : program.color === "purple"
                          ? "bg-purple-600"
                          : program.color === "red"
                            ? "bg-red-600"
                            : program.color === "orange"
                              ? "bg-orange-600"
                              : program.color === "yellow"
                                ? "bg-yellow-600"
                                : "bg-gray-600"
                  }`}
                >
                  <program.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle
                  className={`text-lg md:text-xl ${isRTL ? "text-right" : ""} ${
                    program.color === "blue"
                      ? "text-blue-700"
                      : program.color === "green"
                        ? "text-green-700"
                        : program.color === "purple"
                          ? "text-purple-700"
                          : program.color === "red"
                            ? "text-red-700"
                            : program.color === "orange"
                              ? "text-orange-700"
                              : program.color === "yellow"
                                ? "text-yellow-700"
                                : "text-gray-700"
                  }`}
                >
                  {program.title}
                </CardTitle>
                <CardDescription className={`text-gray-600 text-sm md:text-base ${isRTL ? "text-right" : ""}`}>
                  {program.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {activeProgram && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto z-10">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex justify-between items-start gap-4 z-10">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-red-600 font-semibold mb-2">{t("programs.title")}</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{activeProgram.title}</h3>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 flex-shrink-0"
                aria-label="Close"
                type="button"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>

            <div className="p-4 md:p-6">
              <div className="relative rounded-lg overflow-hidden shadow-lg bg-white mb-4">
                <div className="relative h-64 md:h-[420px] bg-gradient-to-br from-gray-50 via-white to-slate-100 flex items-center justify-center">
                  <Image
                    src={getImage(selectedModalImage || activeImage, images.fallback.placeholder)}
                    alt={`${activeProgram.title} image`}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 900px, 100vw"
                  />

                  {modalImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          const current = selectedModalImage || activeImage
                          const i = modalImages.indexOf(current)
                          const prev = modalImages[(i <= 0 ? modalImages.length : i) - 1] || modalImages[0]
                          setSelectedModalImage(prev)
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full w-9 h-9 flex items-center justify-center shadow transition"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const current = selectedModalImage || activeImage
                          const i = modalImages.indexOf(current)
                          const next = modalImages[(i + 1) % modalImages.length] || modalImages[0]
                          setSelectedModalImage(next)
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full w-9 h-9 flex items-center justify-center shadow transition"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {isAdmin && (
                    <div className="absolute bottom-3 left-3">
                      <InlineImageUpload
                        label="Change program image"
                        storageKey={`programs_${activeProgram.key}_image_url`}
                        onUploaded={(url) => {
                          setProgramImages((prev) => ({ ...prev, [activeProgram.key]: url }))
                          if (typeof window !== "undefined") {
                            localStorage.setItem(`programs_${activeProgram.key}_image_url`, url)
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">{renderLongContent(activeProgram.key)}</div>

              {modalImages.length > 1 && (
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-red-600 font-semibold mb-3">Gallery</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {modalImages.map((src, idx) => (
                      <button
                        key={`${src}-${idx}`}
                        type="button"
                        onClick={() => setSelectedModalImage(src)}
                        className={`relative rounded-lg overflow-hidden border bg-gray-50 transition-colors ${
                          (selectedModalImage || activeImage) === src
                            ? "border-red-500 ring-2 ring-red-200"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        aria-label={`View ${activeProgram.title} image ${idx + 1}`}
                      >
                        <div className="relative h-20 sm:h-24">
                          <Image
                            src={getImage(src, images.fallback.placeholder)}
                            alt={`${activeProgram.title} thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 200px, (min-width: 640px) 25vw, 33vw"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
