import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(25, "Name must be less than 25 characters long"),
    email: z
      .string()
      .nonempty("Email is required")
      .pipe(z.email("Invalid email address")),

    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    rePassword: z.string().nonempty("Please confirm your password"),
    phone: z
      .string()
      .nonempty("Phone number is required")
      .regex(
        /^(\+2)?01[0125][0-9]{8}$/,
        "only Egyptian phone numbers are allowed",
      ),
    terms: z.boolean().refine((value) => value === true, {
      message: "you must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type SignupDataType = z.infer<typeof signupSchema>;
