"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export type BookingActionState = {
  error?: string;
};

export async function createBooking(
  _previousState: BookingActionState,
  formData: FormData,
): Promise<BookingActionState> {
  const experienceId = formData.get("experienceId");
  const customerNameValue = formData.get("customerName");
  const customerEmailValue = formData.get("customerEmail");
  const bookingDateValue = formData.get("bookingDate");
  const travelersValue = formData.get("travelers");

  if (
    typeof experienceId !== "string" ||
    typeof customerNameValue !== "string" ||
    typeof customerEmailValue !== "string" ||
    typeof bookingDateValue !== "string" ||
    typeof travelersValue !== "string"
  ) {
    return { error: "Please complete all booking fields." };
  }

  const customerName = customerNameValue.trim();
  const customerEmail = customerEmailValue.trim();
  if (!customerName || customerName.length > 120) {
    return { error: "Enter a name between 1 and 120 characters." };
  }
  if (
    customerEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
  ) {
    return { error: "Enter a valid email address." };
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(bookingDateValue)) {
    return { error: "Choose a valid booking date." };
  }
  const bookingDate = new Date(`${bookingDateValue}T00:00:00.000Z`);
  if (
    Number.isNaN(bookingDate.getTime()) ||
    bookingDate.toISOString().slice(0, 10) !== bookingDateValue
  ) {
    return { error: "Choose a valid booking date." };
  }
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (bookingDate < today) {
    return { error: "The booking date must be today or later." };
  }

  if (!/^[1-9]\d*$/.test(travelersValue)) {
    return { error: "Choose at least 1 traveler." };
  }
  const travelers = Number(travelersValue);
  if (!Number.isSafeInteger(travelers) || travelers > 10) {
    return { error: "Bookings can include at most 10 travelers." };
  }

  let experience;
  try {
    experience = await prisma.experience.findFirst({
      where: { id: experienceId, published: true },
      select: { id: true, price: true },
    });
  } catch {
    return { error: "We couldn't check this experience. Please try again." };
  }

  if (!experience) {
    return { error: "This experience is unavailable. Please choose another." };
  }

  let booking;
  try {
    booking = await prisma.booking.create({
      data: {
        experienceId: experience.id,
        customerName,
        customerEmail,
        bookingDate,
        travelers,
        totalAmount: experience.price.mul(travelers),
        status: "PENDING",
      },
      select: { id: true },
    });
  } catch {
    return { error: "We couldn't create your booking. Please try again." };
  }

  redirect(`/checkout?bookingId=${encodeURIComponent(booking.id)}`);
}
