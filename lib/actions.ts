"use server";

import { revalidatePath } from "next/cache";

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContact(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const errors: Record<string, string[]> = {};

  if (!name || name.length < 2) {
    errors.name = ["Name must be at least 2 characters"];
  }
  if (!email || !email.includes("@")) {
    errors.email = ["Valid email is required"];
  }
  if (!message || message.length < 10) {
    errors.message = ["Message must be at least 10 characters"];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Validation failed", errors };
  }

  revalidatePath("/contact");
  return { success: true, message: "Message sent successfully!" };
}
