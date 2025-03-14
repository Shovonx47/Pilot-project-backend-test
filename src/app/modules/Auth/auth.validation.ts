import { z } from 'zod';

const isEmailValid = (auth: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(auth);
};

const userAuthValidationSchemaForCreateUser = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    }),
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .refine((auth) => isEmailValid(auth), {
        message: 'Email must be valid.',
      }),
    password: z
      .string()
      .optional()
      .refine((pwd) => !pwd || pwd.length >= 8, {
        message: 'Password must be at least 8 characters long',
      }),
  }),
});
const userAuthValidationSchemaForLogin = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .refine((auth) => isEmailValid(auth), {
        message: 'Email must be valid.',
      }),

    password: z.string().min(8, 'Password must be at least 8 characters long'),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});
export const AuthValidation = {
  userAuthValidationSchemaForCreateUser,
  userAuthValidationSchemaForLogin,
  refreshTokenValidationSchema,
};
