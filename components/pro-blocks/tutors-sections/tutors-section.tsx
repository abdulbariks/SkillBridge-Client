// "use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { Tagline } from "@/components/pro-blocks/tagline";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tutorService } from "@/services/tutor.services";

interface Tutor {
  id: string;
  bio: string;
  hourlyRate: number;
  experience: number;
  available: boolean;
  isVerified: boolean;
  user: {
    name: string;
    email: string;
    image: string | null;
  };
  categories: {
    id: string;
    name: string;
  }[];
  reviews: {
    rating: number;
  }[];
}

export async function TutorsSection() {
  const { data } = await tutorService.getBlogPosts(
    {
      isFeatured: false,
    },
    {
      cache: "no-store",
    },
  );

  const tutors: Tutor[] = data?.data ?? [];
  return (
    <section
      className="bg-background section-padding-y"
      aria-labelledby="blog-section-heading"
    >
      <div className="container-padding-x container mx-auto gap-10 md:gap-12">
        <div className="flex items-center justify-between gap-4 my-10">
          <div>
            <h3 className="text-3xl font-semibold">Find Your Tutor</h3>
          </div>
          <div className="flex gap-5">
            <InputGroup className="max-w-xs">
              <InputGroupInput placeholder="Search users..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <Select defaultValue="">
              <SelectTrigger className="w-full max-w-42">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ict">ICT</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {tutors.map((tutor) => (
            <Link
              key={tutor.id}
              href={`/tutor/${tutor.id}`}
              className="group block"
            >
              <div className="flex flex-col gap-4 rounded-xl border p-4 hover:shadow-md transition">
                {/* Image */}
                <AspectRatio
                  ratio={4 / 3}
                  className="overflow-hidden rounded-xl"
                >
                  <Image
                    src={tutor.user.image || "/images/SkillBridge-Logo.png"}
                    alt={tutor.user.name}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </AspectRatio>

                {/* Content */}
                <div className="space-y-2">
                  <CardTitle>{tutor.user.name}</CardTitle>

                  <CardDescription className="line-clamp-2">
                    {tutor.bio}
                  </CardDescription>

                  <div className="text-sm text-muted-foreground">
                    💰 ${tutor.hourlyRate}/hr · 🎓 {tutor.experience} yrs
                  </div>

                  <div
                    className={`text-xs font-medium ${
                      tutor.available ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {tutor.available ? "Available" : "Unavailable"}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
