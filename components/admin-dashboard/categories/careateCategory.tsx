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
import { createCategory } from "@/actions/create-category";

// Validation schema using zod
const registerSchema = z.object({
  name: z.string(),
});

export function CreateCategory() {
  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const data = await createCategory({ name: value.name });
        if (!data) {
          console.error("Backend error:", data);
          toast.error(data?.message || "Validation failed");
          return;
        }
        toast.success("Category created successfully");
        form.reset();
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Category */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Category"
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

      <CardFooter className="flex flex-col gap-2">
        <Button type="submit" form="register-form">
          Add Category
        </Button>
      </CardFooter>
    </Card>
  );
}
