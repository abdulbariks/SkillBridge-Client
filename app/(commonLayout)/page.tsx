// import { CardDemo } from "@/components/CardDemo";

import { Faqs } from "@/components/faqs";
import { ContactSection } from "@/components/pro-blocks/contact-sections/contact-section-1";
import { HeroSection } from "@/components/pro-blocks/hero-sections/Hero";
import { TutorsSection } from "@/components/pro-blocks/tutors-sections/tutors-section";
import { Team } from "@/components/team";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <TutorsSection />
      <Team />
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Faqs />
        <ContactSection />
      </div>
    </div>
  );
}
