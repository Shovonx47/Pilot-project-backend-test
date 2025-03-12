import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { userAuthController } from './auth.controller';
import { updateFunc } from './auth.const';

const router = express.Router();

router
  .route('/register-user')
  .post(
    validateRequest(AuthValidation.userAuthValidationSchemaForCreateUser),
    userAuthController.registerUser,
  );

router
  .route('/login')
  .post(
    validateRequest(AuthValidation.userAuthValidationSchemaForLogin),
    userAuthController.loginUser,
  );
 
  router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    userAuthController.refreshToken,
  );
  router.post("/logout", userAuthController.logout);
  
  router
  .route(
    '/:action(send-verify-code|verify-otp|update-forgot-password)').put(updateFunc);

export const AuthRoutes = router;
