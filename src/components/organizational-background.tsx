import Image from "next/image"
import Link from "next/link"

export default function OrganizationalBackground() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center mb-6 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors focus:outline-none"
      >
        &#8592; Back to Home
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Organizational Background</h1>
      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-gray-50">
        <Image src="/placeholder.png" alt="Background image" fill className="object-cover" />
      </div>
      <div className="prose max-w-none text-gray-800">
        {`
Beyond Borders Empowerment (BBE) is a nonprofit organization founded in early 2023 by a dedicated team of professionals, including educators, university professors, writers, medical doctors, journalists, human rights defenders, and legal experts. BBE is built on the philosophy and principles of human rights, social justice, respect for human dignity, and collective efforts to foster growth and empowerment.

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
`
          .split("\n").map((p, i) => (
            <p key={i} className="leading-relaxed">{p}</p>
          ))}
      </div>
    </div>
  )
}
