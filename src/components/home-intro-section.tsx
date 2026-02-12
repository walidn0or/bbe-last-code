"use client";

import { useState } from "react";
import { PlayCircle, X } from "lucide-react";
import { images } from "@/config/images";
import { OurWork } from "./our-work";

interface HomeIntroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; thumbnail: string; alt: string };

export function HomeIntroSection({ scrollToSection: _scrollToSection }: HomeIntroSectionProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const mediaGallery: MediaItem[] = [
    { type: "image", src: "/images/content/1.jpeg", alt: "Education Program" },
    {
      type: "video",
      src: images.impactStories.welcome,
      thumbnail: "/images/content/Education Support.jpeg",
      alt: "Welcome Video",
    },
    { type: "image", src: "/images/content/Economic Empowerment1.jpeg", alt: "Economic Empowerment" },
    {
      type: "video",
      src: images.impactStories.orphanageSupport,
      thumbnail: "/images/content/Orphaned Children Support + Accountability_.jpg",
      alt: "Orphanage Support",
    },
    { type: "image", src: "/images/content/Community Empowerment .jpeg", alt: "Community Empowerment" },
    {
      type: "video",
      src: images.impactStories.educationProgram,
      thumbnail: "/images/content/Education Programs_.jpg",
      alt: "Education Program Video",
    },
  ];

  return (
    <section id="home-intro" className="py-8 md:py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 md:mb-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
            {mediaGallery.map((media, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => {
                  if (media.type === "video") setActiveVideo(media.src)
                }}
              >
                {media.type === "video" ? (
                  <>
                    <img src={media.thumbnail} alt={media.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 md:h-16 md:w-16 text-white opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </>
                ) : (
                  <img
                    src={media.src}
                    alt={media.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex items-center justify-between z-10">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Video</h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>

            <div className="p-4 md:p-6">
              <div className="relative rounded-lg overflow-hidden shadow-xl bg-black" style={{ maxHeight: "600px" }}>
                <video
                  src={activeVideo}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full h-auto rounded-lg"
                  style={{
                    width: "100%",
                    maxHeight: "500px",
                    objectFit: "contain",
                    display: "block",
                    backgroundColor: "#000",
                  }}
                >
                  <source src={activeVideo} type="video/mp4" />
                  <source src={activeVideo} type="video/quicktime" />
                  <p className="text-white text-center p-4">Your browser does not support the video tag.</p>
                </video>
              </div>
            </div>
          </div>
        </div>
      )}

      <OurWork />
    </section>
  );
}
