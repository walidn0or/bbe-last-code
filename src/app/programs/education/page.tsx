"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { images, getImage } from "@/config/images"

export default function EducationalProgramsPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const gallery = useMemo(() => {
    const list = images.programsGalleries?.education ?? []
    const cleaned = Array.from(list).filter(Boolean)
    return cleaned.length ? cleaned : [images.programs.education]
  }, [])

  const heroImage = activeImage || gallery[0] || images.programs.education

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
        <Header activeSection="programs" scrollToSection={handleNavigation} />

        <main>
          <section className="py-10 md:py-14 lg:py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Our Educational Programs</h1>
                <Button asChild variant="outline">
                  <Link href="/programs">← Back to Programs</Link>
                </Button>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-50 via-white to-slate-100 border border-gray-200">
                <div className="relative h-56 sm:h-72 md:h-[420px]">
                  <Image
                    src={getImage(heroImage, images.fallback.placeholder)}
                    alt="Educational programs"
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 1000px, 100vw"
                  />
                </div>

                <div className="p-4 md:p-6 border-t border-gray-200 bg-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-red-600 font-semibold mb-3">Gallery</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {gallery.map((src, idx) => (
                      <button
                        key={`${src}-${idx}`}
                        type="button"
                        onClick={() => setActiveImage(src)}
                        className={`relative rounded-lg overflow-hidden border bg-gray-50 transition-colors ${
                          (activeImage || gallery[0]) === src
                            ? "border-red-500 ring-2 ring-red-200"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <div className="relative h-16 sm:h-20">
                          <Image
                            src={getImage(src, images.fallback.placeholder)}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 200px, (min-width: 640px) 25vw, 33vw"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="max-w-4xl mx-auto mt-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Pathways Towards Opportunities</h2>
                <div className="prose max-w-none text-gray-800">
                  <p>
                    Pathways Towards Opportunities is our flagship English and academic mobility program, created to connect resilient Afghan girls with the global education system. Since early 2025, we have supported over 300 students across Afghanistan, Iran, and Pakistan. The program is structured into Basic, Intermediate, and Advanced levels, allowing each student to receive instruction based on her academic background, learning pace, and long-term goals through need-based assessment.
                  </p>
                  <p>
                    At the core of this initiative is our IELTS Preparation Program, designed specifically for Afghan girls whose education has been interrupted by systemic exclusion. This program goes beyond teaching English. It is an academic empowerment pathway that helps students regain access to higher education, international scholarships, and future professional opportunities.
                  </p>
                  <p>
                    Classes are delivered by a carefully selected team of qualified mentors based both inside Afghanistan and internationally. All instruction takes place through secure and encrypted online platforms, ensuring student safety, privacy, and emotional well-being. These virtual classrooms are not only spaces for learning, but also safe environments for mentorship, where students receive individual guidance, connect with role models, and begin building international academic and professional networks, often for the first time.
                  </p>
                  <p>
                    Our mentors provide focused IELTS training aligned with official exam standards, alongside regular assessments, personalized feedback, and ongoing encouragement. This approach helps students work toward competitive band scores, opening doors to fully funded scholarships, university admissions, and academic mobility pathways.
                  </p>
                  <p>
                    We believe language learning can be a powerful tool for empowerment, and English in particular has proven to be a master-key that unlocks global opportunities. By transforming English proficiency into a practical and measurable pathway toward mobility and independence, Pathways Towards Opportunities does more than teach a language—it restores agency, rebuilds academic futures, and connects Afghan girls to a wider world that values their talent, resilience, and potential.
                  </p>

                  <h3>Accredited Secondary and High School Education (Grades 7–12)</h3>
                  <p>
                    We are committed to ensuring that the education of Afghan girls does not end due to circumstance, displacement, or systemic exclusion. Our Accredited Secondary and High School Program is designed to protect academic continuity, preserve learning momentum, and keep future pathways to higher education open—regardless of where students are currently based.
                  </p>
                  <p>
                    The program operates through a carefully structured dual-pathway model. Through partnerships with accredited secondary institutions across Europe, Asia, and the United States, eligible students are supported to pursue internationally recognized diplomas and transferable academic credits. These credentials are essential for students seeking admission to universities abroad and ensure that their academic work is formally validated and portable.
                  </p>
                  <p>
                    At the same time, we deliver a comprehensive Afghan national curriculum for students in Grades 7 through 12, adapted for safe and remote learning environments. This parallel track ensures that students inside Afghanistan remain academically aligned with national learning standards, safeguarding their ability to re-enter formal education systems whenever local or international opportunities become available.
                  </p>
                  <p>
                    Instruction is delivered through secure virtual classrooms, supported by trained educators who understand both the academic and emotional realities facing Afghan students. Beyond subject teaching, the program includes regular assessments, academic monitoring, and documented progress tracking, allowing us to maintain educational quality and provide students with clear academic records for future use.
                  </p>
                  <p>
                    We place strong emphasis on student safeguarding, privacy, and psychological well-being. Learning environments are intentionally designed to be discreet, supportive, and flexible, allowing students to continue their studies without compromising their safety. Academic guidance and mentoring are embedded throughout the program to help students plan realistic next steps, whether toward university, alternative certification, or bridging programs.
                  </p>
                  <p>
                    By keeping students intellectually engaged, academically prepared, and credential-ready, this program ensures that Afghan girls do not lose years of education to forces beyond their control. Instead, they remain positioned to transition confidently into higher education, vocational training, or international study the moment opportunity arises.
                  </p>

                  <h3>Digital Literacy, AI, and Future Technologies</h3>
                  <p>
                    In an era shaped by rapid digital transformation, access to technology skills is no longer optional—it is essential for independence, economic participation, and long-term resilience. Our Digital Literacy, AI, and Future Technologies Program is designed to ensure that Afghan girls and young women are not left behind in the global digital economy.
                  </p>
                  <p>
                    The program begins with a strong foundation in computer literacy, offering structured training in the Microsoft Office Suite, including Word, Excel, PowerPoint, and data organization tools. Students learn to create professional documents, manage and analyze data, and communicate effectively in academic and workplace settings—skills that are critical for remote work, higher education, and entrepreneurship.
                  </p>
                  <p>
                    Building on this foundation, students are introduced to emerging technologies through our AI Clubs and coding intensives. These learning spaces expose students to the basics of programming, logical thinking, and software development, while also encouraging curiosity about artificial intelligence and its real-world applications. The focus is not only on technical skills, but on problem-solving, critical thinking, and adaptability—competencies that prepare students for evolving career landscapes.
                  </p>
                  <p>
                    To ensure accessibility and meaningful learning, instruction is delivered using a bilingual teaching approach. Complex technical concepts and coding logic are first explained in students’ native languages, while key technical terms and industry vocabulary are introduced in English. This method allows students to fully grasp advanced concepts while simultaneously building the English proficiency required to participate in global tech, academic, and professional environments.
                  </p>
                  <p>
                    All learning takes place within secure virtual settings, with an emphasis on digital safety, responsible technology use, and confidence-building. Through this program, students gain not only technical knowledge, but also the self-assurance to apply these skills in real-world contexts.
                  </p>
                  <p>
                    By equipping students with practical digital skills and early exposure to future technologies, this program opens pathways to remote employment, online education, entrepreneurship, and continued learning. Most importantly, it empowers Afghan girls to see themselves not just as users of technology, but as active participants and future leaders in the digital world.
                  </p>

                  <h3>STEM Excellence Project</h3>
                  <p>
                    Science, Technology, Engineering, and Mathematics (STEM) play a decisive role in shaping modern economies and solving global challenges. Yet across the region, girls and women remain significantly underrepresented in these fields, largely due to restricted access, disrupted schooling, and systemic barriers. Our STEM Excellence Program directly addresses this gap through a Community-Based Education (CBE) model, designed to make high-quality STEM learning accessible, safe, and relevant.
                  </p>
                  <p>
                    Through this approach, rigorous instruction in mathematics, science, and foundational engineering concepts is delivered directly within students’ most accessible and secure learning environments. By decentralizing education and adapting it to community-based and remote formats, we ensure that students can continue learning despite mobility restrictions or limited access to formal institutions.
                  </p>
                  <p>
                    The curriculum emphasizes conceptual understanding, critical thinking, and practical problem-solving, rather than rote memorization. Students are encouraged to ask questions, analyze real-world challenges, and apply scientific reasoning to everyday contexts. This approach builds confidence and competence while helping students see STEM not as abstract subjects, but as tools for understanding and shaping the world around them.
                  </p>
                  <p>
                    Instruction is provided by trained educators who are sensitive to the social and educational realities facing Afghan girls. Lessons are supported by structured assessments, guided practice, and mentorship, allowing students to track their progress and develop academic discipline. Wherever possible, learning is linked to future pathways in higher education, digital learning, and technical careers.
                  </p>
                  <p>
                    By fostering analytical thinking and technical skills through community-based delivery, this program helps prepare Afghan girls to pursue advanced studies, technical training, and emerging STEM-related fields when opportunities become available. More importantly, it challenges long-standing exclusion by affirming that Afghan women belong in scientific and technical spaces.
                  </p>
                  <p>
                    Through STEM Excellence via CBE, we are not only expanding access to education—we are helping cultivate a generation of young women equipped to contribute to innovation, problem-solving, and sustainable development. They are not simply participants in the future; they are being prepared to help shape it.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer scrollToSection={handleNavigation} />
      </div>
    </LanguageProvider>
  )
}
