// app/tutor/[id]/page.tsx
import { CreateReviews } from "@/components/commonLayout/CreateReviews";
import { BookingModal } from "@/components/commonLayout/modal/BookingModal";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { tutorService } from "@/services/tutor.services";
import Image from "next/image";
import React from "react";
export const dynamic = "force-dynamic";

interface User {
  name: string;
  email: string;
  image?: string | null;
}

interface Category {
  id: string;
  name: string;
}

interface Review {
  id: string;
  rating: number;
  comment?: string;
}

interface Tutor {
  id: string;
  bio: string;
  hourlyRate: number;
  experience: number;
  available: boolean;
  isVerified: boolean;
  user: User;
  categories: Category[];
  reviews: Review[];
}

interface TutorDetailsPageProps {
  params: {
    id: string;
  };
}

// export async function generateStaticParams() {
//   const { data } = await tutorService.getBlogPosts();

//   return data?.data?.map((blog: Tutor) => ({ id: blog.id })).splice(0, 3);
// }

export default async function TutorDetailsPage({
  params,
}: TutorDetailsPageProps) {
  const { id } = await params;

  const { data: tutor, error } = await tutorService.getBlogById(id);

  if (error) {
    return (
      <div className="text-red-600">Failed to load tutor: {error.message}</div>
    );
  }

  if (!tutor) {
    return <div className="text-gray-600">Tutor not found</div>;
  }

  const reviews = tutor?.data?.reviews ?? [];
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-3xl font-bold">{tutor?.data?.user?.name}</h1>
        <p className="text-muted-foreground my-2">{tutor?.data?.bio}</p>
        <div className="flex gap-4 my-4">
          <div>
            <strong>Hourly Rate:</strong> ${tutor?.data?.hourlyRate}/hr
          </div>
          <div>
            <strong>Experience:</strong> {tutor?.data?.experience} years
          </div>
          <div>
            <strong>Availability:</strong>{" "}
            {tutor?.data?.available ? "Available" : "Unavailable"}
          </div>
        </div>

        <div className="my-4">
          <strong>Categories:</strong>{" "}
          {tutor?.data?.categories.map((cat: Category) => (
            <span key={cat.id} className="mr-2 px-2 py-1 ">
              {cat.name}
            </span>
          ))}
        </div>

        <BookingModal tutorId={tutor?.data?.id} />

        <div className="my-4">
          <strong>Reviews:</strong>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review: Review) => (
                <li key={review.id}>
                  Rating: {review.rating} / 5{" "}
                  {review.comment && `- ${review.comment}`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet</p>
          )}
        </div>

        <CreateReviews tutorId={tutor?.data?.id} />
      </div>
      <div>
        {" "}
        <div className="w-full flex-1">
          <AspectRatio ratio={1 / 1}>
            <Image
              src="/images/Hero.avif"
              alt="Hero section visual"
              fill
              priority
              className="h-full w-full rounded-xl object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}
