"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input"; // use Textarea for bio
import { createTutorProfileAction } from "@/actions/create-category";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Validation schema using zod
const registerSchema = z.object({
  bio: z.string().min(10, "Bio should be at least 10 characters"),
  hourlyRate: z.number().min(1, "Hourly Rate must be greater than 0"),
  experience: z.string().min(1, "Experience is required"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
});

export function CreateTutorProfile({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  const form = useForm({
    defaultValues: {
      bio: "",
      hourlyRate: 0,
      experience: "",
      categories: categories.map((cat) => cat.id),
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("====================================");
      console.log(value);
      console.log("====================================");
      try {
        const data = await createTutorProfileAction({
          bio: value.bio,
          hourlyRate: value.hourlyRate,
          experience: value.experience,
          categories: value.categories.map((id: string) => ({ id })),
        }); // send all form data

        console.log("====================================");
        console.log(data);
        console.log("====================================");
        if (data.success === false) {
          console.error("Backend error:", data);
          toast.error(data?.message || "Validation failed");
          return;
        }
        toast.success("Tutor profile created successfully");
        form.reset();
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Bio */}
            <form.Field name="bio">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Short biography about the tutor"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Hourly Rate */}
            <form.Field name="hourlyRate">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Hourly Rate ($)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      placeholder="Hourly Rate"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Experience */}
            <form.Field name="experience">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Experience</FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Years of experience or description"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="categories">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field orientation="responsive" data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="form-tanstack-select-category">
                        Category
                      </FieldLabel>
                      <FieldDescription>
                        Select the category you teach.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>

                    <Select
                      value={field.state.value[0] ?? ""}
                      onValueChange={(val) => field.handleChange([val])}
                    >
                      <SelectTrigger
                        id="form-tanstack-select-category"
                        aria-invalid={isInvalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>

                      <SelectContent position="item-aligned">
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button type="submit" form="register-form">
          Create Tutor Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
