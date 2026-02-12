"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import { images, getImage } from "@/config/images"

interface TeamMember {
  key: string
  name: string
  role: string
  bio: string
  imageUrl: string
}

const teamMembers: TeamMember[] = [
  {
    key: "sosan-hashimi",
    name: "Sosan Hashimi",
    role: "Founder and Director",
    bio: "Sosan Hashimi is a distinguished scholar of University College London (24/25), visionary leader, and human rights advocate, renowned for her unwavering commitment to advancing women's education and empowerment in Afghanistan. Ms. Hashimi has played a transformative role in shaping public benefit programs across the country, collaborating with international institutions including USAID, the World Bank, and the European Union Delegation to Afghanistan. Her work bridges policy, research, and grassroots activism, creating tangible opportunities for marginalized communities, particularly young women and girls in the most inaccessible regions. As a writer, researcher, and human rights defender, she amplifies the voices of the unheard, tirelessly advocating for social justice, gender equality, and inclusive development. Known for her strategic vision, intellectual rigor, and fearless advocacy, Ms. Hashimi continues to inspire global audiences while driving meaningful change on the ground, establishing herself as a leading figure in Afghanistan's movement for education, empowerment, and human dignity",
    imageUrl: images.about.team.sosan,
  },
  {
    key: "imran-fazal",
    name: "Imran Fazal",
    role: "Gold Medalist|Scientist Author & Social Reformer Trustee",
    bio: "Born in Kunar, Afghanistan, Imran Fazal is a gold medalist and accomplished information scientist with a deep commitment to education, innovation, and social impact. He holds a BSc in Computer Science from Khurasan University and an MA in International Development Policy from India, combining technical expertise with a strong foundation in development and public policy. Imran has spearheaded initiatives in public sector reform, digital transformation, and community development, and is the founder of IKF Enterprise, a platform dedicated to advancing knowledge and innovation. As an author and translator of over 87 Pashto books, he is passionate about making education and knowledge accessible to underserved communities. Through mentorship, social activism, and community projects across Afghanistan, the UK, and beyond, Imran continues to inspire youth and empower the next generation of leaders. His work embodies the intersection of technology, education, and social reform, making him a driving force for sustainable change and knowledge empowerment.",
    imageUrl: images.about.team.imran,
  },
  {
    key: "emma-nylander",
    name: "Emma Nylander",
    role: "Trustee and Strategy Analyst",
    bio: "Emma Nylander is migration and human rights specialist with a strong focus on legal and policy impact. She holds an MSc in Global Migration from University College London, where her academic research examined migration governance and the lived experiences of displaced people, reflecting her deep commitment to understanding the intersection of policy, protection, and human dignity. In addition to her academic work, Emma has substantial practical experience supporting displaced and marginalised communities. While studying, she volunteered with the British Red Cross, providing direct support to young refugees and asylum seekers in the UK. She also led projects at Vocal Communities addressing the challenges faced by migrant women, promoting inclusive social change and community cohesion. Currently, Emma works at Centuro Global, where she supports initiatives designed to make global mobility more transparent and people centred. In this role, she contributes to efforts that expand equitable access to opportunities and strengthen the rights of mobile communities worldwide. Committed to the belief that borders should not determine human value, Emma champions inclusive policies and practices that empower women, girls, and marginalised populations.",
    imageUrl: images.about.team.emma,
  },
  {
    key: "farangis-fariwar",
    name: "Farangis Fariwar",
    role: "Trustee - Activist and Educator",
    bio: "Farangis Fariwar is a seasoned social activist, educator, and humanitarian with over two decades of experience supporting marginalized communities across Afghanistan, Pakistan, Greece, and the UK. Born in Afghanistan, she was forced to leave her home at the age of 18, resettling in Pakistan, where she began her lifelong commitment to refugee support and community empowerment. Ms. Fariwar holds a BSc in Social Sciences from the UK Open University and has worked with leading humanitarian organizations, including Afghanaid, IOM, and IRC, delivering critical services to displaced populations. In the UK, she has made a significant impact as an ESOL tutor, guiding adult learners toward literacy, confidence, and social integration, and as a qualified Accounts Technician (AAT), applying her expertise in financial management to organizational and community projects. Her recent work as a social activist bridges international borders, focusing on programs that empower women, youth, and refugees through education, skills development, and community engagement. Known for her unwavering dedication, strategic vision, and compassionate leadership, Farangis continues to create transformative opportunities for communities facing displacement, inequality, and social marginalization.",
    imageUrl: images.about.team.farangis,
  },
  {
    key: "kaihan-alambye",
    name: "Kaihan Alambye",
    role: "Trustee, Researcher and Scholar",
    bio: "Kaihan Alambye is a researcher and scholar dedicated to understanding the intersections of violence, trauma, and political structures, with a focus on improving educational and social opportunities for marginalized communities. His academic journey began with a degree in Philosophy, Politics, and Economics from Essex University, providing a strong foundation to analyze how political and social systems shape human behavior. He further specialized through a Master's in the Anthropology of Politics, Violence, and Crime at University College London, where his dissertation examined the transmission of trauma and its impact on individuals and communities, particularly those affected by displacement and conflict. Building on this work, Kaihan is now pursuing a PhD at UCL, focusing on how trauma and violence are perpetuated across generations and how these dynamics affect marginalized populations, including refugees, asylum seekers, and underserved communities. Kaihan's research is driven by a commitment to translate scholarship into action, shaping programs and policies that expand educational access, resilience, and empowerment for communities most affected by conflict, migration, and systemic inequality. By combining rigorous research with practical impact, he seeks to inform interventions that foster opportunity, social inclusion, and long-term positive change for vulnerable populations.",
    imageUrl: images.about.team.kaihan,
  },
  {
    key: "sadaf-ghawsi",
    name: "Sadaf Ghawsi",
    role: "Programs & Technical Lead",
    bio: "Sadaf Ghawsi is a passionate advocate for women's empowerment, holding a Bachelor's degree in Public Health from Kabul Medical University and currently pursuing a degree in Business Administration at the University of the People (U.S.). She has extensive experience working across multiple sectors, with a strong focus on advancing the rights and opportunities of Afghan women and girls. Sadaf's professional background includes serving as Operations Manager at the Afghanistan Women Chamber of Commerce and Industry (AWCCI), where she organized workshops, educational programs, exhibitions, and business development initiatives to strengthen women's participation in economic, educational, and social spheres. She has also contributed to the health sector as a Technical Officer, promoting gender equality, safeguarding, and women's empowerment in health services. Currently, she serves as Program Manager at Beyond Borders Empowerment (BBE), a UK-based organization dedicated to supporting Afghan girls and youth through education and empowerment initiatives. Her leadership and advocacy have earned her multiple awards and invitations to represent Afghan women at national and international conferences. Sadaf's work reflects her unwavering commitment to building inclusive opportunities where Afghan women and girls can thrive, lead, and make meaningful contributions to society.",
    imageUrl: images.about.team.sadaf,
  },
  {
    key: "waheed-niawash",
    name: "Waheed Niawash",
    role: "Project Coordinator Entrepreneur | Senior Executive | FinTech Specialist | Innovative Business Developer",
    bio: "Waheed Niawash is an experienced professional in the fields of financial technology (FinTech), creative industries, and social entrepreneurship in Afghanistan. He holds a Bachelor's degree in Management and Business Administration from Kabul University and a Diploma in Accounting from the Kabul Institute of Administration and Accounting. He has also completed several international certifications in research, information technology, and digital payment systems.",
    imageUrl: images.about.team.waheed,
  },
  {
    key: "khatira-fikrat",
    name: "Khatira Fikrat",
    role: "Business and Finance Enthusiast | Administrative Manager | Educator",
    bio: "Khatira Fikrat is a business and finance enthusiast at the American University of Afghanistan with a diploma in English from the Muslim English Language Institute. She has experience in human resources, administration, and education, currently serving as HR & Administrative Manager at Beyond Borders Empowerment and Executive Assistant at TEDx Share-e-Naw. She has also worked as Admin Assistant at Green Way Organization, Admin & Finance Officer at Generation Positive, and English Instructor at Beyond Borders Empowerment. Fluent in Dari, proficient in English, and with working knowledge of Pashto, Khatira is passionate about empowering communities, supporting education, and contributing to organizational success.",
    imageUrl: images.about.team.khatira,
  },
  {
    key: "geety-haidary",
    name: "Geety Haidary",
    role: "Researcher",
    bio: "Geety Haidary holds a Bachelor's degree in Law and Political Science from Kabul University and is currently pursuing a second Bachelor's degree in Business Administration with a concentration in Finance at the American University of Afghanistan. As a student in two fields, Geety Haidary, has gained valuable work experience across various sectors. She have been volunteering for the Afghanistan Law and Political Science Association (ALPA), for the past year, initially serving as the Faculty relations intern, where she build a communication between the faculty and management, and currently working as the curriculum coordinator for the ALPA Academy. Recently, Geety Haidary also started working as a Volunteer Researcher in the potential donors section at BBE (Beyond Borders Empowerment). Additionally, She served as a volunteer collaborator in a mentorship program for female Afghan law graduates, working for a year as a mentor-mentee liaison in a program organized by USIP. She also have practical experience in a law office and have worked in business roles across various logistics companies.",
    imageUrl: images.about.team.geety,
  },
  {
    key: "hasina-zmarai",
    name: "Hasina Zmarai",
    role: "Researcher",
    bio: "Hasena Zmari is a dedicated and professional researcher with expertise in conducting studies and data analysis. She possesses strong skills in academic research, information gathering and evaluation, and preparing accurate, well-structured reports. Committed to precision, punctuality, and high-quality work, Hasena consistently delivers reliable and insightful results.",
    imageUrl: images.about.team.hasina,
  },
  {
    key: "mozhgan-raoufi",
    name: "Mozhgan Raoufi",
    role: "Graphic Designer",
    bio: "Mozhgan Raoufi is a focused and organized professional with experience in program support, teaching, administration, and graphic design. She is currently working as a Graphic Designer at Beyond Borders Empowerment (BBE). Mozhgan has worked as a Program Assistant at CRDSA in Herat, facilitating communication, organizing project files, monitoring reports, and supporting social media content creation. She began her career as a Program Intern at CRDSA, gaining experience in proposal review, CV screening, and office administration.",
    imageUrl: images.about.team.member1,
  },
  {
    key: "bahar-sadat-rahimi",
    name: "Bahar Sadat Rahimi",
    role: "HR Manager",
    bio: "Bahar Sadat Rahimi is an experienced HR professional with a Master's in Business Administration from Kardan University and a Bachelor's in Mathematics from Kabul University. She currently works as the Human Resources manager, specializing in training, development, and safeguarding, and has extensive experience in HR processes, recruitment, onboarding, performance management, and staff capacity building. Bahar has also worked with the Appointment Board of Independent Administrative Reform and Civil Service Commission, managing recruitment strategies, data analysis, and reporting. Earlier, she gained experience in finance and administration with Afghanistan Relief Organization.",
    imageUrl: images.about.team.member1,
  },
  {
    key: "hamasa-noorzai",
    name: "Hamasa Noorzai",
    role: "Educator",
    bio: "Banking and compliance professional with experience in AML/CFT monitoring, teaching, and content writing. Currently an MIU Analyst at Afghanistan International Bank and a volunteer English teacher at BBE, with strong skills in problem-solving, leadership, and communication. Fluent in Dari, Pashto, and English.",
    imageUrl: images.about.team.hamasa,
  },
  {
    key: "zarghona-ahmadi",
    name: "Zarghona Ahmadi",
    role: "IELTS Educator",
    bio: "Zarghona Ahmadi is a final-year Law (LLB) student at the University of Sussex, consistently achieving first-class results. She works as a Paralegal at Clarendon Park Chambers and has gained legal experience in immigration, family, and public law through pro-bono clinics and volunteer roles with Sussex Prisoners' Families and the Daisychain Project. Awarded the Avicenna Foundation Scholarship, Zarghona has combined academic excellence with community projects, fundraising, and leadership in student societies. Fluent in Pashto and active in creative arts, she balances legal practice with a commitment to social impact and community empowerment.",
    imageUrl: images.about.team.zarghona,
  },
  {
    key: "malika-hail",
    name: "Malika Hail",
    role: "Educator",
    bio: "Malika Hail, born in Kabul in 2004, is a dedicated educator, artist, and student. After completing her high school in Kabul, she continued her studies in Pakistan, earning a Diploma in English and a Certificate in Digital Marketing, along with training in business, mental health, and team building. She has taught English and computer skills to school-aged children and currently teaches Afghan girls with Beyond Borders Organization while pursuing higher education at the American University. Fluent in English, Dari, Pashto, and Urdu, and skilled in digital tools, she strives to use her education and creativity to empower young Afghan girls and support their brighter future.",
    imageUrl: images.about.team.malika,
  },
  {
    key: "adeeba-bareen",
    name: "Adeeba Bareen",
    role: "Educator | Student | Community Volunteer",
    bio: "Adeeba Bareen is a dedicated educator and student with a strong background in business, economics, and language instruction. She is pursuing a BBA at the American University of Afghanistan and a Bachelor of Economics at Women's Online University, with additional studies in Business Management, Turkish Literature, and TESOL/TTC certifications. Since 2021, she has taught English at Ahmad Shah Durrani BaBa Private Education Institute, leading lessons, clubs, debates, and cultural events. She has also worked in student support and administration at Afghan Gustar Services Company and volunteers with youth and educational organizations. Fluent in English, Turkish, Pashto, and Dari, she brings expertise in teaching, communication, and community engagement.",
    imageUrl: images.about.team.adeeba,
  },
  {
    key: "mana-hiruta",
    name: "Mana Hiruta",
    role: "Program Officer - London",
    bio: "Politics and International Relations BSc student at UCL; multiple committee roles in student organizations and volunteering works for social causes; Co-Founder and former Director of TEDxYouth Shibuya.",
    imageUrl: images.about.team.member1,
  },
]

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  return (
    <>
      <section id="our-team" className="py-12 md:py-16 lg:py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals driving change and empowerment across communities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={member.key}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative overflow-hidden">
                  <div className="relative w-full aspect-square bg-gray-100">
                    <Image
                      src={getImage(member.imageUrl)}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-4 md:p-6 text-center">
                  <h3 className="font-bold text-gray-900 mb-1 text-base md:text-lg">{member.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex items-start justify-between z-10">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-red-100 flex-shrink-0">
                  <Image
                    src={getImage(selectedMember.imageUrl)}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{selectedMember.name}</h3>
                  <p className="text-sm md:text-base text-gray-600">{selectedMember.role}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
            <div className="p-4 md:p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {selectedMember.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
