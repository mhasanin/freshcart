import z from "zod";
export const shippingAddressSchema = z.object({
  details: z
    .string()
    .nonempty("Address Details is required")
    .min(3, "Address Details must be at least 3 characters long")
    .max(100, "Address Details must be at most 100 characters long"),
  phone: z
    .string()
    .nonempty("Phone is required")
    .regex(
      /^(?:\+20|0020|0)?1[0125][0-9]{8}$/,
      "Invalid Egyptian phone number",
    ),
  city: z
    .string()
    .nonempty("City is required")
    .min(3, "City must be at least 3 characters long")
    .max(50, "City must be at most 50 characters long"),
});

export type shippingAddressType = z.infer<typeof shippingAddressSchema>;
