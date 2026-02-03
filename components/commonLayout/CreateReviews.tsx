"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/actions/create-category";

const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z.string().min(5, "Comment is required"),
});

interface CreateReviewsProps {
  tutorId?: string;
}

export function CreateReviews({ tutorId }: CreateReviewsProps) {
  const form = useForm({
    defaultValues: {
      rating: 5,
      comment: "",
    },
    validators: {
      onSubmit: reviewSchema,
    },
    onSubmit: async ({ value }) => {
      if (!tutorId) {
        toast.error("Tutor ID not found");
        return;
      }
      try {
        const res = await createReview({
          tutorId,
          rating: value.rating,
          comment: value.comment,
        });

        if (!res?.success) {
          toast.error(res?.message || "Failed to submit review");
          return;
        }

        toast.success("Review submitted successfully");
        form.reset();
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <Card className="w-full sm:max-w-md border-none bg-none">
      <CardContent>
        <form
          id="review-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Rating */}
            <form.Field name="rating">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Rating (1–5)</FieldLabel>
                    <Input
                      id={field.name}
                      type="number"
                      min={1}
                      max={5}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Comment */}
            <form.Field name="comment">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Comment</FieldLabel>
                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Write your review..."
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form="review-form"
          className="w-full"
          disabled={!tutorId}
        >
          Submit Review
        </Button>
      </CardFooter>
    </Card>
  );
}
