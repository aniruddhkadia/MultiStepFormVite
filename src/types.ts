import type React from "react";
import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.email("Invalid Email Address"),
  phone: z.string().min(10, "Phone Number is required"),
});

export const ProfessionalInfoSchema = z.object({
  company: z.string().min(1, "Company Name is required"),
  position: z.string().min(1, "Position is required"),
  experience: z.enum(["0-2", "3-5", "6-10", "10+"]),
  industry: z.string().min(1, "Industry is required"),
});

export const BillingInfoSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card Number must be 16 digits")
    .max(16, "Card Number must be 16 digits"),
  cardHolderName: z.string().min(1, "Card Holder Name is required"),
  expiryDate: z.string().min(4, "Expiry Date is required"),
  cvv: z.string().min(3, "Invalid CVV").max(4, "Invalid CVV"),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type ProfessionalInfo = z.infer<typeof ProfessionalInfoSchema>;
export type BillingInfo = z.infer<typeof BillingInfoSchema>;

export type StepFormData = PersonalInfo | ProfessionalInfo | BillingInfo;
export type AllFormFields = PersonalInfo & ProfessionalInfo & BillingInfo;

export interface Step {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}
