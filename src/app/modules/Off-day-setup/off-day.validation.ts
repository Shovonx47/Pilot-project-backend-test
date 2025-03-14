import { z } from 'zod';
import { Days } from './off-day.const';

const offDaySchema = z.object({
  title: z
    .string({ required_error: 'Name of the off day or occasion is required' })
    .min(1, { message: 'Name of the off day or occasion cannot be empty' }),
  startDate: z
    .string({ required_error: 'Start Date is required' })
    .regex(/^\d{2}-\d{2}-\d{4}$/, {
      message: 'Start Date must be in DD-MM-YYYY format',
    }),
  endDate: z
    .string()
    .optional()
    .refine(
      (value) =>
        value === undefined ||
        value === '' ||
        /^\d{2}-\d{2}-\d{4}$/.test(value),
      {
        message: 'End Date must be in DD-MM-YYYY format',
      },
    )
    .optional(),
  startDay: z.enum([...Days] as [string, ...string[]], {
    required_error: 'Start day is required',
    invalid_type_error: 'Invalid start day',
  }),
  endDay: z
    .union([
      z.enum([...Days] as [string, ...string[]]), // Enum validation if endDate exists
      z.string(), // Allow any string if endDate is empty
    ])
    .superRefine((value, ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const endDate = (ctx as any).parent?.endDate; // Get endDate from the parent object
      if (endDate && endDate !== '' && !Days.includes(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Invalid end day. Must be a valid day of the week if endDate is set.',
        });
      }
    })
    .optional(),
  description: z
    .string({ required_error: 'Reason for the off day is required' })
    .min(1, { message: 'Description cannot be empty' }),
});

const offDaySetupValidationSchema = z.object({
  body: z.object({
    offDays: z
      .array(offDaySchema)
      .min(1, { message: 'At least one off day is required' }),
    createdBy: z
      .string({ required_error: 'Created by is required' })
      .min(1, { message: 'Created by field cannot be empty' }),
  }),
});

const updateOffDaySetupValidationSchema = z.object({
  body: z.object({
    offDays: z
      .array(offDaySchema.partial()) // Partial allows updating only specific fields
      .min(1, { message: 'At least one off day is required' })
      .optional(),
    createdBy: z
      .string({ required_error: 'Created by is required' })
      .min(1, { message: 'Created by field cannot be empty' })
      .optional(),
  }),
});

export const offDaySetupValidation = {
  offDaySetupValidationSchema,
  updateOffDaySetupValidationSchema,
};
