export type TDays =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
interface TOffDays {
  title: string; // Name of the off day or occasion, e.g., "Teacher's Day" or "National Holiday"
  description: string; // Optional: Brief description of the off day
  startDay: TDays; // Name of the off day or occasion, e.g., "Teacher's Day" or "National Holiday"
  endDay?: TDays; // Name of the off day or occasion, e.g., "Teacher's Day" or "National Holiday"
  startDate: string; // Date of the off day in the format "DD-MM-YYYY"
  endDate?: string; // Date of the off day in the format "DD-MM-YYYY"
  // User or admin ID who created the off day setup
  // Optional: Flag for soft deletion
}

export interface TOffDaySetup {
  offDays: TOffDays[];
  createdBy: string;
  isDeleted: boolean;
}
