import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { ExaminationScheduleController } from './exam-schedule.controller';
import { examScheduleValidation } from './exam-schedule.validation';

const router = express.Router();

router
  .route('/')
  .post(
    // authorization(USER_ROLE.super_admin, USER_ROLE.admin),
    validateRequest(examScheduleValidation.examScheduleValidationSchema),
    ExaminationScheduleController.createExaminationSchedule,
  )
  .get(ExaminationScheduleController.getAllExaminationSchedule);

router
  .route('/:id')
  .get(ExaminationScheduleController.getSingleExaminationSchedule)
  .put(
    // authorization(USER_ROLE.super_admin),
    validateRequest(examScheduleValidation.updateExamScheduleValidationSchema),
    ExaminationScheduleController.updateExaminationSchedule,
  )
  .delete(ExaminationScheduleController.deleteExaminationSchedule);

export const ExaminationScheduleRoutes = router;
