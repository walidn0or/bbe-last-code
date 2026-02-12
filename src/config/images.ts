// Centralized image configuration
// Update image paths here to change images across all sections
//
// WHERE TO UPLOAD FILES (all paths are under public/):
// - Hero background video   → public/images/videos/                    → hero.background
// - Home page gallery       → public/images/content/ or .../home/     → homeGallery[]
// - Success stories (Barin, Wasiya, Moheba, Ozra) images & videos
//   → public/images/home/success-stories/ or public/images/success-stories/
//   → successStories.barin / .wasiya / .moheba / .ozra  (each: image, video)
// - Hero main image         → public/images/content/                  → hero.main

export const images = {
  // Logo
  // To upload a new logo:
  // 1. Add your logo file to: public/images/
  // 2. Update the path below
  // 3. Recommended: SVG or PNG with transparent background
  // 4. Size: 200x200px or larger (square)
  logo: "/images/Beyond-Borders-Empowerment-logo-PNG.svg",

  // Hero Section
  // - Main image: put file in public/images/content/ and set path below
  // - Background video: put your file (e.g. background-video.mp4) in public/images/videos/ and set path below
  hero: {
    main: "/hero/background-video.mp4",
    background: "/hero/background-video.mp4"
  },

  // Home page gallery – the 6 tiles. Videos use their first frame as thumbnail (no separate thumbnail needed). Click a video to play.
  homeGallery: [
    { type: "video" as const, src: "/images/home/b.mp4", alt: "Education Program" },
    { type: "image" as const, src: "/images/home/g1.jpeg", alt: "Welcome Video" },
    { type: "video" as const, src: "/images/home/o2.mp4", alt: "Economic Empowerment" },
    { type: "image" as const, src: "/images/home/g3.jpeg", alt: "Orphanage Support" },
    { type: "video" as const, src: "/images/home/o1.mp4", alt: "Community Empowerment" },
    { type: "image" as const, src: "/images/home/iftar.jpeg", alt: "Education Program Video" },
  ],

  // Videos Section - All converted to MP4 for browser compatibility
  videos: {
    featured: "/images/home/g1.jpeg",
    video1: "/images/home/b.mp4",
    video2: "/images/home/o1.mp4",
    video3: "/images/home/o2.mp4",
    video4: "/images/home/feedback.mp4",
    video5: "/images/home/b.mp4" // Fallback to first video
  },

  // Impact Stories Videos - All MP4 format for maximum browser compatibility
  impactStories: {
    welcome: "/images/videos/b.mp4",
    orphanageSupport: "/images/videos/o1.mp4",
    educationProgram: "/images/videos/o2.mp4",
    communityImpact: "/images/videos/feedback.mp4",
  },

  // About Section
  about: {
    main: "/images/content/Education + Human Rights Advocacy_.jpg",
    team: {
      // Board of Trustees
      sosan: "/images/members/Sosan Hashimi.jpeg",
      farangis: "/images/members/Farangis Fariwar(Board of Trustees).jpeg", 
      imran: "/images/members/Imran Fazal(Board of Trustees).jpeg",
      kaihan: "/images/members/Kaihan Alambye(Board of Trustees).jpeg",
      emma: "/images/members/Emma.png",
      waheed: "/images/members/male.png",
      
      // Staff Members
      khatira: "/images/members/Khatira Fikrat(HR and Admin Manager).jpeg",
      sadaf: "/images/members/Sadaf Ghawsi(Program & Technical Lead + Project Management).jpeg",
      bahar: "/images/members/famle.png",
      mozhgan: "/images/members/famle.png",
      mana: "/images/members/famle.png",
      
      // Educators
      adeeba: "/images/members/Adeeba Bareen(Educator).jpeg",
      malika: "/images/members/Malika Hail (Educator).jpeg",
      hamasa: "/images/members/Hamasa Noorzai.jpeg",
      zarghona: "/images/members/famle.png",
      
      // Researchers
      hasina: "/images/members/Hasina Zmarai.jpeg",
      geety: "/images/members/famle.png",

      // Generic team slots used by admin uploads (team_member1, team_member2, team_member3)
      member1: "/images/members/famle.png",
      member2: "/images/members/famle.png",
      member3: "/images/members/male.png",
    },
    values: {
      inclusiveness: "/images/about/Inclusiveness.png",
      sustainability: "/images/about/Sustainability.png",
      accountability: "/images/about/accountability.jpeg",
      empowerment: "/images/about/Community.png",
      dignity: "/images/about/Respect.png"
    }
  },

  // Programs Section
  programs: {
    education: "/images/content/Education Support.jpeg",
    healthcare: "/images/content/healthcare/Healthcare Support(Emergency Medical Support)(1).jpeg",
    economic: "/images/content/Economic Empowerment1.jpeg",
    orphans: "/images/content/Orphaned/Orphaned Children Support.jpg",
    rights: "/images/content/Human Rights Advocacy_.jpg",
    emergency: "/images/content/healthcare/Healthcare Support(Emergency Medical Support)(1).jpeg"
  },

  programsGalleries: {
    education: [
      "/images/content/education/Education Support.jpeg",
      "/images/content/education/Education Programs.jpeg",
      "/images/content/education/Education Program .JPG"
    ],
    healthcare: [
      "/images/content/healthcare/Healthcare Support(Emergency Medical Support)(1).jpeg",
      "/images/content/healthcare/Healthcare Support(Emergency Medical Support).JPEG",
      "/images/content/healthcare/Healthcare Support(Emergency Medical Support)(2).JPEG"
    ],
    economic: [],
    orphans: [
      "/images/content/Orphaned/Orphaned Children Support.jpg",
      "/images/content/Orphaned/Orphaned Children Support(1).jpeg",
      "/images/content/Orphaned/Orphaned Children Support + Accountability_.jpg"
    ],
    rights: [],
    emergency: [
      "/images/content/healthcare/Healthcare Support(Emergency Medical Support)(1).jpeg",
      "/images/content/healthcare/Healthcare Support(Emergency Medical Support).JPEG"
    ]
  },

  // News Section
  // Using content images as placeholders until news images are uploaded
  news: {
    featured: "/images/news/Chevening.jpeg",
    article1: "/images/news/News.jpeg",
    article2: "/images/news/News & Updates (2).jpeg",
    article3: "/images/news/News & Updates.jpeg",
    article4: "/images/news/News2.jpeg",
    article5: "/images/news/News & Updates (1).jpeg",
    article6: "/images/news/News & Updates.jpeg",

    1: {
      main: "/images/news/Chevening.jpeg",
      gallery: ["/images/news/News & Updates.jpeg", "/images/news/News & Updates (1).jpeg"]
    },
    2: {
      main: "/images/news/News.jpeg",
      gallery: ["/images/news/News2.jpeg", "/images/news/News & Updates.jpeg"]
    },
    3: {
      main: "/images/news/News & Updates (2).jpeg",
      gallery: []
    },

    4: {
      main: "/images/news/News.jpeg",
      gallery: ["/images/news/News & Updates.jpeg", "/images/news/News2.jpeg"]
    }
  },

  newsArticles: {
    cheveningInfoSession: {
      main: "/images/news/Chevening.jpeg",
      gallery: []
    },
    refugeesCulturalEventLondon: {
      main: "/images/news/News.jpeg",
      gallery: ["/images/news/News2.jpeg"]
    },
    refugeesCulturalEventLondonOld: {
      main: "/images/news/News & Updates (1).jpeg",
      gallery: []
    },
    psychologicalFirstAidTraining: {
      main: "/images/news/News & Updates (2).jpeg",
      gallery: []
    }
  },

  publications: {
    annualReports: {
      financialReportsPdf: "/reports/Annual Impoact and Financial report 2025.pdf",
      narrativeReportsPdf: "/reports/narrative-reports.pdf"
    }
  },

  // Testimonials Section (Success Stories)
  testimonials: {
    person1: "/images/success stories/Fatima.png",
    person2: "/images/success stories/Mariam.png",
    person3: "/images/success stories/Ahmad.png",
    person4: "/images/success stories/person-4.jpg",
    person5: "/images/success stories/person-5.jpg",
    person6: "/images/success stories/person-6.jpg",
    video1: "/images/testimonials/video-1.mp4",
    video2: "/images/testimonials/video-2.mp4",
    video3: "/images/testimonials/video-3.mp4"
  },

  // Success Stories (Barin Jebran, Wasiya Safi, Moheba Karimi, Ozra Penhan)
  // Upload: profile images → public/images/success-stories/ or public/images/home/success-stories/
  //         videos        → public/images/success-stories/ or public/images/home/success-stories/
  // Then set paths below. Videos play in the modal when "Click to read more" is opened.
  successStories: {
    barin: { image: "/images/home/success-stories/barin.png", video: "" },
    bakhti: { image: "", video: "" },
    wasiya: { video: "/images/home/success-stories/Student-Feedback(1).mov" },
    moheba: { video: "/images/home/success-stories/Student-Feedback(2).mov" },
    ozra: { video: "/images/home/success-stories/Student-Feedback.mov" }
  },

  // Impact Section
  impact: {
    background: "/images/impact/b.mp4",
    students: "/images/impact/students.jpg",
    orphans: "/images/impact/orphans.jpg",
    healthcare: "/images/impact/healthcare.jpg",
    emergency: "/images/impact/emergency.jpg",
    women: "/images/impact/women-empowerment.jpg",
    coding: "/images/impact/coding-students.jpg"
  },

  // Gallery Section (optional; not used on home – home gallery is homeGallery above)
  gallery: {
    education: [
      "/images/gallery/home/education-1.jpg",
      "/images/gallery//home/education-2.jpg",
      "/images/gallery/home/education-3.jpg",
      "/images/gallery/home/education-4.jpg",
      "/images/gallery/home/education-5.jpg",
      "/images/gallery/education-6.jpg"
    ],
    healthcare: [
      "/images/gallery/healthcare-1.jpg",
      "/images/gallery/healthcare-2.jpg",
      "/images/gallery/healthcare-3.jpg",
      "/images/gallery/healthcare-4.jpg"
    ],
    orphanage: [
      "/images/gallery/orphanage-1.jpg",
      "/images/gallery/orphanage-2.jpg",
      "/images/gallery/orphanage-3.jpg",
      "/images/gallery/orphanage-4.jpg",
      "/images/gallery/orphanage-5.jpg"
    ],
    community: [
      "/images/gallery/community-1.jpg",
      "/images/gallery/community-2.jpg",
      "/images/gallery/community-3.jpg",
      "/images/gallery/community-4.jpg",
      "/images/gallery/community-5.jpg",
      "/images/gallery/community-6.jpg"
    ],
    events: [
      "/images/gallery/event-1.jpg",
      "/images/gallery/event-2.jpg",
      "/images/gallery/event-3.jpg",
      "/images/gallery/event-4.jpg"
    ]
  },

  // Partners & Donors Section
  partners: {
    logo1: "/images/partners/partner-1.png",
    logo2: "/images/partners/partner-2.png",
    logo3: "/images/partners/partner-3.png",
    logo4: "/images/partners/partner-4.png",
    logo5: "/images/partners/partner-5.png",
    logo6: "/images/partners/partner-6.png"
  },

  // Social Media & Blog
  social: {
    facebook: "/images/social/facebook-cover.jpg",
    twitter: "/images/social/twitter-cover.jpg",
    instagram: "/images/social/instagram-story.jpg",
    linkedin: "/images/social/linkedin-banner.jpg"
  },

  // Banners & Promotional
  banners: {
    donation: "/images/banners/donation-banner.jpg",
    volunteer: "/images/banners/volunteer-banner.jpg",
    campaign: "/images/banners/campaign-banner.jpg",
    event: "/images/banners/event-banner.jpg"
  },

  // Our Work Section (placeholders, replace with uploads)
  ourWork: {
    menstrualHygiene: "/images/home/our-work/Orphaned-Children-Support.jpeg",
    languageSkills: "/images/home/our-work/Education-Program.JPG",
    orphanSupport: "/images/home/our-work/IMG_3327.jpeg",
    scholarshipMentorship: "/images/home/our-work/scholarship.png",
    artClub: "/images/home/our-work/art.jpeg",
    healthSupport: "/images/home/our-work/health.jpeg"
  },

  // Optional galleries for Our Work (add more images per program)
  ourWorkGallery: {
    // No extra gallery images yet for menstrual hygiene
    menstrualHygiene: [],
    languageSkills: [
      // Keep only the main extra image
      "/images/home/our-work/ielts.jpeg"
    ],
    orphanSupport: [
      // Keep only the main extra image
    "/images/home/our-work/Iftar.jpeg"
    ],
    scholarshipMentorship: [
      // No gallery images configured yet
    ],
    artClub: [
      // No gallery images configured yet
    ],
    healthSupport: [
      // No gallery images configured yet
    ]
  },

  // Fallback images
  fallback: {
    placeholder: "/placeholder.png",
    placeholderSvg: "/placeholder.svg"
  }
} as const

// Helper function to get image with fallback
export const getImage = (imagePath: string | null | undefined, fallback: string = images.fallback.placeholder): string => {
  return imagePath || fallback
}
