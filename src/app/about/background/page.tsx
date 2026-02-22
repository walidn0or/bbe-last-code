"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { InlineImageUpload } from "@/components/inline-image-upload"
import { useRouter } from "next/navigation"
import { TeamSection } from "@/components/team-section"
import Link from "next/link"

interface BackgroundContent {
  title: string
  body: string
  imageUrl: string
}

const STORAGE_KEY = "about_background_content"

export default function BackgroundPage() {
  const router = useRouter()
  const [content, setContent] = useState<BackgroundContent>({
    title: "Our Team",
    body: `Beyond Borders Empowerment (BBE) is a nonprofit organization founded in early 2023 by a dedicated team of professionals, including educators, university professors, writers, medical doctors, journalists, human rights defenders, and legal experts. BBE is built on the philosophy and principles of human rights, social justice, respect for human dignity, and collective efforts to foster growth and empowerment.

At BBE, we work tirelessly towards sustainable outcomes, and we believe in the principle that “we teach our communities to fish, instead of giving them a fish.” We are confident that such self-sufficiency and sustainability can only be achieved by ensuring equal rights and opportunities for all, enabling everyone to reach their maximum potential and make a difference — including women and girls, who make up half of the population. That said, we prioritize not only meeting immediate needs but also fostering long-term sustainable development by equipping marginalized communities with the resources necessary for self-reliance.

Since our founding, we have stood firmly committed to empowering marginalized communities by providing access to quality education, fostering economic independence through entrepreneurship and employment, and supporting access to essential healthcare, as well as providing humanitarian aid during crises. Through sustainable, community-led initiatives, we strive to close social gaps and equip individuals to become agents of lasting change.

Vision Statement: We envision a future where geographical and social barriers no longer dictate an individual's potential. We strive for a world where every girl and woman has the opportunity to achieve her dreams and contribute to a more equitable society.

Mission Statement: To provide innovative pathways to education, health, and economic stability for vulnerable populations. Our mission is to bridge the gaps in access and opportunity, empowering individuals to become agents of change and champions of human rights within their own communities.

Our Story
The enthusiasm to help other women and girls build their own lives and make their own decisions was born from my own struggles as an Afghan woman. I faced a reality where not only were opportunities to learn and grow scarce, but social limitations added another layer of struggle. When, in the 21st century Afghan girls were told to stay home and not attend school because of their gender; something no one chooses.

Nevertheless, through determination, last nights of study, and relentless effort, I fought for my most basic rights. That not only allowed me to shape my own life but also became a source of spirit, courage, and hope for many others. It ignited a firm commitment to uplift my community, to create opportunities for growth, and to enable others to choose their own paths—transforming from a child held back by barriers into someone who could lead, inspire, and create real, lasting change in their communities, their country, and beyond.

The creation of Beyond Borders Empowerment (BBE) came from this deeply personal journey. I learned that even in the most difficult circumstances, change is possible. If I could do it, so can others—all they need is the inner commitment, the willingness, and access to the right tools and opportunities. Afghan women and girls have immense potential; contrary to the beliefs held in many parts of our country, they can achieve just as much as men, and in some cases, even more.

They only need to be given their wings. Once they are, watching them fly and grow is not just inspiring—it is proof of what is possible when equality and opportunity are made real. 
-Hashimi

Our Core Values:
Inclusiveness: We are committed to fostering inclusiveness, ensuring that marginalized groups particularly women and girls, who are at the heart of our programs are recognized, valued, respected, treated fairly, and supported in building a better future for themselves.
Sustainability: Our initiatives are designed to create long-term, sustainable impacts in the communities we serve by promoting independence, social justice, economic stability, and cultural diversity.
Accountability: We operate with the highest standards of transparency and integrity, ensuring responsible use of resources and maintaining the trust of our stakeholders.
Community Empowerment: We believe in the power of communities to drive their own progress by building local capacity, fostering economic growth, improving wellbeing, and encouraging community ownership.
Respect for Dignity: We treat every individual and culture with the utmost respect, honoring their unique traditions and values, and ensuring equal treatment, individual rights, and dignity.
`,
    imageUrl: "/placeholder.png",
  })
  const [isAdmin, setIsAdmin] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(new URLSearchParams(window.location.search).get("admin") === "1")
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as BackgroundContent
          setContent((c) => ({
            ...c,
            ...parsed,
            title: parsed.title === "Organizational Background" ? "Our Team" : parsed.title,
          }))
        } catch {}
      }
    }
  }, [])

  function save() {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10 md:py-16">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            ← Back
          </Button>
        </div>

        {/* Display */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.title}</h1>
          {content.imageUrl && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-gray-50">
              <Image src={content.imageUrl} alt="Background image" fill className="object-cover" />
            </div>
          )}
          <div className="prose max-w-none text-gray-800">
            {content.body ? (
              content.body.split("\n").map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No details added yet.</p>
            )}
          </div>
        </div>

        {/* Team Section with popup bios */}
        <TeamSection />

        {/* Call-to-Action Fill Section */}
        <div className="max-w-4xl mx-auto my-8 p-6 rounded-xl bg-red-50 flex flex-col items-center shadow">
          <h2 className="text-2xl font-semibold mb-2 text-red-700">Get Involved with BBE</h2>
          <p className="mb-4 text-center text-gray-700">
            Join us in empowering communities and breaking barriers. Your support can make a real difference!
          </p>
          <Button
            asChild
            className="h-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-lg"
          >
            <Link href="/#contact">Contact Us</Link>
          </Button>
        </div>

        {/* Editor (admin only) */}
        {isAdmin && (
          <div className="max-w-4xl mx-auto mt-10 border rounded-lg p-4 md:p-6 bg-gray-50">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Edit Background Content</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-red-500"
              placeholder="Title"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
            <textarea
              value={content.body}
              onChange={(e) => setContent({ ...content, body: e.target.value })}
              rows={10}
              className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-red-500"
              placeholder="Write detailed background here..."
            />

            <div className="mb-4">
              <InlineImageUpload
                label="Upload/Change cover image"
                storageKey="about_background_image"
                onUploaded={(url) => setContent({ ...content, imageUrl: url })}
              />
            </div>

            <Button onClick={save} className="bg-red-600 hover:bg-red-700 text-white">
              {saved ? "Saved" : "Save"}
            </Button>
          </div>
        )}
      </div>
      {/* Local animations for this page */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
