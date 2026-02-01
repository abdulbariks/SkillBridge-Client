import { SidebarRoutes } from "@/types/sidebar";
import { GalleryVerticalEnd, Settings2 } from "lucide-react";

export const tutorRoutes: SidebarRoutes = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
    teams: [
    { name: "Skill Bridge", logo: GalleryVerticalEnd, plan: "Enterprise" },
    // { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
    // { name: "Evil Corp.", logo: Command, plan: "Free" },
  ],
  navMain: [
    {
      title: "Tutor Management",
      icon: Settings2,
      items: [
        { title: "Availability", url: "/tutor-dashboard/availability" },
        { title: "Bookings", url: "/tutor-dashboard/bookings" },
      ],
    },
  ],
  projects: [],
};