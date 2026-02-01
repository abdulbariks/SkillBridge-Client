// app/tutor/[id]/page.tsx
import { tutorService } from "@/services/tutor.services";
import React from "react";

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

export default async function TutorDetailsPage({
  params,
}: TutorDetailsPageProps) {
  const { id } = params;

  console.log("====================================");
  console.log(id);
  console.log("====================================");

  const { data: tutor, error } = await tutorService.getBlogById(id);

  if (error) {
    return (
      <div className="text-red-600">Failed to load tutor: {error.message}</div>
    );
  }

  if (!tutor) {
    return <div className="text-gray-600">Tutor not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{tutor.user.name}</h1>
      <p className="text-muted-foreground my-2">{tutor.bio}</p>

      <div className="flex gap-4 my-4">
        <div>
          <strong>Hourly Rate:</strong> ${tutor.hourlyRate}/hr
        </div>
        <div>
          <strong>Experience:</strong> {tutor.experience} years
        </div>
        <div>
          <strong>Availability:</strong>{" "}
          {tutor.available ? "Available" : "Unavailable"}
        </div>
      </div>

      <div className="my-4">
        <strong>Categories:</strong>{" "}
        {tutor.categories.map((cat: Category) => (
          <span key={cat.id} className="mr-2 px-2 py-1 bg-gray-200 rounded">
            {cat.name}
          </span>
        ))}
      </div>

      <div className="my-4">
        <strong>Reviews:</strong>
        {tutor.reviews.length ? (
          <ul className="list-disc list-inside">
            {tutor.reviews.map((review: Review) => (
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
    </div>
  );
}
