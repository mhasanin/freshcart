import { z } from "zod";

// 1. Profile Info Schema
export const profileSchema = z.object({
  name: z.string().nonempty("Full name is required"),
  email: z
    .string()
    .nonempty("Email address is required")
    .email("Invalid email address"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^01[0125]\d{8}$/, "Invalid Egyptian phone number"),
});

export type ProfileFormDataType = z.infer<typeof profileSchema>;

// 2. Change Password Schema
export const passwordSchema = z
  .object({
    currentPassword: z.string().nonempty("Current password is required"),
    password: z
      .string()
      .nonempty("New password is required")
      .min(6, "Password must be at least 6 characters"),
    rePassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "New passwords do not match",
    path: ["rePassword"],
  });

export type PasswordFormDataType = z.infer<typeof passwordSchema>;