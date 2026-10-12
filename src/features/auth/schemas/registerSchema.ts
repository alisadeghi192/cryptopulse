import { z } from 'zod'

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name is too long'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^[+]?[\d\s-()]{8,}$/, 'Please enter a valid phone number'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(72, 'Password must be less than 72 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agree: z.literal(true, {
      message: 'You must agree to the terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>