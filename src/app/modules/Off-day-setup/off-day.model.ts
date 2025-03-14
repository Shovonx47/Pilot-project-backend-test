import mongoose, { Model, Schema } from 'mongoose';
import { Days } from './off-day.const';
import { TOffDaySetup } from './off-day.interface';

const OffDaySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Name of the off day or occasion is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    startDate: {
      type: String,
      required: [true, 'Start Date is required'],
      match: [/^\d{2}-\d{2}-\d{4}$/, 'Start Date must be in DD-MM-YYYY format'],
    },
    endDate: {
      type: String,
    },
    startDay: {
      type: String,
      enum: Days, // Ensures startDay is one of the valid days
      required: [true, 'Start day is required'],
    },
    endDay: {
      type: String,
    },
  },
  {
    _id: false, // This prevents Mongoose from adding an _id field to the subdocument
  },
);

const OffDaySetupSchema = new Schema<TOffDaySetup>(
  {
    offDays: [OffDaySchema], // Array of off days
    createdBy: {
      type: String,
      required: [true, 'Created by is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Middleware to filter out deleted records
OffDaySetupSchema.pre('find', function (next) {
  this.where({ 'offDays.isDeleted': { $ne: true } });
  next();
});

OffDaySetupSchema.pre('findOne', function (next) {
  this.where({ 'offDays.isDeleted': { $ne: true } });
  next();
});

OffDaySetupSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { 'offDays.isDeleted': { $ne: true } } });
  next();
});

export const OffDaySetup: Model<TOffDaySetup> = mongoose.model<TOffDaySetup>(
  'OffDaySetup',
  OffDaySetupSchema,
);
