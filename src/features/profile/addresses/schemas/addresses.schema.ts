import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().nonempty("Address name is required"),
  details: z.string().nonempty("Full address details are required"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^01[0125]\d{8}$/, "Invalid Egyptian phone number"),
  city: z.string().nonempty("City is required"),
});

export type AddressFormDataType = z.infer<typeof addressSchema>;