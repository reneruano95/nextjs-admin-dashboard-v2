import { z } from "zod";

export const billFromSchema = z.object({
  businessName: z.string({ required_error: "Name is required." }).min(1, {
    message: "Name is required.",
  }),
  businessAddress: z.string().min(1, "Address is required."),
  businessCity: z.string().min(1, "City is required."),
  businessPostalCode: z.string().min(1, "Postal code is required."),
  businessCountry: z.string().min(1, "Country is required."),
  businessEmail: z.string().email("Invalid email address."),
  businessPhone: z.string().min(1, "Business number is required."),
  businessWebsite: z.string().url("Invalid URL.").optional(),
  businessOwner: z.string().optional(),
});

export const billToSchema = z.object({
  clientName: z.string({ required_error: "Name is required." }).min(1, {
    message: "Name is required.",
  }),
  clientEmail: z.string().email("Invalid email address."),
  clientAddress: z.string().min(1, "Address is required."),
  clientCity: z.string().min(1, "City is required."),
  clientPostalCode: z.string().min(1, "Postal code is required."),
  clientCountry: z.string().min(1, "Country is required."),
  clientPhone: z.string().min(1, "Phone number is required."),
});

export const invoiceSchema = billFromSchema.extend(billToSchema.shape);
