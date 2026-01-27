import { Faqs } from "@/components/faqs";
import { ContactSection } from "@/components/pro-blocks/contact-sections/contact-section-1";
import React from "react";

export default function ContactPage() {
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Faqs />
      <ContactSection />
    </div>
  );
}
