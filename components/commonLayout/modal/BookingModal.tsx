"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createBooking } from "@/actions/create-category";
import { useRouter } from "next/navigation";

const bookingSchema = z.object({
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

interface BookingModalProps {
  tutorId?: string;
}

export function BookingModal({ tutorId }: BookingModalProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      startTime: "",
      endTime: "",
    },
    validators: {
      onSubmit: bookingSchema,
    },
    onSubmit: async ({ value }) => {
      if (!tutorId) {
        toast.error("Tutor ID not found");
        return;
      }

      if (new Date(value.startTime) >= new Date(value.endTime)) {
        toast.error("End time must be after start time");
        return;
      }

      try {
        const res = await createBooking({
          tutorId,
          startTime: value.startTime,
          endTime: value.endTime,
        });

        if (!res?.success) {
          toast.error(res?.message || "Booking failed");
          return;
        }

        toast.success("Booking created successfully");
        form.reset();
        setOpen(false);
        router.push("/dashboard/bookings");
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!tutorId}>Book Session</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Session</DialogTitle>
        </DialogHeader>

        <form
          id="booking-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Start Time */}
            <form.Field name="startTime">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Start Time</FieldLabel>
                    <Input
                      id={field.name}
                      type="datetime-local"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* End Time */}
            <form.Field name="endTime">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>End Time</FieldLabel>
                    <Input
                      id={field.name}
                      type="datetime-local"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
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

        <DialogFooter>
          <Button type="submit" form="booking-form" className="w-full">
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
