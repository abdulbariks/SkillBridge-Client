"use client";

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

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with shadcn/ui: A Complete Guide",
    description:
      "Learn how to set up and maximize your development workflow with shadcn/ui's powerful component library.",
    date: "Mar 15, 2024",
    category: "Tutorial",
    image: "https://ui.shadcn.com/placeholder.svg",
  },
  {
    id: 2,
    title: "Building Dark Mode with Next.js and Tailwind CSS",
    description:
      "Implement a seamless dark mode toggle in your Next.js application using Tailwind CSS and shadcn/ui.",
    date: "Mar 12, 2024",
    category: "Development",
    image: "https://ui.shadcn.com/placeholder.svg",
  },
  {
    id: 3,
    title: "Mastering React Server Components",
    description:
      "Deep dive into React Server Components and learn how they can improve your application's performance.",
    date: "Mar 8, 2024",
    category: "Advanced",
    image: "https://ui.shadcn.com/placeholder.svg",
  },
  {
    id: 4,
    title: "The Future of Web Development in 2024",
    description:
      "Explore the latest trends and technologies shaping the future of web development this year.",
    date: "Mar 5, 2024",
    category: "Insights",
    image: "https://ui.shadcn.com/placeholder.svg",
  },
];

export function TutorsSection() {
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
        <div className="flex flex-col items-center gap-10 md:gap-12">
          {/* Blog Grid */}
          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-4"
            role="list"
          >
            {BLOG_POSTS.map((post) => (
              <Link href="#" key={post.id} className="group block">
                {/* Blog Card */}
                <div className="flex flex-col gap-4 rounded-xl transition-all duration-200">
                  {/* Image Wrapper */}
                  <AspectRatio
                    ratio={4 / 3}
                    className="overflow-hidden rounded-xl"
                  >
                    <Image
                      src={post.image}
                      alt={`${post.title} thumbnail`}
                      fill
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </AspectRatio>

                  {/* Post Content */}
                  <div className="flex flex-col gap-3">
                    {/* Post Meta */}
                    <div className="flex items-center gap-2 text-left">
                      <span className="text-muted-foreground text-sm">
                        {post.date}
                      </span>
                      <span className="text-muted-foreground text-sm">·</span>
                      <span className="text-muted-foreground text-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-base leading-normal font-semibold group-hover:underline">
                      {post.title}
                    </h3>

                    {/* Post Summary */}
                    <p className="text-muted-foreground text-sm leading-normal">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
