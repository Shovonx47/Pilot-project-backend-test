import express from 'express';

import { attendanceController } from './attendance.controller';

const router = express.Router();

router
  .route('/')
  .post(attendanceController.createAttendance)
  .get(attendanceController.getAllAttendanceByCurrentMonth);

router.route('/today').get(attendanceController.getTodayAttendance);

router.route('/:date').get(attendanceController.getSingleDateAttendance)
.put(attendanceController.updateAttendance);
router.route('/:role/:providedId').get(attendanceController.getSingleAttendance);

router.route('/remove').put(attendanceController.deleteAttendance);
export const AttendanceRoutes = router;
