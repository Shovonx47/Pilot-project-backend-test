import { NextFunction, Request, Response } from 'express';
import { Action } from './auth.interface';
import { userAuthController } from './auth.controller';
 


export const actionMap: Record<
Action,
(req: Request, res: Response, next: NextFunction) => Promise<void>
> = {
'send-verify-code': async (req, res, next) => {
  userAuthController.sendForgotPasswordCode(req, res, next);
},
'verify-otp': async (req, res, next) => {
  userAuthController.verifyForgotPasswordUser(req, res, next);
},
'update-forgot-password': async (req, res, next) => {
  userAuthController.updateForgotPassword(req, res, next);
},
};


export const updateFunc = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { action } = req.params as { action: Action };
  const handler = actionMap[action];

  if (!handler) {
    res.status(400).send({ error: 'Invalid action' });
    return;
  }

  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};




export const USER_ROLE = {
  teacher: 'teacher',
  student: 'student',
  staff: 'staff',
  accountant: 'accountant',
  admin: 'admin',
  super_admin: 'super_admin',
} as const;
