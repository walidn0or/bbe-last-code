"use client";

import { OurWork } from "./our-work";

interface HomeIntroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export function HomeIntroSection({ scrollToSection: _scrollToSection }: HomeIntroSectionProps) {
  return (
    <section id="home-intro" className="py-8 md:py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <OurWork />
    </section>
  );
}
