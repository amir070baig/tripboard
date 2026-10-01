"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function updateBookingStatus(formData: FormData) {
  const bookingId = formData.get("bookingId");
  const status = formData.get("status");

  if (
    typeof bookingId !== "string" ||
    !bookingId ||
    (status !== "CONFIRMED" && status !== "CANCELLED")
  ) {
    redirect("/admin?notice=invalid-action");
  }

  let updated;
  try {
    updated = await prisma.booking.updateMany({
      where: { id: bookingId, status: "PENDING" },
      data: { status },
    });
  } catch {
    redirect("/admin?notice=update-failed");
  }

  revalidatePath("/admin");
  redirect(updated.count === 1 ? "/admin?notice=booking-updated" : "/admin?notice=already-updated");
}
