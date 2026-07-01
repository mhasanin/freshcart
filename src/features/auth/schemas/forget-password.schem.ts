import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email address")),
});

export type ForgetPasswordDataType = z.infer<typeof forgetPasswordSchema>;

export const verifyResetCodeSchema = z.object({
  resetCode: z
    .string()
    .nonempty("Verification code is required")
    .min(6, "Code must be exactly 6 digits")
    .max(6, "Code must be exactly 6 digits"),
});

export type VerifyResetCodeDataType = z.infer<typeof verifyResetCodeSchema>;
export const resetPasswordSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    newPassword: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordDataType = z.infer<typeof resetPasswordSchema>;