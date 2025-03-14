import { z } from 'zod';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // HH:MM format
    return regex.test(time);
  },
  {
    message: 'Invalid time format, expected "HH:MM" in 24-hour format',
  },
);

const examSchema = z
  .object({
    courseName: z.string({ required_error: 'Course name is required' }),
    courseCode: z.string({ required_error: 'Course code is required' }),
    maxMark: z.string({ required_error: 'Maximum mark is required' }),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
  })
  .refine(
    (exam) => {
      const start = new Date(`1970-01-01T${exam.startTime}:00`);
      const end = new Date(`1970-01-01T${exam.endTime}:00`);
      return end > start;
    },
    {
      message: 'End time must be after start time.',
      path: ['endTime'], // Highlight the issue specifically in `endTime`
    },
  );

const examScheduleValidationSchema = z.object({
  body: z.object({
    class: z.string({ required_error: 'Class name is required' }),
    examName: z.string({ required_error: 'Exam name is required' }),
    examYear: z.string({ required_error: 'Exam year is required' }),
    startDate: z.string(),
    endDate: z.string().optional(),
    description: z.string({ required_error: 'Description is required' }),
    exams: z.array(examSchema),
    createdBy: z.string({ required_error: 'Created by is required' }),
    isDeleted: z.boolean().default(false),
  }),
});

const updateExamScheduleValidationSchema = z.object({
  body: z.object({
    class: z.string({ required_error: 'Class name is required' }).optional(),
    examName: z.string({ required_error: 'Exam name is required' }).optional(),
    examYear: z.string({ required_error: 'Exam year is required' }).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z
      .string({ required_error: 'Description is required' })
      .optional(),
    exams: z.array(examSchema).optional(),
    createdBy: z
      .string({ required_error: 'Created by is required' })
      .optional(),
  }),
});

export const examScheduleValidation = {
  examScheduleValidationSchema,
  updateExamScheduleValidationSchema,
};
